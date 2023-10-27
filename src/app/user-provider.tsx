'use client'

import { type User } from 'next-auth'
import { createContext, useContext, useEffect, useState } from 'react'

export const UserContext = createContext<{
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}>({
  user: undefined,
  setUser: () => {},
})

export function UserProvider({ children, ...props }) {
  const [user, setUser] = useState<User>(props.user)

  useEffect(() => {}, [])

  return (
    <UserContext.Provider value={{ user, setUser }} {...props}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within an UserProvider')
  }
  return context
}
