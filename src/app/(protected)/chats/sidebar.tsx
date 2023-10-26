'use client'

import { useChats } from '@/app/(protected)/chats/chat-provider'
import Link from 'next/link'
import { useEffect } from 'react'

export default function ChatSidebar() {
  const { chats } = useChats()
  return (
    <div className="flex flex-col space-y-1">
      {chats.map((chat) => {
        return (
          <Link
            key={chat.id}
            href={'/chats/' + chat.id}
            className="overflow-hidden text-ellipsis rounded-md px-1 py-1.5 hover:bg-primary/10"
          >
            {chat.id}
          </Link>
        )
      })}
    </div>
  )
}
