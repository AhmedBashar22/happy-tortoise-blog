'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const Disclaimer = () => {
  const [isHidden, setHidden] = useState(true)

  useEffect(() => {
    const cookies = document.cookie.split(';').map((s) => s.trim())
    const disclaimerCookie = cookies.find((c) => c.includes('disclaimerAccepted'))

    if (!disclaimerCookie) setHidden(false)
  }, [])

  return (
    <div
      style={{
        display: isHidden ? 'none' : 'block',
      }}
      className="w-full h-full fixed top-0 left-0 z-50 bg-background flex flex-col"
    >
      <div></div>
      <div className="w-full h-full items-center justify-center flex flex-col gap-12 px-16 lg:px-96">
        <p className="text-4xl lg:text-6xl font-bold">Disclaimer</p>

        <div className="text-center items-center gap-4 text-xl lg:text-2xl flex flex-col">
          <p>You are about to enter a demo project for display purposes only.</p>

          <p>
            This means that the website you&apos;re visiting is not a real blog site. The
            information presented here may be inaccurate, and should not be acted upon.
          </p>

          <p className="text-destructive text-2xl font-bold">Use at your own risk.</p>
        </div>

        <Button
          onClick={() => {
            const date = new Date()
            date.setDate(date.getDate() + 7)
            document.cookie = `disclaimerAccepted=true; expires=${date.toUTCString()}; path=/`
            setHidden(true)
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default Disclaimer
