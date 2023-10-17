import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { getCurrentUser } from '@/lib/session'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <Header user={user} />
      <main className="flex flex-grow flex-col">{children}</main>
      <Footer />
    </div>
  )
}
