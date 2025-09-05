import { allowAll, allowLoggedIn } from '@/lib/AccessFunctions'
import { CollectionConfig, TextFieldSingleValidation } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: allowAll,
    create: allowLoggedIn,
    update: allowLoggedIn,
    delete: allowLoggedIn,
  },
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
      validate: false,
    },
  },
  indexes: [{ fields: ['title', 'slug', 'tags'] }],
  labels: {
    plural: 'Articles',
    singular: 'Article',
  },
  fields: [
    {
      type: 'text',
      required: true,
      name: 'title',
      label: 'Title',
    },
    {
      type: 'checkbox',
      name: 'isFeatured',
      label: 'Featured Post?',
      defaultValue: false,
    },
    {
      type: 'relationship',
      name: 'author',
      label: 'Author',
      relationTo: 'users',
      required: true,
    },
    {
      type: 'text',
      name: 'slug',
      label: 'Slug',
      hooks: {
        beforeChange: [({ value }) => (value as string | undefined)?.trim().toLowerCase() ?? value],
      },
      validate: ((value: string) => /$[\w-]+$/i.test(value)) as TextFieldSingleValidation,
      unique: true,
      required: true,
    },
    {
      type: 'textarea',
      name: 'snippet',
      label: 'Snippet',
      required: true,
    },
    {
      type: 'relationship',
      name: 'thumbnail',
      label: 'Thumbnail',
      required: true,
      relationTo: 'media',
    },
    {
      type: 'relationship',
      name: 'categories',
      relationTo: 'categories',
      label: 'Categories',
      hasMany: true,
    },
    {
      type: 'text',
      name: 'tags',
      label: 'Tags',
      hasMany: true,
    },
    {
      type: 'richText',
      name: 'content',
      label: 'Content',
      required: true,
    },
  ],
}
