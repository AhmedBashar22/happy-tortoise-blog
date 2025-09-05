'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getSearchParamsObject } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import z from 'zod'

const schema = z.object({
  q: z.string(),
})

const Searchbar = ({ searchParams = {} }: { searchParams?: Record<string, string | string[]> }) => {
  const form = useForm({
    defaultValues: {
      q: (searchParams.search as string) ?? '',
    },
    resolver: zodResolver(schema),
  })
  const router = useRouter()

  const onSubmit = ({ q }: z.infer<typeof schema>) => {
    router.push('?' + getSearchParamsObject({ ...searchParams, search: q }))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-1 w-full">
        <FormField
          name="q"
          render={({ field }) => (
            <FormControl>
              <Input className="w-full" {...field} placeholder="Search" />
            </FormControl>
          )}
        />
        <Button>
          <Search />
          Search
        </Button>
      </form>
    </Form>
  )
}

export default Searchbar
