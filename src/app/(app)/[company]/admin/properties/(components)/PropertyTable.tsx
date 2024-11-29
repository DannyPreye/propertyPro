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
import { Input } from "@/components/ui/input";
import {
    MoreHorizontalIcon,
    EditIcon,
    TrashIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { deleteProperty, getProperties } from "../actions";
import { useSession } from "next-auth/react";
import { Property } from "@/payload-types";
import { PropertiesTableLoading } from "./PropertiesTableLoading";
import { PropertiesTableError } from "./PropertiesTableError";
import { useParams, useRouter } from "next/navigation";

export function PropertiesTable() {
    const { toast } = useToast();
    const { company } = useParams();
    const router = useRouter();

    // State for table controls
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [sortColumn, setSortColumn] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const {
        data: propertiesData,
        refetch,
        isLoading,
        error,
    } = useQuery({
        queryKey: [
            "properties",
            filterStatus,
            searchTerm,
            currentPage,
            sortColumn,
            sortDirection,
        ],
        queryFn: () =>
            getProperties({
                page: currentPage,
                limit: itemsPerPage,
                filter: filterStatus === "all" ? "" : filterStatus,
                search: searchTerm,
                sort: sortDirection === "asc" ? sortColumn : `-${sortColumn}`,
            }),
    });

    // Handle property deletion
    const handleDeleteProperty = async (id: string) => {
        try {
            const res = await deleteProperty(id);
            refetch();
            toast({
                title: "Property Deleted",
                description: "The property has been successfully removed.",
                variant: "default",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete property. Please try again.",
                variant: "destructive",
            });
        }
    };

    // Render status badge
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

    // Handle column sorting
    const handleSort = (column: string) => {
        if (sortColumn === column) {
            // Toggle sort direction if same column
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            // Set new sort column
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    // Render sort icon
    const renderSortIcon = (column: string) => {
        if (sortColumn !== column) return null;
        return sortDirection === "asc" ? (
            <ChevronUpIcon className='h-4 w-4 inline ml-1' />
        ) : (
            <ChevronDownIcon className='h-4 w-4 inline ml-1' />
        );
    };

    // If data is loading
    if (isLoading) return <PropertiesTableLoading />;
    if (error)
        return (
            <PropertiesTableError
                onRetry={refetch}
                error='Error Loading properties'
            />
        );

    return (
        <div className='space-y-4'>
            {/* Search and Filter Controls */}
            <div className='flex justify-between space-x-4'>
                <Input
                    placeholder='Search properties...'
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className='max-w-xs'
                />
                <Select
                    value={filterStatus || "all"}
                    onValueChange={(value) => {
                        setFilterStatus(value);
                        setCurrentPage(1);
                    }}
                >
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Filter Status' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>All Statuses</SelectItem>
                        <SelectItem value='active'>Active</SelectItem>
                        <SelectItem value='vacant'>Vacant</SelectItem>
                        <SelectItem value='maintenance'>Maintenance</SelectItem>
                        <SelectItem value='inactive'>Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Properties Table */}
            {propertiesData?.docs && propertiesData?.docs?.length > 0 ? (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead
                                    onClick={() => handleSort("name")}
                                    className='cursor-pointer '
                                >
                                    Name {renderSortIcon("name")}
                                </TableHead>
                                <TableHead
                                    onClick={() => handleSort("propertyType")}
                                    className='cursor-pointer '
                                >
                                    Type {renderSortIcon("propertyType")}
                                </TableHead>
                                <TableHead
                                    onClick={() => handleSort("status")}
                                    className='cursor-pointer'
                                >
                                    Status {renderSortIcon("status")}
                                </TableHead>
                                <TableHead
                                    className='text-right cursor-pointer'
                                    onClick={() =>
                                        handleSort("rentalDetails.rentAmount")
                                    }
                                >
                                    Rent/Price{" "}
                                    {renderSortIcon("rentalDetails.rentAmount")}
                                </TableHead>
                                <TableHead className='text-right'>
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {propertiesData?.docs?.map((property: Property) => (
                                <TableRow
                                    onClick={() =>
                                        router.push(
                                            `/${company}/admin/properties/${property.id}`
                                        )
                                    }
                                    className='cursor-pointer hover:text-primary-foreground hover:bg-primary'
                                    key={property.id}
                                >
                                    <TableCell className='font-medium'>
                                        {property?.name}
                                    </TableCell>
                                    <TableCell>
                                        {property?.propertyType
                                            .charAt(0)
                                            .toUpperCase() +
                                            property?.propertyType.slice(1)}
                                    </TableCell>
                                    <TableCell>
                                        {renderStatusBadge(
                                            property?.status as string
                                        )}
                                    </TableCell>
                                    <TableCell className='text-right'>
                                        $
                                        {property?.rentalDetails?.rentAmount.toLocaleString()}
                                    </TableCell>
                                    <TableCell className='text-right'>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                >
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
                                                        handleDeleteProperty(
                                                            property.id
                                                        )
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
                    {/* Pagination Controls */}
                    <div className='flex justify-between items-center'>
                        <span>
                            Page {propertiesData.page} of{" "}
                            {propertiesData.totalPages}
                        </span>
                        <div className='space-x-2'>
                            <Button
                                variant='outline'
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(1, p - 1))
                                }
                                disabled={propertiesData?.page === 1}
                            >
                                Previous
                            </Button>
                            <Button
                                variant='outline'
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(
                                            propertiesData?.totalPages,
                                            p + 1
                                        )
                                    )
                                }
                                disabled={
                                    propertiesData?.page ===
                                    propertiesData?.totalPages
                                }
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
}
