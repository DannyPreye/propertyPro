import OrganizationWebsiteLayout from "@/components/layouts/organizationWebsiteLayout";
import { NextPage } from "next";
import React from "react";

interface Props {
    children: React.ReactNode;
}
const layout: NextPage<Props> = ({ children }) => {
    return (
        <OrganizationWebsiteLayout>
            <main className='min-h-screen'>{children}</main>
        </OrganizationWebsiteLayout>
    );
};

export default layout;
