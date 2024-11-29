"use server";
import { Property } from "@/payload-types";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";



export const getProperties = async (organizationId: string) =>
{
    const payload = await getPayload({
        config: payloadConfig
    });

    const properties = await payload.find({
        collection: "properties",
        where: {
            organization: {
                equals: organizationId
            }
        }
    });

};

export const createProperty = async (data: Property) =>
{
    try {
        const payload = await getPayload({
            config: payloadConfig
        });


        const newProperty = await payload.create({
            collection: "properties",
            data
        });

        return newProperty;
    } catch (error: any) {
        throw new Error(error?.message);

    }
};
