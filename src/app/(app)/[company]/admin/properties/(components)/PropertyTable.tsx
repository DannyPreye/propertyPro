"use client";

import { useState, useMemo } from "react";
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
import { getProperties } from "../actions";
import { useSession } from "next-auth/react";

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
    {
        id: "3",
        name: "Modern Studio Loft",
        type: "apartment",
        status: "maintenance",
        rentAmount: 1800,
    },
    {
        id: "4",
        name: "Suburban Townhouse",
        type: "townhouse",
        status: "inactive",
        rentAmount: 2800,
    },
];

export function PropertiesTable() {
    const [properties, setProperties] = useState(mockProperties);
    const { toast } = useToast();
    const { data: session } = useSession();

    // State for table controls
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [sortColumn, setSortColumn] = useState<
        keyof (typeof mockProperties)[0] | null
    >(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { data: propertiesData, refetch } = useQuery({
        queryKey: ["properties", session?.user?.organization?.id],
        queryFn: () => getProperties(session?.user?.organization?.id as string),
    });

    console.log(propertiesData);

    // Handle property deletion
    const handleDeleteProperty = (id: string) => {
        setProperties(properties.filter((prop) => prop.id !== id));
        toast({
            title: "Property Deleted",
            description: "The property has been successfully removed.",
            variant: "default",
        });
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

    // Filtered and sorted properties
    const filteredProperties = useMemo(() => {
        return properties
            .filter(
                (prop) =>
                    prop.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) &&
                    (filterStatus === "" || prop.status === filterStatus)
            )
            .sort((a, b) => {
                if (!sortColumn) return 0;

                const aValue = a[sortColumn];
                const bValue = b[sortColumn];

                if (typeof aValue === "string" && typeof bValue === "string") {
                    return sortDirection === "asc"
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }

                if (typeof aValue === "number" && typeof bValue === "number") {
                    return sortDirection === "asc"
                        ? aValue - bValue
                        : bValue - aValue;
                }

                return 0;
            });
    }, [properties, searchTerm, filterStatus, sortColumn, sortDirection]);

    // Paginated properties
    const paginatedProperties = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredProperties, currentPage, itemsPerPage]);

    // Handle column sorting
    const handleSort = (column: keyof (typeof mockProperties)[0]) => {
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
    const renderSortIcon = (column: keyof (typeof mockProperties)[0]) => {
        if (sortColumn !== column) return null;
        return sortDirection === "asc" ? (
            <ChevronUpIcon className='h-4 w-4 inline ml-1' />
        ) : (
            <ChevronDownIcon className='h-4 w-4 inline ml-1' />
        );
    };

    // Pagination controls
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

    return (
        <div className='space-y-4'>
            {/* Search and Filter Controls */}
            <div className='flex justify-between space-x-4'>
                <Input
                    placeholder='Search properties...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='max-w-xs'
                />
                <Select
                    value={filterStatus || ""}
                    onValueChange={setFilterStatus}
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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead
                            onClick={() => handleSort("name")}
                            className='cursor-pointer hover:bg-gray-100'
                        >
                            Name {renderSortIcon("name")}
                        </TableHead>
                        <TableHead
                            onClick={() => handleSort("type")}
                            className='cursor-pointer hover:bg-gray-100'
                        >
                            Type {renderSortIcon("type")}
                        </TableHead>
                        <TableHead
                            onClick={() => handleSort("status")}
                            className='cursor-pointer hover:bg-gray-100'
                        >
                            Status {renderSortIcon("status")}
                        </TableHead>
                        <TableHead
                            className='text-right cursor-pointer hover:bg-gray-100'
                            onClick={() => handleSort("rentAmount")}
                        >
                            Rent/Price {renderSortIcon("rentAmount")}
                        </TableHead>
                        <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedProperties.map((property) => (
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
                    Page {currentPage} of {totalPages}
                </span>
                <div className='space-x-2'>
                    <Button
                        variant='outline'
                        onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant='outline'
                        onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
