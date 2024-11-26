"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

interface Props {
    orgData: any;
}
const Header: React.FC<Props> = ({ orgData }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-background/90 backdrop-blur-md shadow-sm"
                    : "bg-transparent"
            }`}
        >
            <div className='max-w-7xl mx-auto px-6'>
                <div className='flex items-center justify-between h-20'>
                    <div className='flex items-center gap-8'>
                        <img
                            src={orgData?.logo}
                            alt={`${orgData?.name} logo`}
                            className='w-10 h-10 rounded'
                        />
                        <nav className='hidden lg:flex items-center gap-8'>
                            <a
                                href='#properties'
                                className={`font-medium ${
                                    isScrolled
                                        ? "text-foreground"
                                        : "text-primary-foreground"
                                } hover:text-primary transition-colors`}
                            >
                                Properties
                            </a>
                            <a
                                href='#features'
                                className={`font-medium ${
                                    isScrolled
                                        ? "text-foreground"
                                        : "text-primary-foreground"
                                } hover:text-primary transition-colors`}
                            >
                                Features
                            </a>
                            <a
                                href='#testimonials'
                                className={`font-medium ${
                                    isScrolled
                                        ? "text-foreground"
                                        : "text-primary-foreground"
                                } hover:text-primary transition-colors`}
                            >
                                Testimonials
                            </a>
                            <a
                                href='#contact'
                                className={`font-medium ${
                                    isScrolled
                                        ? "text-foreground"
                                        : "text-primary-foreground"
                                } hover:text-primary transition-colors`}
                            >
                                Contact
                            </a>
                        </nav>
                    </div>

                    <div className='hidden lg:flex items-center gap-4'>
                        <Button
                            variant='ghost'
                            className={
                                isScrolled
                                    ? "text-foreground"
                                    : "text-primary-foreground"
                            }
                        >
                            Log In
                        </Button>
                        <Button variant='default'>View Properties</Button>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className='lg:hidden p-2 rounded-full hover:bg-accent/10'
                    >
                        {isMenuOpen ? (
                            <X
                                className={
                                    isScrolled
                                        ? "text-foreground"
                                        : "text-primary-foreground"
                                }
                            />
                        ) : (
                            <Menu
                                className={
                                    isScrolled
                                        ? "text-foreground"
                                        : "text-primary-foreground"
                                }
                            />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`lg:hidden absolute w-full bg-background shadow-lg transition-all duration-300 ${
                    isMenuOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
            >
                <nav className='flex flex-col p-6 space-y-4'>
                    <a
                        href='#properties'
                        className='font-medium text-foreground hover:text-primary'
                    >
                        Properties
                    </a>
                    <a
                        href='#features'
                        className='font-medium text-foreground hover:text-primary'
                    >
                        Features
                    </a>
                    <a
                        href='#testimonials'
                        className='font-medium text-foreground hover:text-primary'
                    >
                        Testimonials
                    </a>
                    <a
                        href='#contact'
                        className='font-medium text-foreground hover:text-primary'
                    >
                        Contact
                    </a>
                    <hr className='my-2' />
                    <Button variant='ghost' className='justify-start px-0'>
                        Log In
                    </Button>
                    <Button variant='default'>View Properties</Button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
