import Link from 'next/link'
import { Leckerli_One } from 'next/font/google'
import DesktopNav from './DesktopNav'
import { getPayload, Where } from 'payload'
import config from '@payload-config'
import MobileNav from './MobileNav'
import { Category } from '@/payload-types'

const leckerliOne = Leckerli_One({ weight: '400', subsets: ['latin'] })

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const payload = await getPayload({ config })

  const { featuredCategories } = await payload.findGlobal({ slug: 'navigation' })
  let where: Where | undefined

  if (featuredCategories && featuredCategories.length > 0) {
    where = {
      name: {
        not_in: featuredCategories
          .map((category) => (category as Category).name)
          .reduce((p, c, n, arr) => p + (n + 1 === arr.length ? c : c + ','), ''),
      },
    }
  }

  const { docs: categories } = await payload.find({
    collection: 'categories',
    where,
  })

  return (
    <>
      <header className="p-2 md:p-4 flex justify-between bg-card border-border border-b items-center">
        <Link
          href="/"
          className={`text-primary hover:text-accent-foreground transition sm:text-lg md:text-xl lg:text-2xl ${leckerliOne.className}`}
        >
          Happy Tortoise Blog
        </Link>
        <DesktopNav categories={categories} featuredCategories={featuredCategories as Category[]} />
        <MobileNav categories={categories} featuredCategories={featuredCategories as Category[]} />
      </header>

      <main className="h-full">{children}</main>

      <footer className="bg-card border-t border-border py-2 px-3 text-sm">
        &#169; Happy Tortoise Blog 2025 - All Rights Reserved
      </footer>
    </>
  )
}

export default MainLayout
