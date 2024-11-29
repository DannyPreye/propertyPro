"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { createProperty, uploadPropertyImage } from "../actions";
import { Property } from "@/payload-types";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Plus, X } from "lucide-react";

const propertySchema = z.object({
    name: z.string().min(2, "Property name must be at least 2 characters"),
    propertyType: z.enum([
        "apartment",
        "house",
        "condo",
        "townhouse",
        "commercial",
    ]),
    status: z.enum(["active", "maintenance", "inactive", "occupied", "vacant"]),

    // Address - Step 2
    address: z.object({
        street: z.string().min(1, "Street address is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        zip: z.string().min(1, "Zip code is required"),
    }),

    // Rental Details - Step 3
    rentalDetails: z.object({
        rentAmount: z.number().min(0, "Rent amount must be positive"),
        securityDeposit: z.number().optional(),
        leaseTerms: z
            .enum(["6_months", "12_months", "month_to_month"])
            .optional(),
    }),

    // Amenities - Step 4
    amenities: z
        .array(
            z.object({
                name: z.string().min(1, "Amenity name is required"),
                icon: z.string().optional(),
            })
        )
        .optional(),

    // Description - Step 5
    description: z.string().optional(),

    // Images - Step 6
    images: z
        .array(
            z.object({
                url: z.string().url("Invalid image URL"),
                caption: z.string().optional(),
                file: z.instanceof(File).optional(), // Store the actual File object
            })
        )
        .optional(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface AddPropertyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddPropertyDialog({
    open,
    onOpenChange,
}: AddPropertyDialogProps) {
    const { toast } = useToast();
    const { data: session } = useSession();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 6;

    const form = useForm<PropertyFormData>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            name: "",
            propertyType: "apartment",
            status: "active",
            address: {
                street: "",
                city: "",
                state: "",
                zip: "",
            },
            rentalDetails: {
                rentAmount: 0,
            },
            amenities: [],
            images: [],
        },
    });

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const uploadImage = async (image: any, caption?: string) => {
        const formData = new FormData();
        formData.append("file", image);
        if (caption) {
            console.log("caption", caption);
            formData.append("alt", caption);
        }
        const res = await uploadPropertyImage(formData);

        return res;
    };

    const onSubmit = async (data: PropertyFormData) => {
        if (data.images?.length) {
            try {
                const imagesToUpload = data.images.map((image) => ({
                    file: image.file,
                    caption: image.caption,
                }));

                const images = await Promise.all(
                    imagesToUpload.map(
                        async (image) =>
                            await uploadImage(image.file, image.caption)
                    )
                );
                console.log("images", images);

                const values = {
                    ...data,
                    images: images.map((image, index) => ({
                        image: image.id,
                        // @ts-ignore
                        caption: data?.images[index]?.caption,
                    })),
                    organization: session?.user?.organization?.id,
                };

                const res = await createProperty(values);

                toast({
                    title: "Property Added",
                    description: `Added ${data.name} successfully`,
                });
                setCurrentStep(0);
                form.reset();
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to add property. Please try again.",
                    variant: "destructive",
                });
            }
        }
    };

    const renderBasicDetails = () => (
        <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Property Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='e.g. Luxury Downtown Apartment'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='propertyType'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Property Type</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select property type' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='apartment'>
                                        Apartment
                                    </SelectItem>
                                    <SelectItem value='house'>House</SelectItem>
                                    <SelectItem value='condo'>Condo</SelectItem>
                                    <SelectItem value='townhouse'>
                                        Townhouse
                                    </SelectItem>
                                    <SelectItem value='commercial'>
                                        Commercial
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='grid gap-4'>
                <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Property Status</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select status' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='active'>
                                        Active
                                    </SelectItem>
                                    <SelectItem value='maintenance'>
                                        Under Maintenance
                                    </SelectItem>
                                    <SelectItem value='inactive'>
                                        Inactive
                                    </SelectItem>
                                    <SelectItem value='occupied'>
                                        Occupied
                                    </SelectItem>
                                    <SelectItem value='vacant'>
                                        Vacant
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );

    const renderAddressDetails = () => (
        <div className='grid grid-cols-2 gap-4'>
            <FormField
                control={form.control}
                name='address.street'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='Enter street address'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='address.city'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input placeholder='Enter city' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='address.state'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                            <Input placeholder='Enter state' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='address.zip'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                            <Input placeholder='Enter zip code' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );

    const renderRentalDetails = () => (
        <div className='grid grid-cols-2 gap-4'>
            <FormField
                control={form.control}
                name='rentalDetails.rentAmount'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Monthly Rent</FormLabel>
                        <FormControl>
                            <Input
                                type='number'
                                placeholder='Enter monthly rent'
                                {...field}
                                onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='rentalDetails.leaseTerms'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Lease Terms</FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select lease terms' />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value='6_months'>
                                    6 Months
                                </SelectItem>
                                <SelectItem value='12_months'>
                                    12 Months
                                </SelectItem>
                                <SelectItem value='month_to_month'>
                                    Month-to-Month
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );

    const renderAmenities = () => {
        const amenities = form.watch("amenities") || [];

        const addAmenity = () => {
            const currentAmenities = form.getValues("amenities") || [];
            form.setValue("amenities", [
                ...currentAmenities,
                { name: "", icon: "" },
            ]);
        };

        const removeAmenity = (index: number) => {
            const currentAmenities = form.getValues("amenities") || [];
            form.setValue(
                "amenities",
                currentAmenities.filter((_, i) => i !== index)
            );
        };

        return (
            <div className='space-y-4'>
                {amenities.map((_, index) => (
                    <div key={index} className='flex items-center space-x-2'>
                        <FormField
                            control={form.control}
                            name={`amenities.${index}.name`}
                            render={({ field }) => (
                                <FormItem className='flex-grow'>
                                    <FormControl>
                                        <Input
                                            placeholder='Amenity name'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`amenities.${index}.icon`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder='Icon (optional)'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type='button'
                            variant='destructive'
                            size='icon'
                            onClick={() => removeAmenity(index)}
                        >
                            <X className='h-4 w-4' />
                        </Button>
                    </div>
                ))}
                <Button
                    type='button'
                    variant='outline'
                    onClick={addAmenity}
                    className='mt-2'
                >
                    <Plus className='mr-2 h-4 w-4' /> Add Amenity
                </Button>
            </div>
        );
    };

    const renderDescription = () => (
        <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Property Description</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder='Enter a detailed description of the property'
                            className='min-h-[150px]'
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );

    const renderImages = () => {
        const images = form.watch("images") || [];

        const addImage = (file: FileList) => {
            const currentImages = form.getValues("images") || [];
            console.log("This is the file", file);
            if (file.length > 0) {
                form.setValue("images", [
                    ...currentImages,
                    {
                        file: file[0], // Store the actual File object
                        url: URL.createObjectURL(file[0]), // For preview purposes
                        caption: "",
                    },
                ]);
            }
        };

        const removeImage = (index: number) => {
            const currentImages = form.getValues("images") || [];
            const imageToRemove = currentImages[index];

            // Revoke the blob URL to free memory
            if (imageToRemove?.url) {
                URL.revokeObjectURL(imageToRemove.url);
            }

            // Update the images array
            form.setValue(
                "images",
                currentImages.filter((_, i) => i !== index)
            );
        };

        return (
            <div className='space-y-4'>
                <div>
                    <input
                        type='file'
                        accept='image/*'
                        multiple
                        // @ts-ignore
                        onChange={(e) => addImage(e.target.files as File)}
                    />
                </div>
                {images.map((image, index) => (
                    <div key={index} className='flex items-center space-x-2'>
                        <img
                            src={image.url}
                            alt={`Preview ${index}`}
                            className='w-16 h-16 object-cover rounded'
                        />
                        <FormField
                            control={form.control}
                            name={`images.${index}.caption`}
                            render={({ field }) => (
                                <FormItem className='flex-grow'>
                                    <FormControl>
                                        <Input
                                            placeholder='Image caption (optional)'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type='button'
                            variant='destructive'
                            size='icon'
                            onClick={() => removeImage(index)}
                        >
                            <X className='h-4 w-4' />
                        </Button>
                    </div>
                ))}
            </div>
        );
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return renderBasicDetails();
            case 2:
                return renderAddressDetails();
            case 3:
                return renderRentalDetails();
            case 4:
                return renderAmenities();
            case 5:
                return renderDescription();
            case 6:
                return renderImages();
            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-[625px]'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <DialogHeader>
                            <DialogTitle>Add New Property</DialogTitle>
                            <DialogDescription>
                                Complete all {totalSteps} steps to add a new
                                property
                            </DialogDescription>
                        </DialogHeader>

                        {/* Render Current Step */}
                        {renderCurrentStep()}

                        <DialogFooter className='flex justify-between'>
                            {currentStep > 1 && (
                                <Button
                                    type='button'
                                    variant='outline'
                                    onClick={prevStep}
                                >
                                    Previous
                                </Button>
                            )}

                            {currentStep < totalSteps ? (
                                <Button
                                    type='button'
                                    onClick={nextStep}
                                    className='ml-auto'
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button type='submit' className='ml-auto'>
                                    {form.formState.isLoading ? (
                                        <Loader className='animate-spin' />
                                    ) : (
                                        "Submit Property"
                                    )}
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
