'use client'
import { subscribeToNewsletter } from '@/actions/subscribeToNewsletter'
import { subscriptionShema } from '@/collections/Subscriptions'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const NewsletterSubscriptionForm = () => {
  const form = useForm({
    resolver: zodResolver(subscriptionShema),
    defaultValues: {
      email: '',
    },
  })
  const [isSuccess, setSuccess] = useState<boolean>()
  const [message, setMessage] = useState<string>()
  const [isDisabled, setDisabled] = useState(false)

  const onSubmit = async (values: z.infer<typeof subscriptionShema>) => {
    setDisabled(true)
    setSuccess(undefined)
    setMessage(undefined)
    const { error, message } = await subscribeToNewsletter(values)
    if (error) {
      setMessage(message)
      setSuccess(false)
    } else {
      setSuccess(true)
    }
    setDisabled(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex gap-2">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input disabled={isDisabled} placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="disabled:bg-disabled disabled:text-disabled-foreground"
            disabled={isDisabled}
          >
            Subscribe
          </Button>
        </div>
        {isSuccess && !message && (
          <p className="font-bold text-primary">
            Success! Now you&apos;ll receive the latest updates.
          </p>
        )}
        {message && !isSuccess && <p className="font-bold text-destructive">{message}</p>}
      </form>
    </Form>
  )
}

export default NewsletterSubscriptionForm
