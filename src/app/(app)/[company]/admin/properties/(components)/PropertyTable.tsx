// src/app/(dashboard)/properties/_components/properties-table.tsx
"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, EditIcon, TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with actual data fetching
const mockProperties = [
    {
        id: "1",
        name: "Luxury Apartment Downtown",
        type: "apartment",
        status: "active",
        rentAmount: 2500,
    },
    {
        id: "2",
        name: "Spacious Family Home",
        type: "house",
        status: "vacant",
        rentAmount: 3200,
    },
];

export function PropertiesTable() {
    const [properties, setProperties] = useState(mockProperties);
    const { toast } = useToast();

    const handleDeleteProperty = (id: string) => {
        // Implement actual delete logic
        setProperties(properties.filter((prop) => prop.id !== id));
        toast({
            title: "Property Deleted",
            description: "The property has been successfully removed.",
            variant: "default",
        });
    };

    const renderStatusBadge = (status: string) => {
        const statusVariants: any = {
            active: "bg-green-100 text-green-800",
            vacant: "bg-blue-100 text-blue-800",
            maintenance: "bg-yellow-100 text-yellow-800",
            inactive: "bg-red-100 text-red-800",
        };

        return (
            <Badge variant='outline' className={statusVariants[status] || ""}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Rent/Price</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {properties.map((property) => (
                    <TableRow key={property.id}>
                        <TableCell className='font-medium'>
                            {property.name}
                        </TableCell>
                        <TableCell>
                            {property.type.charAt(0).toUpperCase() +
                                property.type.slice(1)}
                        </TableCell>
                        <TableCell>
                            {renderStatusBadge(property.status)}
                        </TableCell>
                        <TableCell className='text-right'>
                            ${property.rentAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className='text-right'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='ghost' size='icon'>
                                        <MoreHorizontalIcon className='h-4 w-4' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                    <DropdownMenuItem className='cursor-pointer'>
                                        <EditIcon className='mr-2 h-4 w-4' />{" "}
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className='cursor-pointer text-destructive focus:text-destructive'
                                        onSelect={() =>
                                            handleDeleteProperty(property.id)
                                        }
                                    >
                                        <TrashIcon className='mr-2 h-4 w-4' />{" "}
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
