import { ScrollArea } from '@/components/ui/scroll-area'
import Chat from './chat'
import { Container } from '@/components/container'
import clsx from 'clsx'

// https://tailwindui.com/components/application-ui/application-shells/multi-column#component-00881f00b48af67e0054c54fd18cad58
export default async function Page() {
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
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
        </ScrollArea>
      </div>
      <div className="bg-stripes-cyan-500 w-full">
        <Chat />
      </div>
    </Container>
  )
}
