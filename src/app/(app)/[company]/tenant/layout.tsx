"use client";
import React from "react";
import {
    HomeIcon,
    DollarSign,
    Bell,
    Calendar,
    MessageSquare,
    FileText,
    Settings,
    Menu,
    X,
    ChevronDown,
    Building2,
    LogOut,
    User,
    HelpCircle,
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
import { FiTool } from "react-icons/fi";

interface Props {
    children: React.ReactNode;
}

const TenantDashboardLayout: React.FC<Props> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [notifications] = React.useState([
        { id: 1, title: "Rent payment due in 3 days", unread: true },
        { id: 2, title: "Maintenance request updated", unread: true },
        { id: 3, title: "New community announcement", unread: false },
    ]);

    const navigation = [
        {
            name: "Dashboard",
            icon: <HomeIcon className='w-5 h-5' />,
            href: "/dashboard",
            active: true,
        },
        {
            name: "Payments",
            icon: <DollarSign className='w-5 h-5' />,
            href: "/payments",
            badge: "1 Due",
        },
        {
            name: "Maintenance",
            icon: <FiTool className='w-5 h-5' />,
            href: "/maintenance",
            badge: "2 Active",
        },
        {
            name: "Documents",
            icon: <FileText className='w-5 h-5' />,
            href: "/documents",
        },
        {
            name: "Messages",
            icon: <MessageSquare className='w-5 h-5' />,
            href: "/messages",
            badge: "3 New",
        },
        {
            name: "Amenities",
            icon: <Calendar className='w-5 h-5' />,
            href: "/amenities",
        },
    ];

    return (
        <div className='min-h-screen flex bg-gray-50'>
            {/* Sidebar */}
            <div
                className={`fixed top-0 h-screen  inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:sticky`}
            >
                {/* Sidebar Header */}
                <div className='h-16 flex items-center justify-between px-4 border-b'>
                    <div className='flex items-center gap-2'>
                        <Building2 className='w-6 h-6 text-blue-600' />
                        <span className='font-bold text-xl'>PropertyPro</span>
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

                {/* Tenant Info */}
                <div className='p-4 border-b'>
                    <div className='flex items-center gap-3'>
                        <Avatar>
                            <AvatarImage src='/avatar.png' />
                            <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className='font-medium'>Sarah Johnson</h3>
                            <p className='text-sm text-gray-500'>
                                Unit 204, Sunset Heights
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className='p-4 space-y-1'>
                    {navigation.map((item) => (
                        <a
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
                        </a>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className='absolute bottom-0 left-0 right-0 p-4 border-t bg-white'>
                    <div className='space-y-1'>
                        <Button
                            variant='ghost'
                            className='w-full justify-start gap-2'
                        >
                            <Settings className='w-5 h-5' />
                            Settings
                        </Button>
                        <Button
                            variant='ghost'
                            className='w-full justify-start gap-2'
                        >
                            <HelpCircle className='w-5 h-5' />
                            Help & Support
                        </Button>
                        <Button
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
                            <h1 className='text-xl font-semibold text-gray-800'>
                                Tenant Portal
                            </h1>
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
                                            <AvatarImage src='/avatar.png' />
                                            <AvatarFallback>SJ</AvatarFallback>
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
                                        <MessageSquare className='w-4 h-4 mr-2' />
                                        Messages
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className='w-4 h-4 mr-2' />
                                        Account Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='text-red-600'>
                                        <LogOut className='w-4 h-4 mr-2' />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className='flex-1 overflow-x-hidden'>{children}</main>
            </div>
        </div>
    );
};

export default TenantDashboardLayout;
