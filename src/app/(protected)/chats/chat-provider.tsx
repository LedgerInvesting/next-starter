'use client'

import { ChatWithMessages } from '@/app/(protected)/chats/[id]/page'
import { Chats } from '@/app/(protected)/chats/layout'
import { createContext, useContext, useEffect, useState } from 'react'

export const ChatContext = createContext<{
  chats: Chats
  setChats: React.Dispatch<React.SetStateAction<Chats>>
  current: ChatWithMessages
  setCurrent: React.Dispatch<React.SetStateAction<ChatWithMessages>>
}>({
  chats: [],
  setChats: () => {},
  current: undefined,
  setCurrent: () => {},
})

export function ChatProvider({ children, ...props }) {
  const [chats, setChats] = useState<Chats>(props.chats)
  const [current, setCurrent] = useState<ChatWithMessages>(props.thread)

  useEffect(() => {}, [])

  return (
    <ChatContext.Provider value={{ chats, setChats, current, setCurrent }} {...props}>
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
