import OrganizationAdminDashboardLayout from "@/components/layouts/organizationAdminLayout";
import { serverSession } from "@/lib/auth";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";

interface Props {
    children: React.ReactNode;
}

const AdminDashboardLayout: React.FC<Props> = async ({ children }) => {
    const session = await serverSession();

    const payload = await getPayload({
        config: payloadConfig,
    });

    const organization = await payload.find({
        collection: "organizations",
        where: {
            slug: {
                equals: session?.user.organization.slug,
            },
        },
    });

    return (
        <OrganizationAdminDashboardLayout
            organizationDetails={organization.docs[0]}
        >
            {children}
        </OrganizationAdminDashboardLayout>
    );
};

export default AdminDashboardLayout;
