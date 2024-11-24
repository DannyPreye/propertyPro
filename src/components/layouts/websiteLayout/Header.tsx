"use client";
import React, { useState } from "react";
import { Building2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className='fixed w-full bg-white/80 backdrop-blur-md z-50 border-b'>
            <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    {/* Logo */}
                    <Link href='/' className='flex items-center space-x-2'>
                        <Building2 className='h-8 w-8 text-primary' />
                        <span className='text-xl font-bold'>PropertyPro</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-8'>
                        <Link
                            href='#features'
                            className='text-gray-600 hover:text-primary'
                        >
                            Features
                        </Link>
                        <Link
                            href='#pricing'
                            className='text-gray-600 hover:text-primary'
                        >
                            Pricing
                        </Link>
                        <Link
                            href='#testimonials'
                            className='text-gray-600 hover:text-primary'
                        >
                            Testimonials
                        </Link>
                        <Link
                            href='#contact'
                            className='text-gray-600 hover:text-primary'
                        >
                            Contact
                        </Link>
                    </div>

                    {/* CTA Buttons */}
                    <div className='hidden md:flex items-center space-x-4'>
                        <Link href='/auth/sign-in'>
                            <Button variant='ghost'>Login</Button>
                        </Link>
                        <Link href='/auth/sign-up'>
                            <Button>Get Started</Button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className='md:hidden p-2'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className='h-6 w-6' />
                        ) : (
                            <Menu className='h-6 w-6' />
                        )}
                    </button>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className='md:hidden py-4'>
                        <div className='flex flex-col space-y-4'>
                            <Link
                                href='#features'
                                className='text-gray-600 hover:text-primary px-4'
                            >
                                Features
                            </Link>
                            <Link
                                href='#pricing'
                                className='text-gray-600 hover:text-primary px-4'
                            >
                                Pricing
                            </Link>
                            <Link
                                href='#testimonials'
                                className='text-gray-600 hover:text-primary px-4'
                            >
                                Testimonials
                            </Link>
                            <Link
                                href='#contact'
                                className='text-gray-600 hover:text-primary px-4'
                            >
                                Contact
                            </Link>
                            <div className='border-t pt-4 px-4'>
                                <Link href='/login'>
                                    <Button
                                        variant='ghost'
                                        className='w-full mb-2'
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link href='/register'>
                                    <Button className='w-full'>
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
