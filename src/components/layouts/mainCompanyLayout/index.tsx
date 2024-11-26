"use client";
import hexToHSL from "@/lib/functions/hexToHsl";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";

interface Props {
    organizationBranding: {
        primaryColor: string;
        secondaryColor: string;
        logo: string;
        accentColor: string;
        theme: "light" | "dark" | "system";
    };
    children: React.ReactNode;
}

const MainCompanyLayout: React.FC<Props> = ({
    organizationBranding,
    children,
}) => {
    const { setTheme } = useTheme();

    useEffect(() => {
        if (organizationBranding) {
            setTheme(organizationBranding?.theme || "light");

            document.documentElement.style.setProperty(
                "--primary",
                hexToHSL(organizationBranding.primaryColor)
            );
            document.documentElement.style.setProperty(
                "--secondary",
                hexToHSL(organizationBranding.secondaryColor)
            );
            document.documentElement.style.setProperty(
                "--accent",
                hexToHSL(organizationBranding.accentColor)
            );
        }
    }, [organizationBranding]);

    return <div>{children}</div>;
};

export default MainCompanyLayout;
