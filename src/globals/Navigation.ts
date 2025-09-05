import { allowLoggedIn } from '@/lib/AccessFunctions'
import { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: {
    read: allowLoggedIn,
    update: allowLoggedIn,
  },
  fields: [
    {
      type: 'relationship',
      unique: true,
      name: 'featuredCategories',
      label: 'Featured Categories',
      relationTo: 'categories',
      hasMany: true,
    },
  ],
}
