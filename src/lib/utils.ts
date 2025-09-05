import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSearchParamsObject(searchParams: Record<string, string | string[]>) {
  const sp = new URLSearchParams()

  for (const key in searchParams) {
    const value = searchParams[key]

    if (typeof value === 'string') {
      sp.set(key, value)
    } else {
      for (const v of value) {
        sp.append(key, v)
      }
    }
  }

  return sp
}
