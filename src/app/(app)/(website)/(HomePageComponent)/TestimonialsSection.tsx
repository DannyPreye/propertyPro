import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const TestimonialsSection = () => {
    return (
        <section id='testimonials' className='py-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
                        Trusted by Property Managers
                    </h2>
                    <p className='text-xl text-muted-foreground'>
                        See what our customers have to say about PropertyPro
                    </p>
                </div>

                <div className='grid md:grid-cols-3 gap-8'>
                    {[
                        {
                            quote: "PropertyPro has transformed how we manage our properties. The automation features have saved us countless hours.",
                            author: "Sarah Johnson",
                            role: "Property Manager",
                            company: "Urban Living Properties",
                        },
                        {
                            quote: "The tenant portal is a game-changer. Our tenants love the easy rent payments and maintenance requests.",
                            author: "Michael Chen",
                            role: "Landlord",
                            company: "MCG Properties",
                        },
                        {
                            quote: "Best investment we've made for our property management business. The ROI has been incredible.",
                            author: "Lisa Rodriguez",
                            role: "CEO",
                            company: "Rodriguez Real Estate",
                        },
                    ].map((testimonial, index) => (
                        <Card key={index}>
                            <CardContent className='pt-6'>
                                <p className='text-foreground mb-6'>
                                    {`"${testimonial.quote}"`}
                                </p>
                                <div className='flex items-center'>
                                    <div className='w-12 h-12 rounded-full bg-gray-200' />
                                    <div className='ml-4'>
                                        <p className='font-semibold'>
                                            {testimonial.author}
                                        </p>
                                        <p className='text-sm text-muted-foreground'>
                                            {testimonial.role}
                                        </p>
                                        <p className='text-sm text-muted-foreground'>
                                            {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
