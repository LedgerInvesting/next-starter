import db from '@/database'
import { chats } from '@/database/schema/chats'
import { getCurrentUser } from '@/lib/session'
import { eq } from 'drizzle-orm'
import { User } from 'next-auth'
import Link from 'next/link'

export const getChats = async (userId: string, page: number = 0) => {
  const pageSize = 20
  // via db query
  return await db.query.chats.findMany({
    where: eq(chats.user, userId),
    limit: pageSize,
    offset: pageSize * page,
  })
}

export type Chats = Awaited<ReturnType<typeof getChats>>

export default async function ChatSidebar({ user }: { user: User }) {
  const chats = await getChats(user?.id)
  return (
    <div className="flex flex-grow flex-col">
      {chats.map((chat) => {
        return (
          <Link key={chat.id} href={'/chat/' + chat.id}>
            {chat.id}
          </Link>
        )
      })}
    </div>
  )
}
