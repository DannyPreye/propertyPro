import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const ContactSection = () => {
    return (
        <section id='contact' className='py-20 bg-background'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid md:grid-cols-2 gap-12'>
                    <div>
                        <h2 className='text-3xl font-bold text-foreground mb-4'>
                            Get in Touch
                        </h2>
                        <p className='text-xl text-muted-foreground mb-8'>
                            Have questions? We&apos;re here to help you get
                            started with PropertyPro.
                        </p>
                        <div className='space-y-4'>
                            {[
                                {
                                    icon: Mail,
                                    text: "contact@propertypro.com",
                                    type: "email",
                                },
                                {
                                    icon: Phone,
                                    text: "+1 (555) 123-4567",
                                    type: "phone",
                                },
                                {
                                    icon: MapPin,
                                    text: "123 Property Street, NY 10001",
                                    type: "address",
                                },
                            ].map((contact, index) => (
                                <div
                                    key={index}
                                    className='flex items-center hover:bg-accent/10 p-2 -ml-2 rounded-md transition-colors'
                                >
                                    <contact.icon className='h-6 w-6 text-primary mr-4' />
                                    <span className='text-foreground'>
                                        {contact.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Card className='border border-border'>
                        <CardContent className='pt-6'>
                            <form className='space-y-4'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-foreground mb-1'>
                                            First Name
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full p-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-foreground mb-1'>
                                            Last Name
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full p-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-foreground mb-1'>
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        className='w-full p-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-foreground mb-1'>
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        className='w-full p-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring'
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
