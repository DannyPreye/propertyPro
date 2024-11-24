import React from "react";
import {
    Users,
    Search,
    Filter,
    MoreVertical,
    Check,
    X,
    Mail,
    Phone,
    Clock,
    AlertCircle,
    ChevronDown,
    Download,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const TenantDashboard = () => {
    const tenantStatusColors: any = {
        active: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        late: "bg-red-100 text-red-800",
        ended: "bg-gray-100 text-gray-800",
    };

    return (
        <div className='p-6 max-w-7xl mx-auto'>
            {/* Header Section */}
            <div className='flex flex-col md:flex-row md:items-center justify-between mb-8'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                        <Users className='w-6 h-6' />
                        Tenant Management
                    </h1>
                    <p className='text-gray-600 mt-1'>
                        Manage and monitor all your property tenants
                    </p>
                </div>
                <div className='mt-4 md:mt-0'>
                    <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
                        + Add New Tenant
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                {[
                    {
                        title: "Total Tenants",
                        value: "156",
                        trend: "+12",
                        color: "text-blue-600",
                    },
                    {
                        title: "Active Leases",
                        value: "142",
                        trend: "+8",
                        color: "text-green-600",
                    },
                    {
                        title: "Pending Applications",
                        value: "14",
                        trend: "+3",
                        color: "text-yellow-600",
                    },
                    {
                        title: "Late Payments",
                        value: "8",
                        trend: "-2",
                        color: "text-red-600",
                    },
                ].map((stat, index) => (
                    <Card key={index}>
                        <CardContent className='pt-6'>
                            <div className='text-gray-500 text-sm font-medium'>
                                {stat.title}
                            </div>
                            <div className='mt-2 flex items-baseline'>
                                <div className='text-2xl font-bold'>
                                    {stat.value}
                                </div>
                                <span className={`ml-2 text-sm ${stat.color}`}>
                                    {stat.trend} this month
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content */}
            <Card className='mb-8'>
                <CardHeader className='border-b'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                        <div className='relative flex-1'>
                            <Search className='absolute left-3 top-3 w-4 h-4 text-gray-400' />
                            <input
                                type='text'
                                placeholder='Search tenants...'
                                className='pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='flex items-center gap-4'>
                            <Button
                                variant='outline'
                                className='flex items-center gap-2'
                            >
                                <Filter className='w-4 h-4' />
                                Filters
                                <ChevronDown className='w-4 h-4' />
                            </Button>
                            <Button
                                variant='outline'
                                className='flex items-center gap-2'
                            >
                                <Download className='w-4 h-4' />
                                Export
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <Tabs defaultValue='all' className='w-full'>
                        <TabsList className='mb-6'>
                            <TabsTrigger value='all'>All Tenants</TabsTrigger>
                            <TabsTrigger value='active'>Active</TabsTrigger>
                            <TabsTrigger value='pending'>Pending</TabsTrigger>
                            <TabsTrigger value='late'>Late Payment</TabsTrigger>
                        </TabsList>

                        <TabsContent value='all'>
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead>
                                        <tr className='border-b'>
                                            <th className='text-left py-4 px-4 font-medium text-gray-500'>
                                                Tenant
                                            </th>
                                            <th className='text-left py-4 px-4 font-medium text-gray-500'>
                                                Unit
                                            </th>
                                            <th className='text-left py-4 px-4 font-medium text-gray-500'>
                                                Status
                                            </th>
                                            <th className='text-left py-4 px-4 font-medium text-gray-500'>
                                                Lease End
                                            </th>
                                            <th className='text-left py-4 px-4 font-medium text-gray-500'>
                                                Last Payment
                                            </th>
                                            <th className='text-right py-4 px-4 font-medium text-gray-500'>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y'>
                                        {[
                                            {
                                                name: "Sarah Johnson",
                                                email: "sarah.j@email.com",
                                                unit: "Apt 204, Sunset Heights",
                                                status: "active",
                                                leaseEnd: "Dec 31, 2024",
                                                lastPayment: "Mar 1, 2024",
                                                avatar: "SJ",
                                            },
                                            {
                                                name: "Michael Chen",
                                                email: "m.chen@email.com",
                                                unit: "Unit 12B, Pine Grove",
                                                status: "pending",
                                                leaseEnd: "-",
                                                lastPayment: "-",
                                                avatar: "MC",
                                            },
                                            {
                                                name: "Emma Wilson",
                                                email: "emma.w@email.com",
                                                unit: "Apt 506, Ocean View",
                                                status: "late",
                                                leaseEnd: "Aug 15, 2024",
                                                lastPayment: "Feb 5, 2024",
                                                avatar: "EW",
                                            },
                                        ].map((tenant, index) => (
                                            <tr
                                                key={index}
                                                className='hover:bg-gray-50'
                                            >
                                                <td className='py-4 px-4'>
                                                    <div className='flex items-center gap-3'>
                                                        <Avatar>
                                                            <AvatarFallback>
                                                                {tenant.avatar}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className='font-medium'>
                                                                {tenant.name}
                                                            </div>
                                                            <div className='text-sm text-gray-500'>
                                                                {tenant.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-4 px-4'>
                                                    <div className='text-sm'>
                                                        {tenant.unit}
                                                    </div>
                                                </td>
                                                <td className='py-4 px-4'>
                                                    <Badge
                                                        className={
                                                            tenantStatusColors[
                                                                tenant.status
                                                            ]
                                                        }
                                                    >
                                                        {tenant.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            tenant.status.slice(
                                                                1
                                                            )}
                                                    </Badge>
                                                </td>
                                                <td className='py-4 px-4'>
                                                    <div className='text-sm'>
                                                        {tenant.leaseEnd}
                                                    </div>
                                                </td>
                                                <td className='py-4 px-4'>
                                                    <div className='text-sm'>
                                                        {tenant.lastPayment}
                                                    </div>
                                                </td>
                                                <td className='py-4 px-4'>
                                                    <div className='flex items-center justify-end gap-2'>
                                                        <Button
                                                            variant='ghost'
                                                            size='icon'
                                                        >
                                                            <Mail className='w-4 h-4' />
                                                        </Button>
                                                        <Button
                                                            variant='ghost'
                                                            size='icon'
                                                        >
                                                            <Phone className='w-4 h-4' />
                                                        </Button>
                                                        <Button
                                                            variant='ghost'
                                                            size='icon'
                                                        >
                                                            <MoreVertical className='w-4 h-4' />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <Card className='lg:col-span-2'>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            {[
                                {
                                    icon: <Check className='text-green-500' />,
                                    title: "New Lease Signed",
                                    description:
                                        "Michael Chen signed lease for Unit 12B",
                                    time: "2 hours ago",
                                },
                                {
                                    icon: (
                                        <AlertCircle className='text-red-500' />
                                    ),
                                    title: "Late Payment Notice",
                                    description:
                                        "Payment reminder sent to Emma Wilson",
                                    time: "4 hours ago",
                                },
                                {
                                    icon: <Clock className='text-blue-500' />,
                                    title: "Lease Renewal Reminder",
                                    description:
                                        "Sarah Johnson's lease expires in 30 days",
                                    time: "6 hours ago",
                                },
                            ].map((activity, index) => (
                                <div
                                    key={index}
                                    className='flex items-start gap-4 p-4 bg-gray-50 rounded-lg'
                                >
                                    <div className='p-2 bg-white rounded-full'>
                                        {React.cloneElement(activity.icon, {
                                            className: "w-4 h-4",
                                        })}
                                    </div>
                                    <div className='flex-1'>
                                        <h3 className='font-medium text-gray-800'>
                                            {activity.title}
                                        </h3>
                                        <p className='text-sm text-gray-500'>
                                            {activity.description}
                                        </p>
                                    </div>
                                    <span className='text-sm text-gray-400'>
                                        {activity.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Lease Expirations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            {[
                                {
                                    name: "Sarah Johnson",
                                    unit: "Apt 204",
                                    days: 30,
                                },
                                {
                                    name: "David Lee",
                                    unit: "Unit 15A",
                                    days: 45,
                                },
                                {
                                    name: "Rachel Smith",
                                    unit: "Apt 312",
                                    days: 60,
                                },
                            ].map((lease, index) => (
                                <div
                                    key={index}
                                    className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
                                >
                                    <div>
                                        <h3 className='font-medium text-gray-800'>
                                            {lease.name}
                                        </h3>
                                        <p className='text-sm text-gray-500'>
                                            {lease.unit}
                                        </p>
                                    </div>
                                    <Badge variant='outline'>
                                        {lease.days} days left
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TenantDashboard;
