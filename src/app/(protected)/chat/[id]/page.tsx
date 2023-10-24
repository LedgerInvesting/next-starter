import Content from '@/app/(protected)/chat/content'
import { enforceAuth } from '@/lib/enforce-auth'

export default async function Page({ params }: { params: { id: string } }) {
  const user = await enforceAuth()
  return <Content user={user} id={params.id} />
}
