import { ScrollArea } from '@/components/ui/scroll-area'
import Chat from './chat'
import { Container } from '@/components/container'
import clsx from 'clsx'
import ChatSidebar from '@/app/(protected)/chat/sidebar'
import { enforceAuth } from '@/lib/enforce-auth'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await enforceAuth()

  return (
    <Container className="flex flex-grow items-stretch">
      <div
        className={clsx(
          `hidden w-44 flex-col bg-stripes-green-200 lg:flex`,
          `max-h-[calc(100vh-8rem)]`, // screen - header + footer height
        )}
      >
        <h1 className="text-xl font-bold">Past chats</h1>
        <ScrollArea className="flex flex-grow bg-stripes-indigo-400">
          <ChatSidebar user={user} />
        </ScrollArea>
      </div>
      <div className="w-full bg-stripes-cyan-500">{children}</div>
    </Container>
  )
}
