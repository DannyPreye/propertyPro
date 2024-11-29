import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Enhanced type definitions
interface Stat {
    value: string;
    label: string;
}

interface OrgData {
    description: string;
    stats: Stat[];
    heroImage?: string;
    backgroundImage?: string;
}

interface HeroSectionProps {
    orgData: OrgData;
    className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ orgData, className }) => {
    return (
        <section
            className={cn(
                "relative min-h-screen flex items-center pt-20 overflow-hidden",
                "bg-gradient-to-r from-blue-900/90 to-blue-800/80",
                "dark:from-blue-950/90 dark:to-blue-900/80",
                className
            )}
        >
            {/* Background Layer */}
            <div className='absolute inset-0 z-0'>
                <img
                    src={
                        orgData.backgroundImage || "/api/placeholder/1920/1080"
                    }
                    alt='Hero background'
                    className='absolute inset-0 w-full h-full object-cover opacity-50 dark:opacity-30'
                />
                <div
                    className='absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80
                    dark:from-blue-950/90 dark:to-blue-900/80
                    mix-blend-multiply'
                />
            </div>

            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
                <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
                    {/* Content Column */}
                    <div className='text-white space-y-6'>
                        {/* Trust Badge */}
                        <div
                            className='inline-flex items-center gap-2 px-4 py-2
                            rounded-full
                            bg-white/10
                            dark:bg-white/20
                            backdrop-blur-sm'
                        >
                            <Check className='w-4 h-4 text-blue-400' />
                            <span className='text-sm font-medium'>
                                Trusted by 2000+ residents
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                            Find Your Perfect{" "}
                            <span className='text-blue-400'>Home</span>
                        </h1>

                        {/* Description */}
                        <p className='text-lg md:text-xl text-white/90 max-w-xl'>
                            {orgData.description}
                        </p>

                        {/* Call to Action Buttons */}
                        <div className='flex flex-wrap gap-4'>
                            <Button
                                size='lg'
                                className='bg-white text-blue-600 hover:bg-gray-100'
                            >
                                Explore Properties
                                <ArrowRight className='w-4 h-4 ml-2' />
                            </Button>
                            <Button
                                size='lg'
                                variant='outline'
                                className='border-white text-white hover:bg-white/10'
                            >
                                Schedule a Tour
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-12'>
                            {orgData?.stats?.map((stat, index) => (
                                <div key={index} className='text-center'>
                                    <div className='text-2xl md:text-3xl font-bold mb-1 text-blue-400'>
                                        {stat.value}
                                    </div>
                                    <div className='text-xs md:text-sm text-white/80'>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className='relative hidden lg:block'>
                        <div
                            className='absolute inset-0
                            bg-gradient-to-br
                            from-blue-600/20
                            to-purple-600/20
                            dark:from-blue-800/20
                            dark:to-purple-800/20
                            rounded-2xl
                            transform
                            rotate-3'
                        />
                        <img
                            src={
                                orgData.heroImage || "/api/placeholder/600/800"
                            }
                            alt='Featured property'
                            className='relative rounded-2xl shadow-2xl
                                transform -rotate-3
                                transition-transform
                                hover:rotate-0
                                duration-500
                                hover:scale-105'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
