"use server";
import { Property } from "@/payload-types";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import axios from "axios";
import { serverSession } from "@/lib/auth";
import { AnyNaptrRecord } from "dns";


interface Metadata
{
    page?: number,
    limit?: number,
    filter?: string,
    sort?: string;
    search?: string;
}
export const getProperties = async (metadata: Metadata = {}) =>
{
    try {
        const session = await serverSession();
        const payload = await getPayload({
            config: payloadConfig
        });

        // Default metadata values
        const {
            page = 1,
            limit = 10,
            filter = '',
            sort = 'createdAt',
            search = ''
        } = metadata;

        // Construct where clause
        const where: Record<string, any> = {
            organization: {
                equals: session?.user?.organization?.id
            }
        };

        // Add status filter if provided
        if (filter && filter !== 'all') {
            where.status = {
                equals: filter
            };
        }

        // Add search functionality
        if (search) {
            where.or = [
                { name: { contains: search } },
                { description: { contains: search } }
            ];
        }

        // Construct sort options
        // const sortOptions: Record<string, 'asc' | 'desc'> = {};
        // if (sort) {
        //     // Handle nested sorting (e.g., 'rentalDetails.rentAmount')
        //     const sortParts = sort.split('.');
        //     if (sortParts.length > 1) {
        //         sortOptions[ sortParts[ 0 ] ] = {
        //             [ sortParts[ 1 ] ]: 'asc'
        //         };
        //     } else {
        //         sortOptions[ sort ] = 'asc';
        //     }
        // }

        console.log("This is the where clause", where);
        // Perform query
        const properties = await payload.find({
            collection: "properties",
            where,
            // sort: ,
            page,
            limit
        });

        console.log("This is the properties", properties);

        return properties;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const deleteProperty = async (id: string) =>
{
    try {
        const payload = await getPayload({
            config: payloadConfig
        });

        await payload.delete({
            collection: "properties",
            id
        });

    } catch (error) {
        throw new Error("Error deleting property");
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
