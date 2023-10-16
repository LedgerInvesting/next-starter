import { ScrollArea } from '@/components/ui/scroll-area'
import Chat from './chat'
import { Container } from '@/components/container'

export default async function Page() {
  return (
    <div className="fixed inset-0 flex h-full">
      <nav className="flex w-96 grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 py-20 pb-2">
        <h1 className="text-2xl font-bold">Past chats</h1>
      </nav>
      <ScrollArea className="h-full w-full grow py-20">
        <Chat />
      </ScrollArea>
    </div>
  )
}
