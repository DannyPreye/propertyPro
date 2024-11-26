import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Building2, Phone, Shield, Users } from "lucide-react";
import { Organization } from "@/payload-types";

interface Props {
    children: React.ReactNode;
    organizationDetails: Organization;
}

const demoOrg = {
    name: "Skyline Properties",
    logo: "/api/placeholder/100/100",
    primaryColor: "#1E40AF", // Blue-700
    secondaryColor: "#60A5FA", // Blue-400
    description:
        "Your trusted partner in property management. We provide exceptional living spaces and outstanding service to our residents.",
    stats: [
        { label: "Properties Managed", value: "500+" },
        { label: "Happy Residents", value: "2000+" },
        { label: "Years Experience", value: "15+" },
        { label: "Cities Served", value: "10+" },
    ],
    features: [
        {
            title: "Professional Management",
            description:
                "Expert property management services with attention to detail",
            icon: <Building2 className='w-6 h-6' />,
        },
        {
            title: "24/7 Support",
            description:
                "Round-the-clock assistance for all your property needs",
            icon: <Phone className='w-6 h-6' />,
        },
        {
            title: "Secure Living",
            description:
                "State-of-the-art security systems and controlled access",
            icon: <Shield className='w-6 h-6' />,
        },
        {
            title: "Community Focus",
            description:
                "Building strong, vibrant communities for our residents",
            icon: <Users className='w-6 h-6' />,
        },
    ],
    featuredProperties: [
        {
            id: 1,
            name: "Sunset Heights",
            image: "/api/placeholder/400/300",
            location: "Downtown Area",
            price: "$1,200/month",
            beds: 2,
            baths: 2,
        },
        {
            id: 2,
            name: "River View Apartments",
            image: "/api/placeholder/400/300",
            location: "Riverside District",
            price: "$1,500/month",
            beds: 3,
            baths: 2,
        },
        {
            id: 3,
            name: "Park Place Residences",
            image: "/api/placeholder/400/300",
            location: "Central Park Area",
            price: "$1,800/month",
            beds: 3,
            baths: 2.5,
        },
    ],
    testimonials: [
        {
            id: 1,
            text: "Best property management company I've ever worked with. Professional and responsive!",
            author: "Sarah Johnson",
            role: "Resident since 2022",
        },
        {
            id: 2,
            text: "They make living here feel like home. The maintenance team is super quick and friendly.",
            author: "Michael Chen",
            role: "Resident since 2021",
        },
        {
            id: 3,
            text: "Excellent amenities and great community events. Truly a wonderful place to live.",
            author: "Emily Rodriguez",
            role: "Resident since 2023",
        },
    ],
    contact: {
        phone: "(555) 123-4567",
        email: "info@skylineproperties.com",
        address: "123 Property Lane, Suite 100, City, State 12345",
    },
    socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
    },
};

const OrganizationWebsiteLayout: React.FC<Props> = ({
    children,
    organizationDetails,
}) => {
    console.log("This is the organization details: ", organizationDetails);
    return (
        <div>
            <Header orgData={organizationDetails} />
            {children}
            <Footer orgData={organizationDetails} />
        </div>
    );
};

export default OrganizationWebsiteLayout;
