import { allowAll, allowLoggedIn } from '@/lib/AccessFunctions'
import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  access: {
    read: allowAll,
    create: allowLoggedIn,
    update: allowLoggedIn,
    delete: allowLoggedIn,
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      unique: true,
      required: true,
    },
  ],
}
