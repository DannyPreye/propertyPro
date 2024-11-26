import React from "react";
import {
    User,
    Building2,
    Settings,
    ChevronRight,
    Shield,
    Lock,
    Palette,
    Bell,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

interface Props {
    params: any;
}
const SettingsHomepage: React.FC<Props> = async ({ params }) => {
    const { company } = await params;

    const settingsSections = [
        {
            icon: <User className='w-6 h-6 text-blue-500' />,
            title: "Profile Settings",
            description:
                "Manage your personal information and account preferences",
            route: `/${company}/admin/settings/profile"`,
        },
        {
            icon: <Building2 className='w-6 h-6 text-green-500' />,
            title: "Property Settings",
            description:
                "Configure your property details and lease information",
            route: `/${company}/admin/settings/property`,
        },
        {
            icon: <Settings className='w-6 h-6 text-purple-500' />,
            title: "Organization Settings",
            description: "Customize organization-wide preferences and branding",
            route: `/${company}/admin/settings/organization`,
        },
    ];

    const additionalSettings = [
        {
            icon: <Shield className='w-5 h-5 text-orange-500' />,
            title: "Security",
            description: "Manage password and two-factor authentication",
        },
        {
            icon: <Lock className='w-5 h-5 text-red-500' />,
            title: "Privacy",
            description: "Control your data and privacy settings",
        },
        {
            icon: <Palette className='w-5 h-5 text-teal-500' />,
            title: "Appearance",
            description: "Customize UI theme and color preferences",
        },
        {
            icon: <Bell className='w-5 h-5 text-indigo-500' />,
            title: "Notifications",
            description: "Manage email and in-app notification settings",
        },
    ];

    return (
        <div className=' py-8 '>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                    Settings
                </h1>
                <p className='text-gray-600'>
                    Manage your account and preferences
                </p>
            </div>

            <div className='grid gap-6'>
                {/* Main Settings Sections */}
                <div className='grid md:grid-cols-3 gap-4'>
                    {settingsSections.map((section, index) => (
                        <Link href={section.route} key={index}>
                            <Card
                                key={index}
                                className='hover:shadow-md transition-all duration-300 cursor-pointer group'
                            >
                                <div className='p-6'>
                                    <div className='flex items-center justify-between mb-4'>
                                        {section.icon}
                                        <ChevronRight className='w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity' />
                                    </div>
                                    <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                                        {section.title}
                                    </h3>
                                    <p className='text-sm text-gray-500'>
                                        {section.description}
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Additional Settings */}
                <div className='bg-gray-50 rounded-lg p-6'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                        Additional Settings
                    </h2>
                    <div className='grid md:grid-cols-2 gap-4'>
                        {additionalSettings.map((setting, index) => (
                            <Dialog key={index}>
                                <DialogTrigger asChild>
                                    <div className='flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer group'>
                                        {setting.icon}
                                        <div className='ml-4 flex-grow'>
                                            <h4 className='font-medium text-gray-800 group-hover:text-blue-600 transition-colors'>
                                                {setting.title}
                                            </h4>
                                            <p className='text-sm text-gray-500'>
                                                {setting.description}
                                            </p>
                                        </div>
                                        <ChevronRight className='w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity' />
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            {setting.title} Settings
                                        </DialogTitle>
                                    </DialogHeader>
                                    {/* Placeholder for future detailed settings */}
                                    <p className='text-gray-500'>
                                        Detailed {setting.title.toLowerCase()}{" "}
                                        settings coming soon.
                                    </p>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsHomepage;
