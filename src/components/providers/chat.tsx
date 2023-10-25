'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { SelectChat } from '@/database/schema/chats'

const ChatContext = createContext<{ chats: SelectChat | [] }>({ chats: [] })

export function ChatProvider({ children, ...props }) {
  const [chats, setChats] = useState<SelectChat | []>([])
  useEffect(() => {}, [])
  return (
    <ChatContext.Provider value={{ chats }} {...props}>
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
