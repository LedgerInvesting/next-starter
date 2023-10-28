'use client'

import { useChats } from '@/app/(protected)/chats/chat-provider'
import { Chats } from '@/app/(protected)/chats/layout'
import Link from 'next/link'
import { useEffect } from 'react'

// export default function ChatSidebar({ chats }: { chats: Chats }) {
export default function ChatSidebar({ chats }: { chats: Chats }) {
  const { chats: _chats, setChats } = useChats()
  if (_chats.length > 0) chats = _chats

  useEffect(() => {
    // sort chats by descending created_at date
    if (!setChats) return
    setChats((prev) =>
      prev.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }),
    )
  }, [chats, setChats])
  return (
    <div className="flex flex-col space-y-1">
      {chats.map((chat) => {
        return (
          <Link
            key={chat.id}
            href={'/chats/' + chat.id}
            className="overflow-hidden text-ellipsis rounded-md px-1 py-1.5 hover:bg-primary/10"
          >
            {new Date(chat?.created_at).toISOString()} {chat.id}
          </Link>
        )
      })}
    </div>
  )
}
