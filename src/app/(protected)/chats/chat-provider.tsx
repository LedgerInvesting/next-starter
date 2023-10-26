'use client'

import { Chats } from '@/app/(protected)/chats/layout'
import { createContext, useContext, useEffect, useState } from 'react'

export const ChatContext = createContext<{
  chats: Chats
  setChats: React.Dispatch<React.SetStateAction<Chats>>
}>({
  chats: [],
  setChats: () => {},
})

export function ChatProvider({ children, ...props }) {
  const [chats, setChats] = useState<Chats>(props.chats)

  useEffect(() => {}, [])

  return (
    <ChatContext.Provider value={{ chats, setChats }} {...props}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChats() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChats must be used within an ChatProvider')
  }
  return context
}
