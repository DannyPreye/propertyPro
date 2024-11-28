import React from "react";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";
import { serverSession } from "@/lib/auth";

interface Props {
    children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = async ({ children }) => {
    const session = await serverSession();

    return (
        <div className='min-h-screen flex flex-col lg:flex-row bg-background'>
            {/* Content Side */}
            <div className='flex-1 flex flex-col justify-center px-6 lg:px-12 xl:px-24 py-12 relative'>
                <div className='max-w-md w-full mx-auto space-y-8'>
                    {children}
                </div>

                <div className='mt-8 pt-8 border-t border-border'>
                    <div className='flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground'>
                        <Link href='/privacy' className='hover:text-primary'>
                            Privacy
                        </Link>
                        <Link href='/terms' className='hover:text-primary'>
                            Terms
                        </Link>
                        <Link href='/contact' className='hover:text-primary'>
                            Support
                        </Link>
                    </div>
                </div>
            </div>

            {/* Feature Showcase Side */}
            <div className='hidden sticky  right-0 top-0 h-screen flex-col gap-4 lg:flex flex-1 bg-primary/95  overflow-hidden items-center justify-center'>
                <div className='absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]' />
                <div className=''>
                    <Link
                        href='/'
                        className='flex items-center space-x-2 group'
                    >
                        <Building2 className='h-8 w-8 text-foreground transition-transform group-hover:scale-110' />
                        <span className='text-2xl font-bold text-foreground'>
                            PropManager
                        </span>
                    </Link>
                </div>
                <div className='relative max-w-md text-center z-10 px-6'>
                    <h1 className='text-3xl font-bold text-primary-foreground mb-4'>
                        Elevate Your Property Management
                    </h1>
                    <p className='text-primary-foreground/80 mb-8'>
                        Intelligent solutions for modern property managers,
                        combining cutting-edge technology with seamless
                        operations.
                    </p>

                    <div className='bg-primary/10 rounded-xl p-6 backdrop-blur-sm'>
                        <div className='flex justify-between mb-4'>
                            <div>
                                <div className='text-2xl font-bold text-primary-foreground'>
                                    10K+
                                </div>
                                <div className='text-sm text-primary-foreground/80'>
                                    Properties Managed
                                </div>
                            </div>
                            <div>
                                <div className='text-2xl font-bold text-primary-foreground'>
                                    98%
                                </div>
                                <div className='text-sm text-primary-foreground/80'>
                                    Satisfaction Rate
                                </div>
                            </div>
                        </div>

                        <Link
                            href='/register'
                            className='w-full flex items-center justify-center px-6 py-3 bg-primary-foreground text-primary rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors'
                        >
                            Get Started
                            <ArrowRight className='ml-2 h-4 w-4' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
