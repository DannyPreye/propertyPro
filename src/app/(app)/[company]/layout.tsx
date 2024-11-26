import MainCompanyLayout from "@/components/layouts/mainCompanyLayout";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import React from "react";

interface Props {
    children: React.ReactNode;
    params: any;
}
const CompanyMainLayout: React.FC<Props> = async ({ children, params }) => {
    const { company } = await params;
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
            branding: true,
        },
    });

    return (
        <MainCompanyLayout
            organizationBranding={organization?.docs[0]?.branding as any}
        >
            {children}
        </MainCompanyLayout>
    );
};

export default CompanyMainLayout;
