// @ts-nocheck
"use client";
import React from "react";
import { FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import {
    Building2,
    Mail,
    Phone,
    MapPin,
    Users,
    Link as LinkIcon,
    Trash2,
    PlusCircle,
    Loader,
    Delete,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Organization } from "@/payload-types";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOrganization, updateOrganization } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Validation Schema
const OrganizationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Organization name must be at least 2 characters")
        .max(100, "Organization name must be less than 100 characters")
        .required("Organization name is required"),
    // slug: Yup.string()
    //     .matches(
    //         /^[a-z0-9-]+$/,
    //         "Slug can only contain lowercase letters, numbers, and hyphens"
    //     )
    //     .min(2, "Slug must be at least 2 characters")
    //     .max(50, "Slug must be less than 50 characters")
    //     .required("Slug is required"),
    description: Yup.string().max(
        500,
        "Description must be less than 500 characters"
    ),
    contact: Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string()
            .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
            .required("Phone number is required"),
        address: Yup.string()
            .min(5, "Address must be at least 5 characters")
            .max(200, "Address must be less than 200 characters")
            .required("Address is required"),
    }),
    companySize: Yup.string()
        .oneOf(
            ["1-10", "11-50", "51-100", "101-500", "501-1000"],
            "Invalid company size"
        )
        .required("Company size is required"),
    domains: Yup.string().matches(
        /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid domain format"
    ),
    socialLinks: Yup.array().of(
        Yup.object({
            name: Yup.string().required("Social link name is required"),
            url: Yup.string()
                .url("Invalid URL")
                .required("Social link URL is required"),
        })
    ),
    settings: Yup.object().shape({
        allowTenantPortal: Yup.boolean(),
        enableMaintenanceRequests: Yup.boolean(),
        paymentMethods: Yup.array()
            .of(Yup.string().oneOf(["bank", "card", "cash"]))
            .min(1, "At least one payment method is required"),
    }),
});

