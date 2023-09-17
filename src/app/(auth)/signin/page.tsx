import { UserAuthForm } from '@/components/auth-form'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getCurrentUser()

  if (user) {
    redirect('/')
  }
  return (
    <div className="mx-auto mt-32 flex max-w-sm flex-col space-y-2">
      <UserAuthForm />
    </div>
  )
}
