"use client";
import React from "react";
import {
    HomeIcon,
    Building2,
    Users,
    Calendar,
    MessageSquare,
    DollarSign,
    Settings,
    Bell,
    Menu,
    X,
    ChevronDown,
    LogOut,
    User,
    HelpCircle,
    Search,
    Globe,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Organization } from "@/payload-types";

interface Props {
    children: React.ReactNode;
    organizationDetails: Organization;
}

const OrganizationAdminDashboardLayout: React.FC<Props> = ({
    children,
    organizationDetails,
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const { data: session } = useSession();
    const [notifications] = React.useState([
        { id: 1, title: "New maintenance request from Unit 204", unread: true },
        { id: 2, title: "Overdue rent payment - Unit 156", unread: true },
        { id: 3, title: "New tenant application submitted", unread: false },
    ]);

    const navigation = [
        {
            name: "Dashboard",
            icon: <HomeIcon className='w-5 h-5' />,
            href: `/${organizationDetails?.slug}/admin`,
            active: true,
        },
        {
            name: "Properties",
            icon: <Building2 className='w-5 h-5' />,
            href: `//${organizationDetails?.slug}/admin/properties`,
            badge: "12 Units",
        },
        {
            name: "Tenants",
            icon: <Users className='w-5 h-5' />,
            href: `/${organizationDetails?.slug}/admin/tenants`,
            badge: "3 New",
        },
        {
            name: "Finances",
            icon: <DollarSign className='w-5 h-5' />,
            href: `/${organizationDetails?.slug}/admin/finances`,
            badge: "5 Due",
        },
        {
            name: "Messages",
            icon: <MessageSquare className='w-5 h-5' />,
            href: `/${organizationDetails?.slug}/admin/messages`,
            badge: "2 New",
        },
        {
            name: "Website Management",
            icon: <Globe className='w-5 h-5' />,
            href: `/${organizationDetails?.slug}/admin/calendar`,
        },
        {
            name: "Calendar",
            icon: <Calendar className='w-5 h-5' />,
            href: `/${organizationDetails?.slug}/admin/calendar`,
        },
    ];

    return (
        <div className='min-h-screen flex bg-gray-50'>
            {/* Sidebar */}
            <div
                className={`fixed h-screen inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:sticky`}
            >
                {/* Sidebar Header */}
                <div className='h-16 flex items-center justify-between px-4 border-b'>
                    <div className='flex items-center gap-2'>
                        <Building2 className='w-6 h-6 text-blue-600' />
                        <span className='font-bold text-xl'>
                            {organizationDetails?.name}
                        </span>
                    </div>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='lg:hidden'
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X className='w-5 h-5' />
                    </Button>
                </div>

                {/* Admin Info */}
                <div className='p-4 border-b'>
                    <div className='flex items-center gap-3'>
                        <Avatar>
                            <AvatarImage src='/admin-avatar.png' />
                            <AvatarFallback>
                                {session?.user.firstName[0]}
                                {session?.user?.lastName[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className='font-medium uppercase'>
                                {session?.user.firstName}{" "}
                                {session?.user?.lastName}
                            </h3>
                            <p className='text-sm capitalize text-gray-500'>
                                {session?.user?.role}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className='p-4 space-y-1'>
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                item.active
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            {item.icon}
                            <span className='flex-1'>{item.name}</span>
                            {item.badge && (
                                <Badge variant='secondary' className='ml-auto'>
                                    {item.badge}
                                </Badge>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className='absolute bottom-0 left-0 right-0 p-4 border-t bg-white'>
                    <div className='space-y-1'>
                        <Link
                            href={`/${organizationDetails?.slug}/admin/settings`}
                        >
                            <Button
                                variant='ghost'
                                className='w-full justify-start gap-2'
                            >
                                <Settings className='w-5 h-5' />
                                Settings
                            </Button>
                        </Link>
                        <Button
                            variant='ghost'
                            className='w-full justify-start gap-2'
                        >
                            <HelpCircle className='w-5 h-5' />
                            Help & Support
                        </Button>
                        <Button
                            onClick={async () => await signOut()}
                            variant='ghost'
                            className='w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50'
                        >
                            <LogOut className='w-5 h-5' />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col min-h-screen`}>
                {/* Top Navigation */}
                <header className='h-16 bg-white border-b sticky top-0 z-40'>
                    <div className='h-full px-4 flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='lg:hidden'
                                onClick={() => setIsSidebarOpen(true)}
                            >
                                <Menu className='w-5 h-5' />
                            </Button>
                            <div className='flex items-center gap-4'>
                                <h1 className='text-xl font-semibold text-gray-800'>
                                    Admin Portal
                                </h1>
                                <div className='relative hidden md:block'>
                                    <Search className='absolute left-3 top-2.5 w-4 h-4 text-gray-400' />
                                    <input
                                        type='text'
                                        placeholder='Search properties, tenants...'
                                        className='pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center gap-4'>
                            {/* Notifications */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='relative'
                                    >
                                        <Bell className='w-5 h-5' />
                                        {notifications.some(
                                            (n) => n.unread
                                        ) && (
                                            <span className='absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full' />
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align='end'
                                    className='w-80'
                                >
                                    {notifications.map((notification) => (
                                        <DropdownMenuItem
                                            key={notification.id}
                                            className='p-4'
                                        >
                                            <div className='flex items-start gap-4'>
                                                <div
                                                    className={`w-2 h-2 mt-2 rounded-full ${notification.unread ? "bg-blue-500" : "bg-gray-200"}`}
                                                />
                                                <div className='flex-1'>
                                                    <p
                                                        className={`text-sm ${notification.unread ? "font-medium" : ""}`}
                                                    >
                                                        {notification.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='p-2 text-center text-sm text-blue-600'>
                                        View all notifications
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Profile Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='ghost' className='gap-2'>
                                        <Avatar className='w-8 h-8'>
                                            <AvatarImage src='/admin-avatar.png' />
                                            <AvatarFallback>
                                                {session?.user.firstName[0]}
                                                {session?.user?.lastName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <ChevronDown className='w-4 h-4' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align='end'
                                    className='w-56'
                                >
                                    <DropdownMenuItem>
                                        <User className='w-4 h-4 mr-2' />
                                        Profile Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Building2 className='w-4 h-4 mr-2' />
                                        Property Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className='w-4 h-4 mr-2' />
                                        System Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={async () => await signOut()}
                                        className='text-red-600'
                                    >
                                        <LogOut className='w-4 h-4 mr-2' />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className='flex-1 overflow-x-hidden p-6 max-w-7xl '>
                    {children}
                </main>

                {/* Footer */}
                <footer className='border-t py-4 px-6 bg-white'>
                    <div className='flex items-center justify-between text-sm text-gray-500'>
                        <p>© 2024 PropertyPro. All rights reserved.</p>
                        <div className='flex gap-4'>
                            <a href='#' className='hover:text-gray-900'>
                                Privacy Policy
                            </a>
                            <a href='#' className='hover:text-gray-900'>
                                Terms of Service
                            </a>
                            <a href='#' className='hover:text-gray-900'>
                                Admin Support
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default OrganizationAdminDashboardLayout;
