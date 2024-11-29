import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import React from "react";
import PropertyDetails from "./(components)/MainDetails";
import { notFound } from "next/navigation";

interface Props {
    params: any;
}
// @ts-ignore
const PropertyDetailsPage: React.FC<Props> = async ({ params }) => {
    const { id } = await params;
    const payload = await getPayload({
        config: payloadConfig,
    });

    const property = await payload.findByID({
        collection: "properties",
        id,
        depth: 4,
    });

    if (property === null) {
        return notFound();
    }

    return <PropertyDetails property={property} />;
};

export default PropertyDetailsPage;
