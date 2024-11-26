import React from "react";
import {
    HomeIcon,
    DollarSign,
    Bell,
    Calendar,
    MessageSquare,
    FileText,
    ChevronRight,
    Clock,
    AlertCircle,
    Check,
    Download,
} from "lucide-react";
import { FiTool } from "react-icons/fi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const TenantPortalDashboard = () => {
    const nextPayment = {
        amount: 1500,
        dueDate: "April 1, 2024",
        daysLeft: 7,
    };

    return (
        <div className='bg-background text-foreground'>
            {/* Welcome Header */}
            <div className='mb-8'>
                <h1 className='text-2xl font-bold text-foreground'>
                    Welcome back, Sarah!
                </h1>
                <p className='text-muted-foreground'>
                    Unit 204, Sunset Heights Apartments
                </p>
            </div>

            {/* Quick Actions */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                <Card className='bg-primary text-primary-foreground'>
                    <CardContent className='pt-6'>
                        <div className='flex justify-between items-start mb-4'>
                            <div>
                                <p className='text-primary-foreground/70'>
                                    Next Rent Payment
                                </p>
                                <h3 className='text-2xl font-bold'>
                                    ${nextPayment.amount}
                                </h3>
                            </div>
                            <DollarSign className='size-6' />
                        </div>
                        <div className='space-y-2'>
                            <div className='flex justify-between text-sm'>
                                <span>Due Date: {nextPayment.dueDate}</span>
                                <span>{nextPayment.daysLeft} days left</span>
                            </div>
                            <Button
                                variant='secondary'
                                className='w-full dark:text-primary'
                            >
                                Pay Now
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className='pt-6'>
                        <div className='flex justify-between items-start mb-4'>
                            <div>
                                <p className='text-muted-foreground'>
                                    Lease Status
                                </p>
                                <h3 className='text-lg font-semibold text-foreground'>
                                    Active
                                </h3>
                            </div>
                            <Badge
                                variant='outline'
                                className='bg-green-100 text-green-800'
                            >
                                8 months remaining
                            </Badge>
                        </div>
                        <Progress value={40} className='mt-2' />
                        <p className='text-sm text-muted-foreground mt-2'>
                            Expires on Dec 31, 2024
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className='pt-6'>
                        <div className='flex justify-between items-start mb-4'>
                            <div>
                                <p className='text-muted-foreground'>
                                    Open Requests
                                </p>
                                <h3 className='text-lg font-semibold text-foreground'>
                                    2 Active
                                </h3>
                            </div>
                            <FiTool className='size-6 text-muted-foreground' />
                        </div>
                        <Button variant='outline' className='w-full'>
                            Submit New Request
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Main Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Main Content Area */}
                <div className='lg:col-span-2 space-y-6'>
                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                {[
                                    {
                                        icon: (
                                            <DollarSign className='text-green-500' />
                                        ),
                                        title: "March Rent Payment",
                                        description:
                                            "Payment processed successfully",
                                        time: "2 days ago",
                                        status: "success",
                                    },
                                    {
                                        icon: (
                                            <FiTool className='text-blue-500' />
                                        ),
                                        title: "Maintenance Request #1234",
                                        description:
                                            "Plumbing issue - In Progress",
                                        time: "3 days ago",
                                        status: "pending",
                                    },
                                    {
                                        icon: (
                                            <MessageSquare className='text-purple-500' />
                                        ),
                                        title: "Message from Property Manager",
                                        description:
                                            "RE: Upcoming building maintenance",
                                        time: "5 days ago",
                                        status: "info",
                                    },
                                ].map((activity, index) => (
                                    <div
                                        key={index}
                                        className='flex items-start gap-4 p-4 bg-accent rounded-lg'
                                    >
                                        <div className='p-2 bg-background rounded-full'>
                                            {React.cloneElement(activity.icon, {
                                                className: "size-4",
                                            })}
                                        </div>
                                        <div className='flex-1'>
                                            <h3 className='font-medium text-foreground'>
                                                {activity.title}
                                            </h3>
                                            <p className='text-sm text-muted-foreground'>
                                                {activity.description}
                                            </p>
                                        </div>
                                        <span className='text-sm text-muted-foreground'>
                                            {activity.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Maintenance Requests */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Maintenance Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                {[
                                    {
                                        id: "#1234",
                                        title: "Leaking Faucet in Kitchen",
                                        status: "In Progress",
                                        date: "Mar 20, 2024",
                                        priority: "Medium",
                                    },
                                    {
                                        id: "#1235",
                                        title: "AC Unit Maintenance",
                                        status: "Scheduled",
                                        date: "Mar 22, 2024",
                                        priority: "Low",
                                    },
                                ].map((request, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between p-4 bg-accent rounded-lg'
                                    >
                                        <div className='flex-1'>
                                            <div className='flex items-center gap-2'>
                                                <h3 className='font-medium text-foreground'>
                                                    {request.title}
                                                </h3>
                                                <Badge variant='outline'>
                                                    {request.id}
                                                </Badge>
                                            </div>
                                            <p className='text-sm text-muted-foreground'>
                                                Submitted on {request.date}
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <Badge
                                                variant='outline'
                                                className={
                                                    request.status ===
                                                    "In Progress"
                                                        ? "text-blue-800 border-blue-800"
                                                        : "text-green-800 border-green-800"
                                                }
                                            >
                                                {request.status}
                                            </Badge>
                                            <Button variant='ghost' size='sm'>
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className='space-y-6'>
                    {/* Quick Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Links</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-2'>
                                {[
                                    {
                                        icon: <FileText />,
                                        label: "Lease Documents",
                                    },
                                    {
                                        icon: <Calendar />,
                                        label: "Amenity Booking",
                                    },
                                    {
                                        icon: <MessageSquare />,
                                        label: "Contact Manager",
                                    },
                                    {
                                        icon: <Download />,
                                        label: "Download Statements",
                                    },
                                ].map((link, index) => (
                                    <Button
                                        key={index}
                                        variant='ghost'
                                        className='w-full justify-start gap-2 text-muted-foreground hover:text-foreground'
                                    >
                                        {React.cloneElement(link.icon, {
                                            className: "size-4",
                                        })}
                                        {link.label}
                                        <ChevronRight className='size-4 ml-auto' />
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Important Notices */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Important Notices</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                {[
                                    {
                                        title: "Building Maintenance",
                                        description:
                                            "Water shutdown scheduled for Mar 25, 9 AM - 2 PM",
                                        type: "warning",
                                    },
                                    {
                                        title: "Community Event",
                                        description:
                                            "Resident meetup this Saturday at 4 PM",
                                        type: "info",
                                    },
                                ].map((notice, index) => (
                                    <div
                                        key={index}
                                        className='p-4 bg-accent rounded-lg'
                                    >
                                        <div className='flex items-center gap-2 mb-2'>
                                            <AlertCircle
                                                className={
                                                    notice.type === "warning"
                                                        ? "text-yellow-500 size-4"
                                                        : "text-blue-500 size-4"
                                                }
                                            />
                                            <h3 className='font-medium text-foreground'>
                                                {notice.title}
                                            </h3>
                                        </div>
                                        <p className='text-sm text-muted-foreground'>
                                            {notice.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default TenantPortalDashboard;
