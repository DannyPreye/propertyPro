import React from "react";
import { AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PropertiesTableErrorProps {
    error: string;
    onRetry: () => void;
}

export function PropertiesTableError({
    error,
    onRetry,
}: PropertiesTableErrorProps) {
    return (
        <div className='flex flex-col items-center justify-center p-8 space-y-4'>
            <Alert variant='destructive' className='max-w-md'>
                <AlertTriangleIcon className='h-6 w-6' />
                <AlertTitle>Something Went Wrong</AlertTitle>
                <AlertDescription>
                    {error || "Unable to load properties. Please try again."}
                </AlertDescription>
            </Alert>

            <Button onClick={onRetry} variant='outline' className='mt-4'>
                Retry Loading
            </Button>
        </div>
    );
}
