import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-black font-sans text-white">
                <div className={clsx(inter.variable, 'font-sans')}>
                    {children}
                </div>
            </body>
        </html>
    )
}