interface OrganizationFields extends Organization {
    newSocialLinkName: string;
    newSocialLinkUrl: string;
}
const OrganizationSettings = () => {
    const { company } = useParams();
    const router = useRouter();

    const { data } = useQuery({
        queryFn: () => getOrganization(company as string),
        queryKey: ["organization"],
    });

    const { toast } = useToast();

    // @ts-ignore
    const initialValues: OrganizationFields = data || {
        name: "",
        // slug: "",
        contact: {
            email: "",
            phone: "",
            address: "",
        },
        description: "",
        companySize: "",
        domain: "",
        socialLinks: [
            {
                name: "",
                url: "",
            },
        ],
        settings: {
            allowTenantPortal: true,
            enableMaintenanceRequests: true,
            paymentMethods: ["", "c"],
        },
        newSocialLinkName: "",
        newSocialLinkUrl: "",
    };

    // Formik hook
    const formik = useFormik<OrganizationFields>({
        initialValues,
        validationSchema: OrganizationSchema,
        onSubmit: async (values) => {
            try {
                const response = await updateOrganization(values);
                if (response) {
                    toast({
                        description: "Organization Updated successfully",
                    });
                }
            } catch (error) {
                toast({
                    description:
                        "An error occurred while trying to update the organization",
                });
            }
        },
        enableReinitialize: true,
    });

    console.log(formik.errors);

    const addSocialLink = () => {
        const newName = formik.values.newSocialLinkName?.trim();
        const newUrl = formik.values.newSocialLinkUrl?.trim();

        if (newName && newUrl) {
            const newLink = {
                name: newName,
                url: newUrl,
                id: Date.now().toString(), // Generate a temporary ID
            };

            const updatedSocialLinks = formik.values.socialLinks
                ? [...formik.values.socialLinks, newLink]
                : [newLink];

            formik.setFieldValue("socialLinks", updatedSocialLinks);
            formik.setFieldValue("newSocialLinkName", "");
            formik.setFieldValue("newSocialLinkUrl", "");
        }
    };

    const removeSocialLink = (linkToRemove: string) => {
        formik.setFieldValue(
            "socialLinks",
            formik.values.socialLinks?.filter(
                (link) => link.url !== linkToRemove
            ) || null
        );
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='py-8 w-full'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold dark:text-secondary text-gray-800 flex items-center gap-3'>
                        <Building2 className='w-8 h-8 dark:text-accent text-green-500' />
                        Organization Settings
                    </h1>
                    <p className='dark:text-secondary-foreground text-gray-600 mt-2'>
                        Manage your organization's core information and
                        preferences
                    </p>
                </div>

                <div className='grid gap-6'>
                    {/* Basic Organization Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <Building2 className='w-5 h-5 text-blue-500' />
                                Organization Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='grid md:grid-cols-2 gap-4'>
                            <div>
                                <Label>Organization Name</Label>
                                <Input
                                    name='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className='text-red-500 text-sm mt-1'>
                                        {formik.errors.name}
                                    </div>
                                )}
                            </div>
                            <div>
                                <Label>Organization Slug</Label>
                                <Input
                                    name='slug'
                                    value={formik.values.slug}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.slug && formik.errors.slug && (
                                    <div className='text-red-500 text-sm mt-1'>
                                        {formik.errors.slug}
                                    </div>
                                )}
                            </div>
                            <div className='md:col-span-2'>
                                <Label>Description</Label>
                                <Textarea
                                    placeholder=''
                                    {...formik.getFieldHelpers("description")}
                                />

                                {/* <Input
                                    name='description'
                                    {...formik.getFieldHelpers("description")}
                                /> */}
                                {formik.touched.description &&
                                    formik.errors.description && (
                                        <div className='text-red-500 text-sm mt-1'>
                                            {formik.errors.description}
                                        </div>
                                    )}
                            </div>
                            <div>
                                <Label>Company Size</Label>
                                <Select
                                    name='companySize'
                                    value={formik.values.companySize as string}
                                    onValueChange={(value) =>
                                        formik.setFieldValue(
                                            "companySize",
                                            value
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select company size' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[
                                            "1-10",
                                            "11-50",
                                            "51-100",
                                            "101-500",
                                            "501-1000",
                                        ].map((size) => (
                                            <SelectItem key={size} value={size}>
                                                {size}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {formik.touched.companySize &&
                                    formik.errors.companySize && (
                                        <div className='text-red-500 text-sm mt-1'>
                                            {formik.errors.companySize}
                                        </div>
                                    )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <Mail className='w-5 h-5 text-purple-500' />
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='grid md:grid-cols-2 gap-4'>
                            <div>
                                <Label className='flex items-center gap-2'>
                                    <Mail className='w-4 h-4 text-gray-500' />{" "}
                                    Email
                                </Label>
                                <Input
                                    name='contact.email'
                                    value={formik.values.contact.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.contact?.email &&
                                    formik.errors.contact?.email && (
                                        <div className='text-red-500 text-sm mt-1'>
                                            {formik.errors.contact?.email}
                                        </div>
                                    )}
                            </div>
                            <div>
                                <Label className='flex items-center gap-2'>
                                    <Phone className='w-4 h-4 text-gray-500' />{" "}
                                    Phone
                                </Label>
                                <Input
                                    name='contact.phone'
                                    value={formik.values.contact.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.contact?.phone &&
                                    formik.errors.contact?.phone && (
                                        <div className='text-red-500 text-sm mt-1'>
                                            {formik.errors.contact?.phone}
                                        </div>
                                    )}
                            </div>
                            <div className='md:col-span-2'>
                                <Label className='flex items-center gap-2'>
                                    <MapPin className='w-4 h-4 text-gray-500' />{" "}
                                    Address
                                </Label>
                                <Input
                                    name='contact.address'
                                    value={formik.values.contact.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.contact?.address &&
                                    formik.errors.contact?.address && (
                                        <div className='text-red-500 text-sm mt-1'>
                                            {formik.errors.contact?.address}
                                        </div>
                                    )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Domains Management */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <LinkIcon className='w-5 h-5 dark:text-accent text-accent' />
                                Domain Management
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='flex gap-2 mb-4'>
                                <Input
                                    placeholder='Enter new domain (e.g. example.com)'
                                    {...formik.getFieldHelpers("domain")}
                                />
                            </div>

                            {formik.touched.domain && formik.errors.domain && (
                                <div className='text-red-500 text-sm mt-1'>
                                    {formik.errors.domain}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Social Links */}
                    <FieldArray
                        name='socialLinks'
                        render={(arrayHelpers) => (
                            <>
                                {formik.values.socialLinks?.map(
                                    (link, index) => (
                                        <div className='grid md:grid-cols-2 gap-4 mb-4'>
                                            <div>
                                                <Input
                                                    placeholder='Platform Name'
                                                    name={`socialLinks[${index}].name`}
                                                    value={
                                                        // @ts-ignore
                                                        formik?.values
                                                            ?.socialLinks[index]
                                                            .name
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik?.touched?.socialLinks?.[
                                                    index
                                                ]?.name &&
                                                    formik.errors.socialLinks?.[
                                                        index
                                                    ]?.name && (
                                                        <div>
                                                            {
                                                                formik.errors
                                                                    .socialLinks[
                                                                    index
                                                                ].name
                                                            }
                                                        </div>
                                                    )}
                                            </div>
                                            <div className=''>
                                                <Input
                                                    placeholder='Profile URL'
                                                    name='newSocialLinkUrl'
                                                    value={
                                                        formik.values
                                                            .newSocialLinkUrl ||
                                                        ""
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                />
                                                {formik.touched.socialLinks?.[
                                                    index
                                                ]?.url &&
                                                    formik.errors.socialLinks?.[
                                                        index
                                                    ]?.url && (
                                                        <div>
                                                            {
                                                                formik.errors
                                                                    .socialLinks[
                                                                    index
                                                                ].url
                                                            }
                                                        </div>
                                                    )}
                                            </div>
                                            <Button
                                                type='button'
                                                onClick={() =>
                                                    arrayHelpers.remove(index)
                                                }
                                                className='col-span-full text-destructive'
                                            >
                                                <Delete />
                                            </Button>
                                        </div>
                                    )
                                )}
                                <Button
                                    type='button'
                                    onClick={() =>
                                        arrayHelpers.push({ name: "", url: "" })
                                    }
                                >
                                    <PlusCircle className='mr-2 w-4 h-4' /> Add
                                    Social Link
                                </Button>
                            </>
                        )}
                    />

                    {/* Organization Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <Building2 className='w-5 h-5 text-orange-500' />
                                Organization Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='flex items-center justify-between'>
                                <Label>Allow Tenant Portal</Label>
                                <Switch
                                    checked={
                                        formik?.values?.settings
                                            ?.allowTenantPortal
                                    }
                                    onCheckedChange={(checked) =>
                                        formik.setFieldValue(
                                            "settings.allowTenantPortal",
                                            checked
                                        )
                                    }
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <Label>Enable Maintenance Requests</Label>
                                <Switch
                                    checked={
                                        formik?.values?.settings
                                            .enableMaintenanceRequests
                                    }
                                    onCheckedChange={(checked) =>
                                        formik.setFieldValue(
                                            "settings.enableMaintenanceRequests",
                                            checked
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <Label>Payment Methods</Label>
                                <div className='flex gap-2 mt-2'>
                                    {["bank", "card", "cash"].map((method) => (
                                        <Badge
                                            key={method}
                                            variant={
                                                formik.values.settings.paymentMethods.includes(
                                                    method
                                                )
                                                    ? "default"
                                                    : "outline"
                                            }
                                            onClick={() => {
                                                const currentMethods =
                                                    formik.values.settings
                                                        .paymentMethods;
                                                const newMethods =
                                                    currentMethods.includes(
                                                        method
                                                    )
                                                        ? currentMethods.filter(
                                                              (m) =>
                                                                  m !== method
                                                          )
                                                        : [
                                                              ...currentMethods,
                                                              method,
                                                          ];
                                                formik.setFieldValue(
                                                    "settings.paymentMethods",
                                                    newMethods
                                                );
                                            }}
                                            className='cursor-pointer'
                                        >
                                            {method.charAt(0).toUpperCase() +
                                                method.slice(1)}
                                        </Badge>
                                    ))}
                                </div>
                                {formik.touched.settings?.paymentMethods &&
                                    formik.errors.settings?.paymentMethods && (
                                        <div className='text-red-500 text-sm mt-1'>
                                            {
                                                formik.errors.settings
                                                    ?.paymentMethods
                                            }
                                        </div>
                                    )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Save Changes */}
                    <div className='flex justify-end mt-6'>
                        <Button type='submit' size='lg'>
                            {formik.isSubmitting ? (
                                <Loader className='animate-spin' />
                            ) : (
                                "Save Organization Settings"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default OrganizationSettings;
