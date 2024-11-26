import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface Props {
    orgData: any;
}
const Footer: React.FC<Props> = ({ orgData }) => {
    return (
        <footer className='bg-secondary'>
            <div className='max-w-7xl mx-auto px-6'>
                {/* Top section */}
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-16'>
                    <div>
                        <div className='flex items-center gap-3 mb-6'>
                            <img
                                src={orgData?.logo}
                                alt={`${orgData?.name} logo`}
                                className='w-10 h-10 rounded'
                            />
                            <h3 className='text-xl font-bold text-foreground'>
                                {orgData?.name}
                            </h3>
                        </div>
                        <p className='text-muted-foreground mb-6'>
                            {orgData?.description}
                        </p>
                        <div className='flex gap-4'>
                            {Object.entries(orgData?.socialLinks).map(
                                ([platform, link]) => (
                                    <Link
                                        key={platform}
                                        href={link as string}
                                        className='w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors'
                                    >
                                        <span className='sr-only'>
                                            {platform}
                                        </span>
                                        {/* You can add proper social icons here */}
                                        <div className='w-5 h-5' />
                                    </Link>
                                )
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className='text-lg font-semibold text-foreground mb-6'>
                            Quick Links
                        </h4>
                        <ul className='space-y-4'>
                            <li>
                                <a
                                    href='#properties'
                                    className='text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Properties
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#features'
                                    className='text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#testimonials'
                                    className='text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Testimonials
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#contact'
                                    className='text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className='text-lg font-semibold text-foreground mb-6'>
                            Services
                        </h4>
                        <ul className='space-y-4'>
                            <li>
                                <a
                                    href='#'
                                    className='text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Property Management
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Maintenance
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Tenant Screening
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Leasing
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className='text-lg font-semibold text-foreground mb-6'>
                            Newsletter
                        </h4>
                        <p className='text-muted-foreground mb-4'>
                            Subscribe to our newsletter for the latest updates
                            and exclusive offers.
                        </p>
                        <form className='flex gap-2'>
                            <input
                                type='email'
                                placeholder='Enter your email'
                                className='flex-1 px-4 py-2 rounded-lg bg-accent/20 border border-accent text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent'
                            />
                            <Button variant='default'>Subscribe</Button>
                        </form>
                    </div>
                </div>

                {/* Bottom section */}
                <div className='border-t border-accent/20 py-8'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                        <div className='text-muted-foreground text-sm'>
                            © 2024 {orgData?.name}. All rights reserved.
                        </div>
                        <div className='flex gap-6 text-sm'>
                            <a
                                href='#'
                                className='text-muted-foreground hover:text-foreground transition-colors'
                            >
                                Privacy Policy
                            </a>
                            <a
                                href='#'
                                className='text-muted-foreground hover:text-foreground transition-colors'
                            >
                                Terms of Service
                            </a>
                            <a
                                href='#'
                                className='text-muted-foreground hover:text-foreground transition-colors'
                            >
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
