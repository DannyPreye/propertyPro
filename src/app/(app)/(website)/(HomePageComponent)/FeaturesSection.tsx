import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Building,
    Building2,
    CheckCircle2,
    Clock,
    Shield,
    Users,
} from "lucide-react";
import React from "react";

const FeaturesSection = () => {
    return (
        <section id='features' className='py-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                        Everything You Need to Manage Properties
                    </h2>
                    <p className='text-xl text-gray-600'>
                        Powerful features designed for modern property
                        management
                    </p>
                </div>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {[
                        {
                            icon: Building,
                            title: "Property Listings",
                            description:
                                "Easily list and manage all your properties in one place. Add photos, details, and pricing with our intuitive interface.",
                        },
                        {
                            icon: Users,
                            title: "Tenant Portal",
                            description:
                                "Give your tenants a dedicated portal for rent payments, maintenance requests, and document access.",
                        },
                        {
                            icon: Clock,
                            title: "Automated Rent Collection",
                            description:
                                "Set up automatic rent collection and never chase payments again. Get paid on time, every time.",
                        },
                        {
                            icon: Shield,
                            title: "Maintenance Management",
                            description:
                                "Track and manage maintenance requests efficiently. Keep your properties in top condition.",
                        },
                        {
                            icon: Building2,
                            title: "Property Analytics",
                            description:
                                "Get insights into your property performance with detailed analytics and reporting tools.",
                        },
                        {
                            icon: CheckCircle2,
                            title: "Lease Management",
                            description:
                                "Digital lease signing and management. Keep all your documents organized and accessible.",
                        },
                    ].map((feature, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4'>
                                    <feature.icon className='h-6 w-6 text-primary' />
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className='text-gray-600'>
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
