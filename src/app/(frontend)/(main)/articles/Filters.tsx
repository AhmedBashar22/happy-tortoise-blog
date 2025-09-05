'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { getSearchParamsObject } from '@/lib/utils'
import { Category } from '@/payload-types'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Filters = ({
  categories,
  searchParams,
}: {
  categories: Category[]
  searchParams: Record<string, string | string[]>
}) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <div className="hidden lg:block">Filters</div> <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Category</DropdownMenuLabel>
        {categories.map((category) => {
          const categoryArray: string[] = []
          if (typeof searchParams.category === 'string') {
            categoryArray.push(searchParams.category)
          } else if (searchParams.category) {
            categoryArray.push(...searchParams.category)
          }
          const selected = categoryArray.includes(category.name)
          return (
            <DropdownMenuItem key={category.id}>
              <div
                onClick={() => {
                  if (selected) {
                    const newCategories = categoryArray.filter((v) => v !== category.name)
                    router.push(
                      '?' + getSearchParamsObject({ ...searchParams, category: newCategories }),
                    )
                  } else {
                    const newCategories = [...categoryArray, category.name]
                    router.push(
                      '?' +
                        getSearchParamsObject({
                          ...searchParams,
                          category: newCategories,
                        }),
                    )
                  }
                }}
                className="flex items-baseline gap-1"
              >
                <Checkbox checked={selected} />
                <Label>{category.name}</Label>
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Filters
