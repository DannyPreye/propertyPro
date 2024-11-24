import React from "react";

import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";
import { serverSession } from "@/lib/auth";

interface Props {
    children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = async ({ children }) => {
    const features = [
        {
            title: "Smart Property Management",
            description: "Streamline operations with AI-powered insights",
            icon: "🏢",
        },
        {
            title: "Automated Rent Collection",
            description: "Set and forget with scheduled payments",
            icon: "💳",
        },
        {
            title: "Real-time Analytics",
            description: "Make data-driven decisions instantly",
            icon: "📊",
        },
    ];

    const stats = [
        { value: "10K+", label: "Properties Managed" },
        { value: "98%", label: "Customer Satisfaction" },
        { value: "$2B+", label: "Rent Processed" },
    ];

    const session = await serverSession();

    console.log("Server session", session);

    return (
        <div className='min-h-screen flex flex-col lg:flex-row bg-gray-50'>
            {/* Content Side */}
            <div className='flex-1 flex flex-col justify-center px-6 lg:px-12 xl:px-24 py-12 relative'>
                <div className='absolute top-8 left-8'>
                    <Link
                        href='/'
                        className='flex items-center space-x-2 group'
                    >
                        <Building2 className='h-8 w-8 text-primary transition-transform group-hover:scale-110' />
                        <span className='text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'>
                            PropManager
                        </span>
                    </Link>
                </div>

                <div className='max-w-md w-full mx-auto space-y-8'>
                    {children}
                </div>

                <div className='mt-8 pt-8 border-t border-gray-200'>
                    <div className='flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-600'>
                        <Link
                            href='/privacy'
                            className='hover:text-primary transition-colors'
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href='/terms'
                            className='hover:text-primary transition-colors'
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href='/contact'
                            className='hover:text-primary transition-colors'
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>

            {/* Feature Showcase Side */}
            <div className='hidden lg:flex flex-1 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden'>
                <div className='absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]' />

                <div className='relative w-full flex flex-col justify-center px-12 xl:px-24'>
                    <div className='mb-12'>
                        <h1 className='text-4xl font-bold text-white mb-6'>
                            Transform Your Property Management Experience
                        </h1>
                        <p className='text-xl text-white/90 leading-relaxed'>
                            Join thousands of property managers who have
                            streamlined their operations with our intelligent
                            platform.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className='grid grid-cols-3 gap-8 mb-12'>
                        {stats.map((stat, index) => (
                            <div key={index} className='text-white'>
                                <div className='text-3xl font-bold mb-1'>
                                    {stat.value}
                                </div>
                                <div className='text-white/80 text-sm'>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Features Grid */}
                    <div className='grid gap-6'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className='flex items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors'
                            >
                                <span className='text-2xl mr-4'>
                                    {feature.icon}
                                </span>
                                <div>
                                    <h3 className='text-white font-semibold mb-1'>
                                        {feature.title}
                                    </h3>
                                    <p className='text-white/80 text-sm'>
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className='mt-12 pt-12 border-t border-white/20'>
                        <div className='flex items-center justify-between p-6 bg-white/10 rounded-xl backdrop-blur-sm'>
                            <div className='mr-4'>
                                <p className='text-white font-medium mb-1'>
                                    Ready to get started?
                                </p>
                                <p className='text-white/80 text-sm'>
                                    Set up your account in minutes
                                </p>
                            </div>
                            <Link
                                href='/register'
                                className='flex items-center px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-white/90 transition-colors'
                            >
                                Get Started
                                <ArrowRight className='ml-2 h-4 w-4' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
