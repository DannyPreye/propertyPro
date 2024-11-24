import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface Props {
    orgData: any;
}
const Footer: React.FC<Props> = ({ orgData }) => {
    return (
        <footer className='bg-gray-900'>
            <div className='max-w-7xl mx-auto px-6'>
                {/* Top section */}
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-16'>
                    <div>
                        <div className='flex items-center gap-3 mb-6'>
                            <img
                                src={orgData.logo}
                                alt={`${orgData.name} logo`}
                                className='w-10 h-10 rounded'
                            />
                            <h3 className='text-xl font-bold text-white'>
                                {orgData.name}
                            </h3>
                        </div>
                        <p className='text-gray-400 mb-6'>
                            Professional property management services you can
                            trust. Making dream homes a reality since 2008.
                        </p>
                        <div className='flex gap-4'>
                            {Object.entries(orgData.socialLinks).map(
                                ([platform, link]) => (
                                    <Link
                                        key={platform}
                                        href={link as string}
                                        className='w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors'
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
                        <h4 className='text-lg font-semibold text-white mb-6'>
                            Quick Links
                        </h4>
                        <ul className='space-y-4'>
                            <li>
                                <a
                                    href='#properties'
                                    className='text-gray-400 hover:text-white transition-colors'
                                >
                                    Properties
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#features'
                                    className='text-gray-400 hover:text-white transition-colors'
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#testimonials'
                                    className='text-gray-400 hover:text-white transition-colors'
                                >
                                    Testimonials
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#contact'
                                    className='text-gray-400 hover:text-white transition-colors'
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className='text-lg font-semibold text-white mb-6'>
                            Services
                        </h4>
                        <ul className='space-y-4'>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-400 hover:text-white transition-colors'
                                >
                                    Property Management
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-400 hover:text-white transition-colors'
                                >
                                    Maintenance
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-400 hover:text-white transition-colors'
                                >
                                    Tenant Screening
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-400 hover:text-white transition-colors'
                                >
                                    Leasing
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className='text-lg font-semibold text-white mb-6'>
                            Newsletter
                        </h4>
                        <p className='text-gray-400 mb-4'>
                            Subscribe to our newsletter for the latest updates
                            and exclusive offers.
                        </p>
                        <form className='flex gap-2'>
                            <input
                                type='email'
                                placeholder='Enter your email'
                                className='flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                            <Button className='bg-blue-600 hover:bg-blue-700'>
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Bottom section */}
                <div className='border-t border-gray-800 py-8'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                        <div className='text-gray-400 text-sm'>
                            © 2024 {orgData.name}. All rights reserved.
                        </div>
                        <div className='flex gap-6 text-sm'>
                            <a
                                href='#'
                                className='text-gray-400 hover:text-white transition-colors'
                            >
                                Privacy Policy
                            </a>
                            <a
                                href='#'
                                className='text-gray-400 hover:text-white transition-colors'
                            >
                                Terms of Service
                            </a>
                            <a
                                href='#'
                                className='text-gray-400 hover:text-white transition-colors'
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
