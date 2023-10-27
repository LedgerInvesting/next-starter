import { ScrollArea } from '@/components/ui/scroll-area'
import { Container } from '@/components/container'
import clsx from 'clsx'
import ChatSidebar from '@/app/(protected)/chats/sidebar'
import { enforceAuth } from '@/lib/enforce-auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChatProvider } from '@/app/(protected)/chats/chat-provider'
import db from '@/database'
import { desc, eq } from 'drizzle-orm'
import { chats } from '@/database/schema/chats'

export const getChats = async (userId: string, page: number = 0) => {
  const pageSize = 20
  // via db query
  return await db.query.chats.findMany({
    where: eq(chats.user, userId),
    limit: pageSize,
    offset: pageSize * page,
    orderBy: desc(chats.updated_at),
  })
}

export const getThread = async (userId: string, page: number = 0) => {
  const pageSize = 20
  // via db query
  return await db.query.messages.findMany({
    where: eq(chats.user, userId),
    limit: pageSize,
    offset: pageSize * page,
    orderBy: desc(chats.created_at),
  })
}

export type Chats = Awaited<ReturnType<typeof getChats>>
export type Thread = Awaited<ReturnType<typeof getChats>>

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await enforceAuth()
  const chats = await getChats(user?.id)
  return (
    <ChatProvider chats={chats}>
      <Container className="flex flex-grow items-stretch">
        <div
          className={clsx(
            `hidden w-44 flex-col space-y-2 p-2 bg-stripes-green-200 lg:flex`,
            `max-h-[calc(100vh-8rem)]`, // screen - header + footer height
          )}
        >
          <h1 className="text-xl font-bold">Past chats</h1>
          <Link href="/chats">
            <Button>New chat</Button>
          </Link>
          <ScrollArea className="flex flex-grow bg-stripes-indigo-400">
            <ChatSidebar />
          </ScrollArea>
        </div>
        <div className="w-full bg-stripes-cyan-500">{children}</div>
      </Container>
    </ChatProvider>
  )
}
