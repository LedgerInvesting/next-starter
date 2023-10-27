import { Header } from '@/components/header'
import { enforceAuth } from '@/lib/enforce-auth'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await enforceAuth()
  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <Header user={user} />
      <div className="flex flex-grow flex-col">{children}</div>
    </div>
  )
}
