"use server";
import { Property } from "@/payload-types";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import axios from "axios";
import { serverSession } from "@/lib/auth";
import { AnyNaptrRecord } from "dns";


interface Metadata
{
    page: number,
    limit: number,
    filter: string,
    sort: string;
    search: string;
}
export const getProperties = async (organizationId: string, metadata?: Metadata) =>
{
    try {
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
        console.log("Properties", properties);

        return properties;
    } catch (error) {
        console.log(error);

    }

};

export const createProperty = async (data: any) =>
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
        console.log("This is the error", error);
        throw new Error(error?.message);

    }
};

export const uploadPropertyImage = async (data: FormData) =>
{
    const session = await serverSession();


    try {
        const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/media`, data, {
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        console.log(response.data);
        return response.data?.doc;
    } catch (error: any) {
        console.log(error?.response?.data);
        throw new Error(error?.message);
    }
};
