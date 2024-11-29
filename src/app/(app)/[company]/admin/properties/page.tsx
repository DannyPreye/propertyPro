"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { PropertiesTable } from "./(components)/PropertyTable";
import { AddPropertyDialog } from "./(components)/AddProperyDialog";

export default function PropertiesPage() {
    const [isAddPropertyDialogOpen, setIsAddPropertyDialogOpen] =
        useState(false);

    return (
        <div className='container mx-auto px-4 py-6 space-y-6'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold tracking-tight text-foreground'>
                    Property Management
                </h1>
                <Button
                    onClick={() => setIsAddPropertyDialogOpen(true)}
                    className='flex items-center gap-2'
                >
                    <PlusIcon className='h-4 w-4' />
                    Add New Property
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Your Properties</CardTitle>
                </CardHeader>
                <CardContent>
                    <PropertiesTable />
                </CardContent>
            </Card>

            <AddPropertyDialog
                open={isAddPropertyDialogOpen}
                onOpenChange={setIsAddPropertyDialogOpen}
            />
        </div>
    );
}
