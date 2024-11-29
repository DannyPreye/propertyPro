import { CollectionConfig } from "payload";

const Properties: CollectionConfig = {
    slug: "properties",
    admin: {
        useAsTitle: "name",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "organization",
            type: "relationship",
            relationTo: "organizations",
            required: true,
        },
        {
            name: "address",
            type: "group",
            fields: [
                {
                    name: "street",
                    type: "text",
                    required: true,
                },
                {
                    name: "city",
                    type: "text",
                    required: true,
                },
                {
                    name: "state",
                    type: "text",
                    required: true,
                },
                {
                    name: "zip",
                    type: "text",
                    required: true,
                },
                {
                    name: "geolocation",
                    type: "group",
                    fields: [
                        {
                            name: "latitude",
                            type: "number",
                        },
                        {
                            name: "longitude",
                            type: "number",
                        },
                    ],
                },
            ],
        },
        {
            name: "images",
            type: "array",
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "caption",
                    type: "text",
                },
            ],
        },
        {
            name: "amenities",
            type: "array",
            fields: [
                {
                    name: "name",
                    type: "text",
                    required: true,
                },
                {
                    name: "icon",
                    type: "text",
                },
            ],
        },
        {
            name: "description",
            type: "richText",
        },
        {
            name: "status",
            type: "select",
            options: [
                { label: "Active", value: "active" },
                { label: "Under Maintenance", value: "maintenance" },
                { label: "Inactive", value: "inactive" },
                { label: "Occupied", value: "occupied" },
                { label: "Vacant", value: "vacant" },
            ],
            defaultValue: "active",
        },
        {
            name: "propertyType",
            type: "select",
            options: [
                { label: "Apartment", value: "apartment" },
                { label: "House", value: "house" },
                { label: "Condo", value: "condo" },
                { label: "Townhouse", value: "townhouse" },
                { label: "Commercial", value: "commercial" },
            ],
            required: true,
        },
        {
            name: "rentalDetails",
            type: "group",
            fields: [
                {
                    name: "rentAmount",
                    type: "number",
                    required: true,
                },
                {
                    name: "securityDeposit",
                    type: "number",
                },
                {
                    name: "availableFrom",
                    type: "date",
                },
                {
                    name: "leaseTerms",
                    type: "select",
                    options: [
                        { label: "6 Months", value: "6_months" },
                        { label: "12 Months", value: "12_months" },
                        { label: "Month-to-Month", value: "month_to_month" },
                    ],
                },
            ],
        },
        {
            name: "utilities",
            type: "group",
            fields: [
                {
                    name: "includedUtilities",
                    type: "array",
                    fields: [
                        {
                            name: "utility",
                            type: "select",
                            options: [
                                { label: "Water", value: "water" },
                                { label: "Electricity", value: "electricity" },
                                { label: "Gas", value: "gas" },
                                { label: "Internet", value: "internet" },
                                { label: "Trash", value: "trash" },
                            ],
                        },
                    ],
                },
                {
                    name: "utilityEstimates",
                    type: "array",
                    fields: [
                        {
                            name: "utility",
                            type: "select",
                            options: [
                                { label: "Water", value: "water" },
                                { label: "Electricity", value: "electricity" },
                                { label: "Gas", value: "gas" },
                                { label: "Internet", value: "internet" },
                                { label: "Trash", value: "trash" },
                            ],
                        },
                        {
                            name: "estimatedMonthlyCost",
                            type: "number",
                        },
                    ],
                },
            ],
        },
        {
            name: "currentTenant",
            type: "relationship",
            relationTo: "users",
            admin: {
                description: "Current tenant occupying the property",
            },
        },
        {
            name: "maintenanceHistory",
            type: "array",
            fields: [
                {
                    name: "date",
                    type: "date",
                    required: true,
                },
                {
                    name: "description",
                    type: "text",
                    required: true,
                },
                {
                    name: "performedBy",
                    type: "text",
                },
                {
                    name: "cost",
                    type: "number",
                },
            ],
        },
    ],
};

export default Properties;
