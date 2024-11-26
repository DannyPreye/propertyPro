import { CollectionConfig } from "payload";


const Organization: CollectionConfig = {
    slug: "organizations",
    admin: {
        useAsTitle: "name",
    },
    access: {
        read: () => true

    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: "contact",
            type: "group",
            fields: [
                {
                    name: "email",
                    type: "text",
                    required: true,
                },
                {
                    name: "phone",
                    type: "text",
                    required: true,
                },
                {
                    name: "address",
                    type: "text",
                    required: true,
                }

            ]
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: "companySize",
            type: "select",
            options: [
                { label: "1-10", value: "1-10" },
                { label: "11-50", value: "11-50" },
                { label: "51-100", value: "51-100" },
                { label: "101-500", value: "101-500" },
                { label: "501-1000", value: "501-1000" },
            ]
        },
        {
            name: 'domains',
            type: 'array',
            fields: [
                {
                    name: 'domain',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'branding',
            type: 'group',
            fields: [
                {
                    name: 'logo',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'primaryColor',
                    type: 'text',
                    defaultValue: '#000000',
                },
                {
                    name: 'secondaryColor',
                    type: 'text',
                    defaultValue: '#ffffff',
                },
                {
                    name: 'theme',
                    type: 'select',
                    options: [
                        { label: 'Light', value: 'light' },
                        { label: 'Dark', value: 'dark' },
                        { label: 'System', value: 'system' }
                    ],
                    defaultValue: 'system'
                },
                {
                    name: 'accentColor',
                    type: 'text',
                    defaultValue: '#3b82f6',
                }


            ],
        },
        {
            name: 'settings',
            type: 'group',
            fields: [
                {
                    name: 'allowTenantPortal',
                    type: 'checkbox',
                    defaultValue: true,
                },
                {
                    name: 'enableMaintenanceRequests',
                    type: 'checkbox',
                    defaultValue: true,
                },
                {
                    name: 'paymentMethods',
                    type: 'select',
                    hasMany: true,
                    options: [
                        { label: 'Bank Transfer', value: 'bank' },
                        { label: 'Credit Card', value: 'card' },
                        { label: 'Cash', value: 'cash' },
                    ],
                },
            ],
        },
        {
            name: "socialLinks",
            type: "array",
            fields: [
                {
                    name: "name",
                    type: "text",
                    required: true,
                },
                {
                    name: "url",
                    type: "text",
                    required: true,
                }
            ]
        }
    ],
};


export default Organization;
