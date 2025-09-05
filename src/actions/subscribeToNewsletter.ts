'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import z from 'zod'
import { subscriptionShema } from '@/collections/Subscriptions'

export async function subscribeToNewsletter(data: z.infer<typeof subscriptionShema>) {
  const payload = await getPayload({ config })

  try {
    const exists = await payload.find({
      collection: 'subscriptions',
      where: { email: { equals: data.email } },
    })
    if (exists.totalDocs > 0) {
      return { error: true, message: 'Email already exists' }
    }
    await payload.create({ collection: 'subscriptions', data })
    return { error: false }
  } catch (e) {
    if (typeof e === 'string') return { error: true, message: e }
    if (e instanceof Error) return { error: true, message: e.message }
    return { error: true, message: 'An unknown error occurred' }
  }
}
