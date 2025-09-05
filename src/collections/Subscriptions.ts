import { allowAll, allowLoggedIn } from '@/lib/AccessFunctions'
import { CollectionConfig, TextFieldSingleValidation } from 'payload'
import z from 'zod'

export const subscriptionShema = z.object({
  email: z.email('Please enter a valid email address'),
})

export const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  admin: {
    useAsTitle: 'email',
  },
  labels: {
    plural: 'Subscriptions',
    singular: 'Subscription',
  },
  access: {
    create: allowAll,
    update: allowLoggedIn,
    read: allowLoggedIn,
    delete: allowLoggedIn,
  },
  fields: [
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      validate: ((email: string) => {
        try {
          z.parse(subscriptionShema, { email })
          return true
        } catch {
          return 'Invalid email'
        }
      }) as TextFieldSingleValidation,
      required: true,
      unique: true,
    },
  ],
}
