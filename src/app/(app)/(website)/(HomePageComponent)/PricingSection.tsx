import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import React from "react";

const PricingSection = () => {
    return (
        <section id='pricing' className='py-20 bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                        Simple, Transparent Pricing
                    </h2>
                    <p className='text-xl text-gray-600'>
                        Choose the perfect plan for your property management
                        needs
                    </p>
                </div>

                <div className='grid md:grid-cols-3 gap-8'>
                    {[
                        {
                            name: "Starter",
                            price: "49",
                            description: "Perfect for small landlords",
                            features: [
                                "Up to 5 properties",
                                "Basic tenant portal",
                                "Maintenance requests",
                                "Online rent collection",
                                "24/7 support",
                            ],
                        },
                        {
                            name: "Professional",
                            price: "99",
                            description: "Ideal for growing portfolios",
                            features: [
                                "Up to 20 properties",
                                "Advanced tenant portal",
                                "Maintenance management",
                                "Financial reporting",
                                "Lease management",
                                "Priority support",
                            ],
                        },
                        {
                            name: "Enterprise",
                            price: "199",
                            description: "For large property managers",
                            features: [
                                "Unlimited properties",
                                "Custom branded portal",
                                "API access",
                                "Advanced analytics",
                                "Dedicated account manager",
                                "Custom integrations",
                            ],
                        },
                    ].map((plan, index) => (
                        <Card
                            key={index}
                            className={index === 1 ? "border-primary" : ""}
                        >
                            <CardHeader>
                                <CardTitle className='text-2xl'>
                                    {plan.name}
                                </CardTitle>
                                <div className='mt-4'>
                                    <span className='text-4xl font-bold'>
                                        ${plan.price}
                                    </span>
                                    <span className='text-gray-600'>
                                        /month
                                    </span>
                                </div>
                                <CardDescription>
                                    {plan.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className='space-y-3'>
                                    {plan.features.map((feature, i) => (
                                        <li
                                            key={i}
                                            className='flex items-center'
                                        >
                                            <CheckCircle2 className='h-5 w-5 text-primary mr-2' />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className='w-full mt-6'>
                                    Get Started
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
