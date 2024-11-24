"use client";
import React from "react";
import { Next13ProgressBar } from "next13-progressbar";
import { Toaster } from "../ui/toaster";
import { SessionProvider } from "next-auth/react";

interface Props {
    children: React.ReactNode;
}
const MainProvider: React.FC<Props> = ({ children }) => {
    return (
        <SessionProvider>
            {children}
            <Next13ProgressBar
                height='4px'
                color='#e11d48'
                options={{ showSpinner: true }}
                showOnShallow
            />
            <Toaster />
        </SessionProvider>
    );
};

export default MainProvider;
