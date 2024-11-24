"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Github, Mail, Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    console.log("This is the session", session);

    const { toast } = useToast();

    useEffect(() => {
        if (status == "authenticated") {
            router.push(`/${session?.user.organization?.slug}`);
        }
    }, [status]);

    const handleSubmit = async (values: {
        email: string;
        password: string;
    }) => {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        }).then((res) => {
            if (res?.error) {
                toast({
                    variant: "destructive",
                    description: res.error,
                });
            }
        });
    };

    return (
        <div className='space-y-6'>
            <div className='space-y-2 text-center'>
                <h1 className='text-3xl font-bold tracking-tight'>
                    Welcome back
                </h1>
                <p className='text-gray-500'>
                    Enter your credentials to access your account
                </p>
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <Button variant='outline' className='w-full'>
                    <Github className='mr-2 h-4 w-4' />
                    GitHub
                </Button>
                <Button variant='outline' className='w-full'>
                    <Mail className='mr-2 h-4 w-4' />
                    Google
                </Button>
            </div>

            <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <Separator />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-gray-50 px-2 text-gray-500'>
                        or continue with email
                    </span>
                </div>
            </div>

            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting, getFieldProps }) => (
                    <Form className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                id='email'
                                type='email'
                                placeholder='name@example.com'
                                {...getFieldProps("email")}
                                className={`${
                                    errors.email && touched.email
                                        ? "border-red-500 focus:ring-red-500"
                                        : ""
                                } transition-all duration-200`}
                            />
                            {errors.email && touched.email && (
                                <p className='text-sm text-red-500 animate-in slide-in-from-left-1'>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <Label htmlFor='password'>Password</Label>
                                <Link
                                    href='/forgot-password'
                                    className='text-sm text-primary hover:underline'
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id='password'
                                type='password'
                                {...getFieldProps("password")}
                                className={`${
                                    errors.password && touched.password
                                        ? "border-red-500 focus:ring-red-500"
                                        : ""
                                } transition-all duration-200`}
                            />
                            {errors.password && touched.password && (
                                <p className='text-sm text-red-500 animate-in slide-in-from-left-1'>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <Button
                            type='submit'
                            className='w-full'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </Form>
                )}
            </Formik>

            <p className='text-center text-sm text-gray-600'>
                Don't have an account?{" "}
                <Link
                    href='/register'
                    className='text-primary hover:underline font-medium'
                >
                    Create an account
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
