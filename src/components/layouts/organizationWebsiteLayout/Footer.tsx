import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility for conditional classes

// Enhanced type for more type safety
interface OrgData {
    name: string;
    logo: string;
    description: string;
    socialLinks: Record<string, string>;
}

interface FooterProps {
    orgData: OrgData;
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ orgData, className }) => {
    // Social icon mapping (replace with actual icons from lucide-react or your icon library)
    const socialIcons: Record<string, React.ReactNode> = {
        // Example placeholders - replace with actual icons
        twitter: <div className='w-5 h-5 bg-blue-500' />,
        facebook: <div className='w-5 h-5 bg-blue-600' />,
        linkedin: <div className='w-5 h-5 bg-blue-700' />,
        instagram: <div className='w-5 h-5 bg-pink-500' />,
    };

    return (
        <footer
            className={cn(
                "bg-gray-900",
                "transition-colors duration-300",
                className
            )}
        >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Top section with improved responsiveness */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12'>
                    {/* Organization Info */}
                    <div className='space-y-4'>
                        <div className='flex items-center space-x-3'>
                            <img
                                src={orgData?.logo}
                                alt={`${orgData?.name} logo`}
                                className='w-12 h-12 rounded-lg object-cover'
                            />
                            <h3 className='text-2xl font-bold'>
                                {orgData?.name}
                            </h3>
                        </div>
                        <p className='text-muted-foreground'>
                            {orgData?.description}
                        </p>
                        <div className='flex space-x-4'>
                            {Object.entries(orgData?.socialLinks || {}).map(
                                ([platform, link]) => (
                                    <Link
                                        key={platform}
                                        href={link}
                                        className='group'
                                        aria-label={`${platform} link`}
                                    >
                                        <div
                                            className='w-10 h-10 rounded-full
                                            bg-accent/10
                                            dark:bg-accent/20
                                            flex items-center justify-center
                                            group-hover:bg-primary
                                            group-hover:text-primary-foreground
                                            transition-all'
                                        >
                                            {socialIcons[platform] || (
                                                <span className='text-muted-foreground'>
                                                    {platform[0]}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                )
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className='text-lg font-semibold mb-6'>
                            Quick Links
                        </h4>
                        <nav className='space-y-3'>
                            {[
                                { href: "#properties", label: "Properties" },
                                { href: "#features", label: "Features" },
                                {
                                    href: "#testimonials",
                                    label: "Testimonials",
                                },
                                { href: "#contact", label: "Contact" },
                            ].map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className='block text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className='text-lg font-semibold mb-6'>Services</h4>
                        <nav className='space-y-3'>
                            {[
                                "Property Management",
                                "Maintenance",
                                "Tenant Screening",
                                "Leasing",
                            ].map((service) => (
                                <Link
                                    key={service}
                                    href='#'
                                    className='block text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    {service}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className='text-lg font-semibold mb-6'>
                            Newsletter
                        </h4>
                        <p className='text-muted-foreground mb-4'>
                            Subscribe for latest updates and exclusive offers.
                        </p>
                        <form className='flex space-x-2'>
                            <input
                                type='email'
                                placeholder='Enter your email'
                                className='flex-1 px-4 py-2 rounded-lg
                                    bg-accent/10
                                    dark:bg-accent/20
                                    border border-accent/50
                                    focus:ring-2 focus:ring-primary'
                            />
                            <Button variant='default'>Subscribe</Button>
                        </form>
                    </div>
                </div>

                {/* Bottom section */}
                <div className='border-t border-accent/20 py-6'>
                    <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
                        <div className='text-muted-foreground text-sm'>
                            © {new Date().getFullYear()} {orgData?.name}. All
                            rights reserved.
                        </div>
                        <nav className='flex space-x-4 text-sm'>
                            {[
                                { href: "#", label: "Privacy Policy" },
                                { href: "#", label: "Terms of Service" },
                                { href: "#", label: "Cookie Policy" },
                            ].map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className='text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
