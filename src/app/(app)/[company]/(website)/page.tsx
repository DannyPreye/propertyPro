import React from "react";
import {
    Building2,
    Phone,
    Mail,
    MapPin,
    ChevronRight,
    Users,
    Shield,
    Star,
    ArrowRight,
    Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// This would typically come from your database/API
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

const OrganizationLandingPage = async () => {
    const orgData = demoOrg;

    return (
        <div className='min-h-screen'>
            {/* Hero Section */}
            <section className='relative min-h-screen flex items-center pt-20 overflow-hidden'>
                <div className='absolute inset-0 z-0'>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80 mix-blend-multiply' />
                    <img
                        src='/api/placeholder/1920/1080'
                        alt='Hero background'
                        className='w-full h-full object-cover'
                    />
                </div>

                <div className='relative z-10 max-w-7xl mx-auto px-6 py-32'>
                    <div className='grid lg:grid-cols-2 gap-16 items-center'>
                        <div className='text-white'>
                            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6'>
                                <Check className='w-4 h-4 text-blue-400' />
                                <span className='text-sm font-medium'>
                                    Trusted by 2000+ residents
                                </span>
                            </div>

                            <h1 className='text-5xl lg:text-7xl font-bold mb-6 leading-tight'>
                                Find Your Perfect{" "}
                                <span className='text-blue-400'>Home</span>
                            </h1>

                            <p className='text-xl text-white/90 mb-8 max-w-lg'>
                                {orgData.description}
                            </p>

                            <div className='flex flex-wrap gap-4'>
                                <Button
                                    size='lg'
                                    className='bg-white text-blue-600 hover:bg-gray-100'
                                >
                                    Explore Properties
                                    <ArrowRight className='w-4 h-4 ml-2' />
                                </Button>
                                <Button
                                    size='lg'
                                    variant='outline'
                                    className='border-white text-white hover:bg-white/10'
                                >
                                    Schedule a Tour
                                </Button>
                            </div>

                            <div className='mt-12 grid grid-cols-2 md:grid-cols-4 gap-8'>
                                {orgData.stats.map((stat: any, index: any) => (
                                    <div key={index} className='text-center'>
                                        <div className='text-3xl font-bold mb-1 text-blue-400'>
                                            {stat.value}
                                        </div>
                                        <div className='text-sm text-white/80'>
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='relative hidden lg:block'>
                            <div className='absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl transform rotate-3' />
                            <img
                                src='/api/placeholder/600/800'
                                alt='Featured property'
                                className='relative rounded-2xl shadow-2xl transform -rotate-3 transition-transform hover:rotate-0 duration-500'
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id='features' className='py-24 px-6 bg-gray-50 '>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center max-w-2xl mx-auto mb-16'>
                        <h2 className='text-3xl text-primary font-bold mb-4'>
                            Why Choose {orgData.name}
                        </h2>
                        <p className='text-gray-600'>
                            We combine exceptional service with cutting-edge
                            technology to deliver the best living experience for
                            our residents.
                        </p>
                    </div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {orgData.features.map((feature: any, index: any) => (
                            <Card
                                key={index}
                                className='group hover:shadow-lg transition-shadow duration-300'
                            >
                                <CardContent className='p-8'>
                                    <div className='mb-6 relative'>
                                        <div
                                            className='w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center
                                  group-hover:bg-blue-600 transition-colors duration-300'
                                        >
                                            <div className='text-blue-600 group-hover:text-white transition-colors duration-300'>
                                                {feature.icon}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className='text-xl font-semibold mb-3'>
                                        {feature.title}
                                    </h3>
                                    <p className='text-gray-600'>
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Properties Section */}
            <section id='properties' className='py-24 px-6'>
                <div className='max-w-7xl mx-auto'>
                    <div className='flex justify-between items-end mb-12'>
                        <div>
                            <h2 className='text-3xl font-bold mb-4'>
                                Featured Properties
                            </h2>
                            <p className='text-gray-600 max-w-xl'>
                                Discover our carefully curated selection of
                                premium properties designed to match your
                                lifestyle.
                            </p>
                        </div>
                        <Button
                            variant='outline'
                            className='hidden md:flex items-center gap-2'
                        >
                            View All Properties
                            <ChevronRight className='w-4 h-4' />
                        </Button>
                    </div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {orgData.featuredProperties.map((property: any) => (
                            <Card
                                key={property.id}
                                className='group overflow-hidden hover:shadow-xl transition-shadow duration-300'
                            >
                                <div className='relative overflow-hidden'>
                                    <img
                                        src={property.image}
                                        alt={property.name}
                                        className='w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                                </div>
                                <CardContent className='p-6'>
                                    <div className='flex items-center gap-2 text-sm text-blue-600 mb-2'>
                                        <MapPin className='w-4 h-4' />
                                        {property.location}
                                    </div>
                                    <h3 className='text-xl font-semibold mb-2'>
                                        {property.name}
                                    </h3>
                                    <div className='flex justify-between items-center mb-4'>
                                        <div className='font-semibold text-2xl'>
                                            {property.price}
                                        </div>
                                        <div className='text-gray-600'>
                                            {property.beds} beds •{" "}
                                            {property.baths} baths
                                        </div>
                                    </div>
                                    <Button className='w-full bg-blue-600 hover:bg-blue-700'>
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section
                id='testimonials'
                className='relative py-24 overflow-hidden'
            >
                <div className='absolute inset-0 bg-blue-50' />
                <div className='absolute inset-0'>
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-100/50 to-white/30' />
                    <svg
                        className='absolute bottom-0 left-0 right-0'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 1440 320'
                    >
                        <path
                            fill='#ffffff'
                            fillOpacity='1'
                            d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
                        />
                    </svg>
                </div>

                <div className='relative z-10 max-w-7xl mx-auto px-6'>
                    <div className='text-center max-w-2xl mx-auto mb-16'>
                        <h2 className='text-3xl text-primary font-bold mb-4'>
                            What Our Residents Say
                        </h2>
                        <p className='text-gray-600'>
                            Don't just take our word for it. Hear directly from
                            our satisfied residents.
                        </p>
                    </div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {orgData.testimonials.map((testimonial: any) => (
                            <Card
                                key={testimonial.id}
                                className='relative hover:shadow-lg transition-shadow duration-300'
                            >
                                <CardContent className='p-8'>
                                    <div className='flex gap-1 mb-6'>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className='w-5 h-5 fill-current text-yellow-400'
                                            />
                                        ))}
                                    </div>
                                    <p className='text-gray-600 mb-6 italic'>
                                        "{testimonial.text}"
                                    </p>
                                    <div className='flex items-center gap-4'>
                                        <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center'>
                                            <span className='text-blue-600 font-semibold text-lg'>
                                                {testimonial.author[0]}
                                            </span>
                                        </div>
                                        <div>
                                            <div className='font-semibold'>
                                                {testimonial.author}
                                            </div>
                                            <div className='text-sm text-gray-500'>
                                                {testimonial.role}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section
                id='contact'
                className='relative py-24 px-6 overflow-hidden'
            >
                <div className='absolute inset-0'>
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-900/95 to-blue-800/90' />
                    <img
                        src='/api/placeholder/1920/1080'
                        alt='Contact background'
                        className='w-full h-full object-cover'
                    />
                </div>

                <div className='relative z-10 max-w-7xl mx-auto'>
                    <div className='grid lg:grid-cols-2 gap-12 items-center'>
                        <div className='text-white'>
                            <h2 className='text-3xl font-bold mb-6'>
                                Let's Start a Conversation
                            </h2>
                            <p className='text-white/90 mb-8 text-lg'>
                                Whether you're looking for your next home or
                                have questions about our properties, our team is
                                here to help make your journey easier.
                            </p>

                            <div className='space-y-6'>
                                <div className='flex items-center gap-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm'>
                                    <div className='w-12 h-12 rounded-full bg-white/20 flex items-center justify-center'>
                                        <Phone className='w-6 h-6' />
                                    </div>
                                    <div>
                                        <div className='text-sm text-white/70'>
                                            Call Us
                                        </div>
                                        <div className='font-medium'>
                                            {orgData.contact.phone}
                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-center gap-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm'>
                                    <div className='w-12 h-12 rounded-full bg-white/20 flex items-center justify-center'>
                                        <Mail className='w-6 h-6' />
                                    </div>
                                    <div>
                                        <div className='text-sm text-white/70'>
                                            Email Us
                                        </div>
                                        <div className='font-medium'>
                                            {orgData.contact.email}
                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-center gap-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm'>
                                    <div className='w-12 h-12 rounded-full bg-white/20 flex items-center justify-center'>
                                        <MapPin className='w-6 h-6' />
                                    </div>
                                    <div>
                                        <div className='text-sm text-white/70'>
                                            Visit Us
                                        </div>
                                        <div className='font-medium'>
                                            {orgData.contact.address}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white rounded-2xl p-8 shadow-2xl'>
                            <h3 className='text-2xl font-semibold mb-6'>
                                Send Us a Message
                            </h3>
                            <form className='space-y-4'>
                                <div className='grid md:grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            First Name
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full px-4 py-3 rounded-lg bg-transparent border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                            placeholder='John'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            Last Name
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full px-4 py-3 rounded-lg border bg-transparent border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                            placeholder='Doe'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                                        Email Address
                                    </label>
                                    <input
                                        type='email'
                                        className='w-full px-4 py-3 rounded-lg border bg-transparent border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        placeholder='john@example.com'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                                        Phone Number
                                    </label>
                                    <input
                                        type='tel'
                                        className='w-full px-4 py-3 rounded-lg border bg-transparent border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        placeholder='(555) 123-4567'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        className='w-full px-4 py-3 rounded-lg border bg-transparent border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        placeholder="Tell us what you're looking for..."
                                    />
                                </div>

                                <Button className='w-full bg-blue-600 hover:bg-blue-700'>
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OrganizationLandingPage;
