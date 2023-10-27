import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function enforceAuth() {
  let from = ''
  try {
    const { headers } = await import('next/headers')
    const headersList = headers()
    const referer = headersList.get('referer')
    if (!referer) return
    const url = new URL(referer)
    const pathWithSearchParams = url.pathname + url.search
    from = `?from=${encodeURIComponent(pathWithSearchParams)}`
  } catch (error) {
    console.error(error)
  }
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn + from || '/signin' + from)
  }
  return user
}
