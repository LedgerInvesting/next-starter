import { getCurrentUser } from '@/lib/session'
import { createContext, useContext } from 'react'
import { type User } from 'next-auth'

const AuthContext = createContext<{ user: User | undefined }>({ user: undefined })

export async function AuthProvider({ children, ...props }) {
  const user = await getCurrentUser()
  return (
    <AuthContext.Provider value={{ user }} {...props}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
