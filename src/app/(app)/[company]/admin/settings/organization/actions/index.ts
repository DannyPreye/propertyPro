"use server";

import { Organization } from "@/payload-types";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";

export const updateOrganization = async (org: Organization,) =>
{
    const payload = await getPayload({
        config: payloadConfig
    });

    const { id, ...rest } = org;

    const updateOrganization = await payload.update({
        collection: "organizations",
        id,
        data: rest
    });

    return updateOrganization;
};

export const getOrganization = async (organizationSlug: string) =>
{
    const payload = await getPayload({
        config: payloadConfig
    });

    const organization = await payload.find({
        collection: "organizations",
        where: {
            slug: {
                equals: organizationSlug
            }
        }
    });

    return organization.docs[ 0 ];
}





