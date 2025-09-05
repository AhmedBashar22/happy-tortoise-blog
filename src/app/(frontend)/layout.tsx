import React from 'react'
import './styles.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Josefin_Sans } from 'next/font/google'

const josefinSans = Josefin_Sans({ subsets: ['vietnamese'] })

export const metadata = {
  title: 'Happy Tortoise Blog',
  description:
    'Discover expert tips, care guides, and fascinating facts about tortoises on Happy Tortoise — your go-to blog for raising healthy, happy tortoises.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning className={`min-h-full flex ${josefinSans.className}`}>
      <body className="flex-1 flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
