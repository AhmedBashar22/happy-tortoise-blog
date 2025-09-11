import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Category } from '@/payload-types'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

const DesktopNav = ({
  categories = [],
  featuredCategories = [],
}: {
  categories?: Category[]
  featuredCategories?: Category[]
}) => {
  return (
    <>
      <nav className="hidden lg:block">
        <ul className="flex gap-2">
          <li>
            <Button className="nav-link" variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
          </li>

          <li>
            <Button className="nav-link" variant="ghost" asChild>
              <Link href="/articles">Articles</Link>
            </Button>
          </li>

          {featuredCategories.map((category) => (
            <li key={category.id}>
              <Button className="nav-link" variant="ghost" asChild>
                <Link href={`/articles?category=${category.name.replaceAll('&', '%26')}`}>
                  {category.name}
                </Link>
              </Button>
            </li>
          ))}

          {categories.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="nav-link" variant="ghost">
                  More
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem asChild key={category.id}>
                    <Link href={`/articles?category=${category.name.replaceAll('&', '%26')}`}>
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* <li>
            <Button className="nav-link" variant="ghost" asChild>
              <Link href="/about">About us</Link>
            </Button>
          </li> */}
        </ul>
      </nav>
      {/* <div className="gap-2 hidden lg:flex">
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/register">Sign up</Link>
        </Button>
      </div> */}
    </>
  )
}

export default DesktopNav
