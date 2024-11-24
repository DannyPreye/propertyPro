import { CollectionConfig } from "payload";

const Tenants: CollectionConfig = {
    slug: 'tenants',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'email',
            type: 'email',
            required: true,
            unique: true,
        },
        {
            name: 'phone',
            type: 'text',
        },
        {
            name: 'unit',
            type: 'relationship',
            relationTo: 'units',
        },
        {
            name: 'documents',
            type: 'array',
            fields: [
                {
                    name: 'document',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'type',
                    type: 'select',
                    options: [
                        { label: 'ID', value: 'id' },
                        { label: 'Proof of Income', value: 'income' },
                        { label: 'References', value: 'references' },
                        { label: 'Other', value: 'other' },
                    ],
                },
            ],
        },
    ],
};


export default Tenants;
