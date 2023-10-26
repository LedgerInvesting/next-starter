import Chat from '@/app/(protected)/chat/chat'
import db from '@/database'
import { chats } from '@/database/schema/chats'
import { eq } from 'drizzle-orm'
import { notFound, redirect } from 'next/navigation'

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

export default async function Page({ params }: { params: { id: string } }) {
  let chat: ChatMessages | undefined | null
  if (params?.id) {
    chat = await getChatMessages(params?.id)
    if (!chat) {
      // redirect('/chat')
      notFound()
    }
  }
  return <Chat chat={chat} />
}
