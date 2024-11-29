import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function PropertiesTableLoading() {
    return (
        <div className='space-y-4'>
            <div className='flex justify-between space-x-4'>
                <Skeleton className='h-10 w-full max-w-xs' />
                <Skeleton className='h-10 w-[180px]' />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        {[
                            "Name",
                            "Type",
                            "Status",
                            "Rent/Price",
                            "Actions",
                        ].map((header) => (
                            <TableHead key={header}>{header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1, 2, 3, 4, 5].map((row) => (
                        <TableRow key={row}>
                            {[1, 2, 3, 4, 5].map((cell) => (
                                <TableCell key={cell}>
                                    <Skeleton className='h-6 w-full' />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
