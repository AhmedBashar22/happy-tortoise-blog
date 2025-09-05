import { allowAll, allowLoggedIn } from '@/lib/AccessFunctions'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    plural: 'Media',
    singular: 'Media',
  },
  access: {
    read: allowAll,
    create: allowLoggedIn,
    update: allowLoggedIn,
    delete: allowLoggedIn,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      required: true,
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        // height: 432,
        width: 768,
        fit: 'contain',
      },
    ],
  },
}
