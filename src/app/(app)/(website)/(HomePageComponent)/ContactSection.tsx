import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const ContactSection = () => {
    return (
        <section id='contact' className='py-20 bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid md:grid-cols-2 gap-12'>
                    <div>
                        <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                            Get in Touch
                        </h2>
                        <p className='text-xl text-gray-600 mb-8'>
                            Have questions? We&apos;re here to help you get
                            started with PropertyPro.
                        </p>
                        <div className='space-y-4'>
                            <div className='flex items-center'>
                                <Mail className='h-6 w-6 text-primary mr-4' />
                                <span>contact@propertypro.com</span>
                            </div>
                            <div className='flex items-center'>
                                <Phone className='h-6 w-6 text-primary mr-4' />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className='flex items-center'>
                                <MapPin className='h-6 w-6 text-primary mr-4' />
                                <span>123 Property Street, NY 10001</span>
                            </div>
                        </div>
                    </div>
                    <Card>
                        <CardContent className='pt-6'>
                            <form className='space-y-4'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-sm font-medium mb-1'>
                                            First Name
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full p-2 border rounded-md'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium mb-1'>
                                            Last Name
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full p-2 border rounded-md'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className='block text-sm font-medium mb-1'>
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        className='w-full p-2 border rounded-md'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium mb-1'>
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        className='w-full p-2 border rounded-md'
                                    ></textarea>
                                </div>
                                <Button className='w-full'>Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
