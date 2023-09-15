import { siteConfig } from '@/config/site'
import '@/styles/globals.css'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})


export const metadata: Metadata = {
  title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
      'template',
      'keyword',
  ],
  authors: [
      {
          name: siteConfig.name,
          url: siteConfig.url,
      },
  ],
  creator: siteConfig.company,
  themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [siteConfig.ogImage],
  },
  twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitter_handle,
  },
  icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
            lang="en"
            className={clsx(
                'scroll-smooth bg-white antialiased',
                inter.variable,
            )}
        >
            <body>{children}</body>
        </html>
  )
}
