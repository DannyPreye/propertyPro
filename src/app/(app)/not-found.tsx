import React from "react";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotFoundPage = () => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-background p-4'>
            <Card className='w-full max-w-md text-center'>
                <CardHeader>
                    <CardTitle className='text-4xl font-bold text-destructive'>
                        404
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-6'>
                    <div>
                        <h2 className='text-2xl font-semibold mb-2'>
                            Page Not Found
                        </h2>
                        <p className='text-muted-foreground'>
                            The page you're looking for seems to have gone on an
                            unexpected adventure.
                        </p>
                    </div>

                    <div className='flex justify-center space-x-4'>
                        <Button asChild variant='outline'>
                            <Link href='/' className='flex items-center'>
                                <Home className='mr-2 h-4 w-4' />
                                Home
                            </Link>
                        </Button>
                    </div>

                    <div className='border-t pt-4 text-sm text-muted-foreground'>
                        <p>If the issue persists, please contact support.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default NotFoundPage;
