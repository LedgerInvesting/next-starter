import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const isProduction = process.env.NODE_ENV === 'production'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const copyTextToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    throw new Error('Not able to copy')
  }
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getSelfURL(path?: string) {
  if (process.env.NEXT_PUBLIC_APP_URL?.startsWith('http')) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path ?? ''}`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}${path ?? ''}`
  }
  throw new Error('NEXT_PUBLIC_APP_URL or VERCEL_URL must be set')
}

export const sampleArray = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const getSearchParams = (request: Request) => {
  const urlObj = new URL(request.url)
  const searchParams = urlObj.searchParams
  const params = {}
  searchParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}

export function humanizeBytes(bytes: number | string, decimalPlaces: number = 2): string {
  bytes = Number(bytes)
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const size = (bytes / Math.pow(1024, i)).toLocaleString(undefined, { maximumFractionDigits: decimalPlaces })
  return `${size} ${sizes[i]}`
}

export function humanizeCount(count: number): string {
  return count.toLocaleString()
}
