import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const HeroSection = () => {
    return (
        <section className='pt-32 pb-20 bg-gradient-to-b from-primary/5 to-transparent'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center'>
                    <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
                        Property Management Made{" "}
                        <span className='text-primary'>Simple</span>
                    </h1>
                    <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
                        Streamline your property management with our all-in-one
                        platform. Perfect for landlords, property managers, and
                        tenants.
                    </p>
                    <div className='flex flex-col sm:flex-row justify-center gap-4'>
                        <Button size='lg' className='text-lg'>
                            Start Free Trial
                            <ArrowRight className='ml-2 h-5 w-5' />
                        </Button>
                        <Button size='lg' variant='outline' className='text-lg'>
                            Watch Demo
                        </Button>
                    </div>
                    <div className='mt-12'>
                        <img
                            src='/api/placeholder/1200/600'
                            alt='Platform Dashboard'
                            className='rounded-lg shadow-2xl'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
