import OrganizationWebsiteLayout from "@/components/layouts/organizationWebsiteLayout";
import { serverSession } from "@/lib/auth";
import { Organization } from "@/payload-types";
import payloadConfig from "@/payload.config";
import { NextPage } from "next";
import { getPayload } from "payload";
import React from "react";
import { notFound } from "next/navigation";

interface Props {
    children: React.ReactNode;
    params: any;
}
const layout: NextPage<Props> = async ({ children, params }) => {
    const { company } = await params;
    console.log("This is the params:", company);
    const session = await serverSession();
    const payload = await getPayload({
        config: payloadConfig,
    });

    const organization = await payload.find({
        collection: "organizations",
        where: {
            slug: {
                equals: company,
            },
        },
        select: {
            name: true,
            branding: true,
            description: true,
            contact: true,
            socialLinks: true,
        },
    });

    if (organization.docs.length === 0) notFound();

    return (
        <OrganizationWebsiteLayout
            organizationDetails={organization.docs[0] as Organization}
        >
            <main className='min-h-screen'>{children}</main>
        </OrganizationWebsiteLayout>
    );
};

export default layout;
