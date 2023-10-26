import Chat from '@/app/(protected)/chat/chat'
import Content from '@/app/(protected)/chat/layout'
import { enforceAuth } from '@/lib/enforce-auth'

export default async function Page() {
  const user = await enforceAuth()
  return <Chat />
}
