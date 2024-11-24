"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Building2, ChevronLeft, ChevronRight, User } from "lucide-react";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { register } from "../actions/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const { toast } = useToast();
    const router = useRouter();
    const totalSteps = 3;

    const validationSchemas: any = {
        1: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            password: Yup.string()
                .min(8, "Must be at least 8 characters")
                .matches(/[A-Z]/, "Must contain at least one uppercase letter")
                .matches(/[a-z]/, "Must contain at least one lowercase letter")
                .matches(/[0-9]/, "Must contain at least one number")
                .matches(
                    /[^A-Za-z0-9]/,
                    "Must contain at least one special character"
                )
                .required("Required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Required"),
        }),
        2: Yup.object({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            phone: Yup.string()
                .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
                .required("Required"),
        }),
        3: Yup.object({
            companyName: Yup.string().required("Required"),
            companySize: Yup.string().required("Required"),
            propertyCount: Yup.number()
                .min(1, "Must have at least 1 property")
                .required("Required"),
        }),
    };

    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: "",
        companyName: "",
        companySize: "",
        propertyCount: "",
    };

    const handleSubmit = async (values: any, actions: any) => {
        if (step < totalSteps) {
            setStep(step + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        } else {
            try {
                const user = await register(values);
                if (user) {
                    toast({
                        description: "Registration successful",
                    });

                    router.push(`/auth/sign-in`);
                }
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    description: error.message || "Something went wrong",
                });
            }
        }
    };

    const renderStep = (errors: any, touched: any) => {
        switch (step) {
            case 1:
                return (
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Field
                                as={Input}
                                id='email'
                                name='email'
                                type='email'
                                placeholder='yourname@company.com'
                                className={
                                    touched.email && errors.email
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {touched.email && errors.email && (
                                <p className='text-sm text-red-500'>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='password'>Password</Label>
                            <Field
                                as={Input}
                                id='password'
                                name='password'
                                type='password'
                                className={
                                    touched.password && errors.password
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {touched.password && errors.password && (
                                <p className='text-sm text-red-500'>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='confirmPassword'>
                                Confirm Password
                            </Label>
                            <Field
                                as={Input}
                                id='confirmPassword'
                                name='confirmPassword'
                                type='password'
                                className={
                                    touched.confirmPassword &&
                                    errors.confirmPassword
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {touched.confirmPassword &&
                                errors.confirmPassword && (
                                    <p className='text-sm text-red-500'>
                                        {errors.confirmPassword}
                                    </p>
                                )}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='firstName'>First Name</Label>
                            <Field
                                as={Input}
                                id='firstName'
                                name='firstName'
                                className={
                                    touched.firstName && errors.firstName
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {touched.firstName && errors.firstName && (
                                <p className='text-sm text-red-500'>
                                    {errors.firstName}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='lastName'>Last Name</Label>
                            <Field
                                as={Input}
                                id='lastName'
                                name='lastName'
                                className={
                                    touched.lastName && errors.lastName
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {touched.lastName && errors.lastName && (
                                <p className='text-sm text-red-500'>
                                    {errors.lastName}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='phone'>Phone Number</Label>
                            <Field
                                as={Input}
                                id='phone'
                                name='phone'
                                type='tel'
                                placeholder='+1234567890'
                                className={
                                    touched.phone && errors.phone
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {touched.phone && errors.phone && (
                                <p className='text-sm text-red-500'>
                                    {errors.phone}
                                </p>
                            )}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='companyName'>Company Name</Label>
                            <Field
                                as={Input}
                                id='companyName'
                                name='companyName'
                                className={
                                    touched.companyName && errors.companyName
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {touched.companyName && errors.companyName && (
                                <p className='text-sm text-red-500'>
                                    {errors.companyName}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='companySize'>Company Size</Label>
                            <Field
                                as='select'
                                id='companySize'
                                name='companySize'
                                className={`w-full p-2 border rounded-md ${
                                    touched.companySize && errors.companySize
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            >
                                <option value=''>Select company size</option>
                                <option value='1-10'>1-10 employees</option>
                                <option value='11-50'>11-50 employees</option>
                                <option value='51-200'>51-200 employees</option>
                                <option value='201+'>201+ employees</option>
                            </Field>
                            {touched.companySize && errors.companySize && (
                                <p className='text-sm text-red-500'>
                                    {errors.companySize}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='propertyCount'>
                                Number of Properties
                            </Label>
                            <Field
                                as={Input}
                                id='propertyCount'
                                name='propertyCount'
                                type='number'
                                min='1'
                                className={
                                    touched.propertyCount &&
                                    errors.propertyCount
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {touched.propertyCount && errors.propertyCount && (
                                <p className='text-sm text-red-500'>
                                    {errors.propertyCount}
                                </p>
                            )}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const stepTitles: any = {
        1: {
            title: "Account Setup",
            description: "Create your account credentials",
            icon: <User className='w-6 h-6' />,
        },
        2: {
            title: "Personal Information",
            description: "Tell us about yourself",
            icon: <User className='w-6 h-6' />,
        },
        3: {
            title: "Company Details",
            description: "Tell us about your business",
            icon: <Building2 className='w-6 h-6' />,
        },
    };

    return (
        <div className=''>
            <div className='w-full '>
                <CardHeader>
                    <div className='flex items-center space-x-4'>
                        {stepTitles[step].icon}
                        <div>
                            <CardTitle>{stepTitles[step].title}</CardTitle>
                            <CardDescription>
                                {stepTitles[step].description}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='mb-6'>
                        <Progress
                            value={(step / totalSteps) * 100}
                            className='h-2'
                        />
                        <div className='mt-2 text-sm text-gray-500 text-center'>
                            Step {step} of {totalSteps}
                        </div>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchemas[step]}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                {renderStep(errors, touched)}
                                <CardFooter className='flex justify-between mt-6 px-0'>
                                    <Button
                                        type='button'
                                        variant='outline'
                                        onClick={() => setStep(step - 1)}
                                        disabled={step === 1}
                                    >
                                        <ChevronLeft className='w-4 h-4 mr-2' />
                                        Back
                                    </Button>
                                    <Button type='submit'>
                                        {step === totalSteps ? (
                                            <>
                                                {isSubmitting ? (
                                                    <>Submitting...</>
                                                ) : (
                                                    "  Complete Registration"
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                Next
                                                <ChevronRight className='w-4 h-4 ml-2' />
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </div>
        </div>
    );
};

export default RegistrationForm;
