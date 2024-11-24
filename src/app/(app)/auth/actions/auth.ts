"use server";

import payloadConfig from "@/payload.config";
import { BasePayload, getPayload } from "payload";

interface RegistrationProps
{

    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    companyName: string,
    companySize: "1-10" | "11-50" | "51-100" | "101-500" | "501-1000" | null | undefined,
    propertyCount: string,


}


const validateBeforeRegister = async (values: RegistrationProps, payload: BasePayload) =>
{
    console.log("This is the values", values);
    // check if the user is already registered
    const user = await payload.find({
        collection: "users",
        where: {
            email: {
                equals: values.email.trim(),
            }
        }
    });

    console.log("Finding the uer", user);
    if (user.docs.length > 0) {
        throw new Error("User already exists");
    }

    // Check organization
    const organization = await payload.find({
        collection: "organizations",
        where: {
            name: {
                equals: values.companyName.trim(),
            }
        }
    });
    if (organization.docs.length > 0) {
        throw new Error("Organization already exists");
    }
};

export const register = async (values: RegistrationProps) =>
{
    const payload = await getPayload({
        config: payloadConfig
    });
    try {

        // Check if the user has registered before or there's another name
        // with that organization
        await validateBeforeRegister(values, payload);

        const organization = await payload.create({
            collection: "organizations",
            // @ts-ignore
            data: {
                name: values.companyName.trim(),
                companySize: values.companySize,
                slug: values.companyName.replace(/\s+/g, '-').toLowerCase(),
            }
        });
        const user = await payload.create({
            collection: "users",
            data: {
                firstName: values.firstName.trim(),
                lastName: values.lastName.trim(),
                email: values.email.trim(),
                password: values.password.trim(),
                phone: values.phone.trim(),
                organization: organization.id,
                role: "admin",

            }
        });


        return user;

    } catch (error: any) {
        console.log(error);
        throw new Error(error?.message);

    }

};
