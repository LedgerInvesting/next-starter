import { UserAuthForm } from '@/components/auth-form'

export default function Page() {
  return (
    <div className="mx-auto mt-32 flex max-w-sm flex-col space-y-2">
      {process.env.GOOGLE_CLIENT_ID}
      <br />
      {process.env.GOOGLE_CLIENT_SECRET}
      <br />
      <UserAuthForm />
    </div>
  )
}
