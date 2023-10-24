import Content from '@/app/(protected)/chat/content'
import { enforceAuth } from '@/lib/enforce-auth'

export default async function Page() {
  const user = await enforceAuth()
  return <Content user={user} />
}
