import { authenticated } from '@/lib/access/authenticated';
import type { CollectionConfig } from 'payload';


export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: [ 'firstName', "lastName", 'email' ],
    useAsTitle: 'firstName',
  },
  auth: true,
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: "organization",
      type: "relationship",
      relationTo: "organizations",
      required: false,
      admin: {
        condition: (data, siblingData, { user }) =>
        {
          console.log("This is the user", user);
          if (user == null) {
            return false;
          } else {
            return true;
          }
        }
      }
    },
    {
      name: "phone",
      type: "text",
      required: false,
    },
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Manager", value: "manager" },
        { label: "User", value: "user" },
      ],
      defaultValue: "user",
      required: true
    }
  ],
  timestamps: true,
};
