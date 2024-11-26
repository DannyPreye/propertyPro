"use client";
import React, { useState } from "react";
import {
    Building2,
    Mail,
    Phone,
    MapPin,
    Users,
    Link as LinkIcon,
    Trash2,
    PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const OrganizationSettings = () => {
    const [organization, setOrganization] = useState({
        name: "Sunset Heights Apartments",
        slug: "sunset-heights",
        contact: {
            email: "contact@sunsetheights.com",
            phone: "+1 (555) 123-4567",
            address: "123 Sunset Blvd, Cityville, ST 12345",
        },
        description:
            "Modern apartment community offering comfortable living spaces",
        companySize: "51-100",
        domains: ["sunsetheights.com"],
        socialLinks: [
            {
                name: "LinkedIn",
                url: "https://linkedin.com/company/sunsetheights",
            },
        ],
        settings: {
            allowTenantPortal: true,
            enableMaintenanceRequests: true,
            paymentMethods: ["bank", "card"],
        },
    });

    const [newDomain, setNewDomain] = useState("");
    const [newSocialLink, setNewSocialLink] = useState({ name: "", url: "" });

    const handleInputChange = (section: any, field: any, value: any) => {
        setOrganization((prev: any) => ({
            ...prev,
            [section]: {
                ...(prev[section] || {}),
                [field]: value,
            },
        }));
    };

    const handleContactChange = (field: any, value: any) => {
        setOrganization((prev) => ({
            ...prev,
            contact: {
                ...prev.contact,
                [field]: value,
            },
        }));
    };

    const addDomain = () => {
        if (newDomain && !organization.domains.includes(newDomain)) {
            setOrganization((prev) => ({
                ...prev,
                domains: [...prev.domains, newDomain],
            }));
            setNewDomain("");
        }
    };

    const removeDomain = (domainToRemove: any) => {
        setOrganization((prev) => ({
            ...prev,
            domains: prev.domains.filter((domain) => domain !== domainToRemove),
        }));
    };

    const addSocialLink = () => {
        if (newSocialLink.name && newSocialLink.url) {
            setOrganization((prev) => ({
                ...prev,
                socialLinks: [...prev.socialLinks, { ...newSocialLink }],
            }));
            setNewSocialLink({ name: "", url: "" });
        }
    };

    const removeSocialLink = (linkToRemove: any) => {
        setOrganization((prev) => ({
            ...prev,
            socialLinks: prev.socialLinks.filter(
                (link) => link.url !== linkToRemove
            ),
        }));
    };

    return (
        <div className=' py-8 w-full'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-800 flex items-center gap-3'>
                    <Building2 className='w-8 h-8 text-green-500' />
                    Organization Settings
                </h1>
                <p className='text-gray-600 mt-2'>
                    Manage your organization's core information and preferences
                </p>
            </div>

            <div className='grid gap-6'>
                {/* Basic Organization Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <Building2 className='w-5 h-5 text-blue-500' />
                            Organization Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='grid md:grid-cols-2 gap-4'>
                        <div>
                            <Label>Organization Name</Label>
                            <Input
                                value={organization.name}
                                onChange={(e) =>
                                    handleInputChange(
                                        "",
                                        "name",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div>
                            <Label>Organization Slug</Label>
                            <Input
                                value={organization.slug}
                                onChange={(e) =>
                                    handleInputChange(
                                        "",
                                        "slug",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className='md:col-span-2'>
                            <Label>Description</Label>
                            <Input
                                value={organization.description}
                                onChange={(e) =>
                                    handleInputChange(
                                        "",
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div>
                            <Label>Company Size</Label>
                            <Select
                                value={organization.companySize}
                                onValueChange={(value) =>
                                    handleInputChange("", "companySize", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder='Select company size' />
                                </SelectTrigger>
                                <SelectContent>
                                    {[
                                        "1-10",
                                        "11-50",
                                        "51-100",
                                        "101-500",
                                        "501-1000",
                                    ].map((size) => (
                                        <SelectItem key={size} value={size}>
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <Mail className='w-5 h-5 text-purple-500' />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='grid md:grid-cols-2 gap-4'>
                        <div>
                            <Label className='flex items-center gap-2'>
                                <Mail className='w-4 h-4 text-gray-500' /> Email
                            </Label>
                            <Input
                                value={organization.contact.email}
                                onChange={(e) =>
                                    handleContactChange("email", e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <Label className='flex items-center gap-2'>
                                <Phone className='w-4 h-4 text-gray-500' />{" "}
                                Phone
                            </Label>
                            <Input
                                value={organization.contact.phone}
                                onChange={(e) =>
                                    handleContactChange("phone", e.target.value)
                                }
                            />
                        </div>
                        <div className='md:col-span-2'>
                            <Label className='flex items-center gap-2'>
                                <MapPin className='w-4 h-4 text-gray-500' />{" "}
                                Address
                            </Label>
                            <Input
                                value={organization.contact.address}
                                onChange={(e) =>
                                    handleContactChange(
                                        "address",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Domains Management */}
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <LinkIcon className='w-5 h-5 text-teal-500' />
                            Domain Management
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='flex gap-2 mb-4'>
                            <Input
                                placeholder='Enter new domain (e.g. example.com)'
                                value={newDomain}
                                onChange={(e) => setNewDomain(e.target.value)}
                            />
                            <Button onClick={addDomain}>
                                <PlusCircle className='mr-2 w-4 h-4' /> Add
                                Domain
                            </Button>
                        </div>
                        {organization.domains.map((domain) => (
                            <div
                                key={domain}
                                className='flex items-center justify-between bg-gray-50 p-2 rounded-lg mb-2'
                            >
                                <span>{domain}</span>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    onClick={() => removeDomain(domain)}
                                >
                                    <Trash2 className='w-4 h-4 text-red-500' />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <Users className='w-5 h-5 text-indigo-500' />
                            Social Links
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid md:grid-cols-2 gap-4 mb-4'>
                            <Input
                                placeholder='Platform Name'
                                value={newSocialLink.name}
                                onChange={(e) =>
                                    setNewSocialLink((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                            />
                            <Input
                                placeholder='Profile URL'
                                value={newSocialLink.url}
                                onChange={(e) =>
                                    setNewSocialLink((prev) => ({
                                        ...prev,
                                        url: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <Button
                            onClick={addSocialLink}
                            disabled={!newSocialLink.name || !newSocialLink.url}
                        >
                            <PlusCircle className='mr-2 w-4 h-4' /> Add Social
                            Link
                        </Button>
                        <div className='mt-4 space-y-2'>
                            {organization.socialLinks.map((link) => (
                                <div
                                    key={link.url}
                                    className='flex items-center justify-between bg-gray-50 p-2 rounded-lg'
                                >
                                    <div className='flex items-center gap-2'>
                                        <Badge variant='secondary'>
                                            {link.name}
                                        </Badge>
                                        <a
                                            href={link.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='text-blue-600 hover:underline'
                                        >
                                            {link.url}
                                        </a>
                                    </div>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() =>
                                            removeSocialLink(link.url)
                                        }
                                    >
                                        <Trash2 className='w-4 h-4 text-red-500' />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Organization Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <Building2 className='w-5 h-5 text-orange-500' />
                            Organization Preferences
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='flex items-center justify-between'>
                            <Label>Allow Tenant Portal</Label>
                            <Switch
                                checked={
                                    organization.settings.allowTenantPortal
                                }
                                onCheckedChange={(checked) =>
                                    setOrganization((prev) => ({
                                        ...prev,
                                        settings: {
                                            ...prev.settings,
                                            allowTenantPortal: checked,
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <Label>Enable Maintenance Requests</Label>
                            <Switch
                                checked={
                                    organization.settings
                                        .enableMaintenanceRequests
                                }
                                onCheckedChange={(checked) =>
                                    setOrganization((prev) => ({
                                        ...prev,
                                        settings: {
                                            ...prev.settings,
                                            enableMaintenanceRequests: checked,
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <Label>Payment Methods</Label>
                            <div className='flex gap-2 mt-2'>
                                {["bank", "card", "cash"].map((method) => (
                                    <Badge
                                        key={method}
                                        variant={
                                            organization.settings.paymentMethods.includes(
                                                method
                                            )
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() =>
                                            setOrganization((prev) => ({
                                                ...prev,
                                                settings: {
                                                    ...prev.settings,
                                                    paymentMethods:
                                                        prev.settings.paymentMethods.includes(
                                                            method
                                                        )
                                                            ? prev.settings.paymentMethods.filter(
                                                                  (m) =>
                                                                      m !==
                                                                      method
                                                              )
                                                            : [
                                                                  ...prev
                                                                      .settings
                                                                      .paymentMethods,
                                                                  method,
                                                              ],
                                                },
                                            }))
                                        }
                                        className='cursor-pointer'
                                    >
                                        {method.charAt(0).toUpperCase() +
                                            method.slice(1)}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Save Changes */}
                <div className='flex justify-end mt-6'>
                    <Button size='lg' className='bg-blue-600 hover:bg-blue-700'>
                        Save Organization Settings
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrganizationSettings;
