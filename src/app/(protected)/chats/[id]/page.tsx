import Chat from '@/app/(protected)/chats/chat-messages'
import { useChats } from '@/app/(protected)/chats/chat-provider'
import db from '@/database'
import { chats } from '@/database/schema/chats'
import { eq } from 'drizzle-orm'
import { notFound, redirect } from 'next/navigation'

export const getChatWithMessages = async (chatId: string) => {
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

export type ChatWithMessages = Awaited<ReturnType<typeof getChatWithMessages>>

export default async function Page({ params }: { params: { id: string } }) {
  let chat: ChatWithMessages | undefined | null
  // const { setCurrent } = useChats()
  if (params?.id) {
    chat = await getChatWithMessages(params?.id)
    if (!chat) {
      redirect('/chats')
      // notFound()
    }
    // setCurrent(chat)
  }
  return (
    <>
      {chat.id}
      <Chat chat={chat} />
    </>
  )
}
