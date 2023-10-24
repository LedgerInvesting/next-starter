'use client'

import { AuthProvider } from '@/components/providers/auth'
import { ThemeProvider } from '@/components/providers/theme'

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}
