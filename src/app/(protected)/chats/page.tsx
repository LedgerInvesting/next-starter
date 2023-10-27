import Chat from '@/app/(protected)/chats/chat-messages'
import { enforceAuth } from '@/lib/enforce-auth'

export default async function Page() {
  const user = await enforceAuth()
  return <Chat user={user} />
}
