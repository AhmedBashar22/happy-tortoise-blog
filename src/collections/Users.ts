import { allowLoggedIn } from '@/lib/AccessFunctions'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: allowLoggedIn,
    create: allowLoggedIn,
    delete: allowLoggedIn,
    update: allowLoggedIn,
    unlock: allowLoggedIn,
    admin: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'username',
  },
  labels: {
    plural: 'Users',
    singular: 'User',
  },
  auth: {
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: false,
      requireUsername: true,
    },
  },
  fields: [
    {
      type: 'text',
      name: 'penName',
      label: 'Pen Name',
    },
  ],
}
