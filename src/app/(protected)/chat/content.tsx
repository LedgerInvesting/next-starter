import { ScrollArea } from '@/components/ui/scroll-area'
import Chat from './chat.client'
import { Container } from '@/components/container'
import clsx from 'clsx'
import db from '@/database'
import { chats } from '@/database/schema/chats'
import { eq } from 'drizzle-orm'
import { redirect, notFound } from 'next/navigation'
import { enforceAuth } from '@/lib/enforce-auth'
import { User } from 'next-auth'
import ChatSidebar from '@/app/(protected)/chat/sidebar'

export const getChatMessages = async (chatId: string) => {
  // via db query
  return await db.query.chats.findFirst({
    where: eq(chats.id, chatId),
    with: {
      messages: true,
    },
  })
  // via API
  // const r = await fetch(getSelfURL(`/chats/${id}`), { method: 'GET' })
  // return await r.json()
}

export type ChatMessages = Awaited<ReturnType<typeof getChatMessages>>

export default async function Content({ user, id }: { user: User; id?: string }) {
  let chat: ChatMessages | undefined | null
  if (id) {
    chat = await getChatMessages(id)
    if (!chat) {
      // notFound()
      redirect('/chat')
    }
  }

  return (
    <Container className="flex flex-grow items-stretch">
      <div
        className={clsx(
          `bg-stripes-green-200 hidden w-44 flex-col lg:flex`,
          `max-h-[calc(100vh-8rem)]`, // screen - header + footer height
        )}
      >
        <h1 className="text-xl font-bold">Past chats</h1>
        <ScrollArea className="bg-stripes-indigo-400 flex flex-grow">
          <ChatSidebar user={user} />
        </ScrollArea>
      </div>
      <div className="bg-stripes-cyan-500 w-full">
        <Chat chat={chat} />
      </div>
    </Container>
  )
}