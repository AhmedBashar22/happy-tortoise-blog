import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Category } from '@/payload-types'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion,
} from '@/components/ui/accordion'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Dialog, VisuallyHidden } from 'radix-ui'

const MobileNav = ({
  categories = [],
  featuredCategories = [],
}: {
  categories?: Category[]
  featuredCategories?: Category[]
}) => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button size="icon" variant="secondary" className="flex lg:hidden">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col gap-4 p-3">
        <VisuallyHidden.Root>
          <Dialog.Title>Navigation drawer</Dialog.Title>
        </VisuallyHidden.Root>
        <nav>
          <ul className="flex flex-col gap-2">
            <li>
              <Button className="w-full justify-start" variant="ghost" asChild>
                <Link href="/">Home</Link>
              </Button>
            </li>

            <li>
              <Button className="w-full justify-start" variant="ghost" asChild>
                <Link href="/articles">Articles</Link>
              </Button>
            </li>

            {featuredCategories.map((category) => (
              <li key={category.id}>
                <Button className="w-full justify-start" variant="ghost" asChild>
                  <Link href={`/articles?category=${category.name}`}>{category.name}</Link>
                </Button>
              </li>
            ))}

            {categories.length > 0 && (
              <Accordion type="single" collapsible>
                <AccordionItem value="1">
                  <AccordionTrigger className="px-4 py-2">More</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2 items-start ml-4">
                    {categories.map((category) => (
                      <Button key={category.id} asChild variant="ghost">
                        <Link href={`/articles?category=${category.name}`}>{category.name}</Link>
                      </Button>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* <li>
              <Button className="w-full justify-start" variant="ghost" asChild>
                <Link href="/about">About us</Link>
              </Button>
            </li> */}
          </ul>
        </nav>
        {/* <div className="flex flex-col gap-2">
          <Button asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/register">Sign up</Link>
          </Button>
        </div> */}
      </DrawerContent>
    </Drawer>
  )
}

export default MobileNav
