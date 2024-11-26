"use client";
import React from "react";
import { Next13ProgressBar } from "next13-progressbar";
import { Toaster } from "../ui/toaster";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "./ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

interface Props {
    children: React.ReactNode;
}
const MainProvider: React.FC<Props> = ({ children }) => {
    return (
        <SessionProvider>
            <QueryClientProvider client={client}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='light'
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Next13ProgressBar
                        height='4px'
                        color='var(--primary)'
                        options={{ showSpinner: true }}
                        showOnShallow
                    />
                    <Toaster />
                </ThemeProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default MainProvider;
