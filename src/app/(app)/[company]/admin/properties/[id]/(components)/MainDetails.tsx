import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Calendar,
    MapPin,
    Home,
    UserCircle,
    Images,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Property } from "@/payload-types";

interface Props {
    property: Property;
}
const PropertyAdminDetails: React.FC<Props> = ({ property }) => {
    const {
        id,
        name,
        organization,
        address,
        images,
        status,
        propertyType,
        rentalDetails,
        amenities,
        description,
        maintenanceHistory,
        createdAt,
        updatedAt,
    } = property;

    return (
        <div className='space-y-6 p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>{name}</h1>
                <Badge
                    variant={status === "active" ? "default" : "destructive"}
                >
                    {status}
                </Badge>
            </div>

            <Tabs defaultValue='details'>
                <TabsList className='grid w-full grid-cols-3'>
                    <TabsTrigger value='details'>Property Details</TabsTrigger>
                    <TabsTrigger value='media'>Media</TabsTrigger>
                    <TabsTrigger value='maintenance'>Maintenance</TabsTrigger>
                </TabsList>

                <TabsContent value='details'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className='grid md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <div className='flex items-center space-x-2'>
                                    <Home className='text-primary' />
                                    <span>Property ID: {id}</span>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <Home className='text-primary' />
                                    <span>Type: {propertyType}</span>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <MapPin className='text-primary' />
                                    <span>{`${address.street}, ${address.city}, ${address.state} ${address.zip}`}</span>
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <div className='flex items-center space-x-2'>
                                    <Calendar className='text-primary' />
                                    <span>
                                        Created:{" "}
                                        {new Date(createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <Calendar className='text-primary' />
                                    <span>
                                        Last Updated:{" "}
                                        {new Date(updatedAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='mt-4'>
                        <CardHeader>
                            <CardTitle>Rental Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='grid md:grid-cols-2 gap-4'>
                                <div>
                                    <strong>Rent Amount:</strong> $
                                    {rentalDetails?.rentAmount}/month
                                </div>
                                <div>
                                    <strong>Lease Terms:</strong>{" "}
                                    {rentalDetails?.leaseTerms?.replace(
                                        "_",
                                        " "
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value='media'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Property Images</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='grid grid-cols-3 gap-4'>
                                {images?.map((img: any) => (
                                    <img
                                        key={img.id}
                                        src={img?.image.sizes?.thumbnail?.url}
                                        alt={img?.caption}
                                        className='rounded-lg object-cover'
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value='maintenance'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Maintenance History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {maintenanceHistory?.length === 0 ? (
                                <p className='text-muted-foreground'>
                                    No maintenance records
                                </p>
                            ) : (
                                // Implement maintenance history rendering
                                <div>Maintenance records</div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PropertyAdminDetails;
