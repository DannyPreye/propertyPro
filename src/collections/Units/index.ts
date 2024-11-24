import { CollectionConfig } from "payload";

const Units: CollectionConfig = {
    slug: 'units',
    admin: {
        useAsTitle: 'unitNumber',
    },
    fields: [
        {
            name: 'unitNumber',
            type: 'text',
            required: true,
        },
        {
            name: 'property',
            type: 'relationship',
            relationTo: 'properties',
            required: true,
        },
        {
            name: 'type',
            type: 'select',
            options: [
                { label: 'Studio', value: 'studio' },
                { label: '1 Bedroom', value: '1bed' },
                { label: '2 Bedrooms', value: '2bed' },
                { label: '3 Bedrooms', value: '3bed' },
                { label: '4+ Bedrooms', value: '4plus' },
            ],
        },
        {
            name: 'status',
            type: 'select',
            options: [
                { label: 'Available', value: 'available' },
                { label: 'Occupied', value: 'occupied' },
                { label: 'Under Maintenance', value: 'maintenance' },
                { label: 'Reserved', value: 'reserved' },
            ],
            defaultValue: 'available',
        },
        {
            name: 'features',
            type: 'array',
            fields: [
                {
                    name: 'feature',
                    type: 'text',
                },
            ],
        },
        {
            name: 'rent',
            type: 'group',
            fields: [
                {
                    name: 'amount',
                    type: 'number',
                    required: true,
                },
                {
                    name: 'utilities',
                    type: 'select',
                    hasMany: true,
                    options: [
                        { label: 'Water', value: 'water' },
                        { label: 'Electricity', value: 'electricity' },
                        { label: 'Gas', value: 'gas' },
                        { label: 'Internet', value: 'internet' },
                    ],
                },
            ],
        },
    ],
};


export default Units;
