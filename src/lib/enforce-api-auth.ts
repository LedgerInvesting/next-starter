import db from '@/database'
import { sessions } from '@/database/schema/auth'
import { apiKeys } from '@/database/schema/api_keys'
import { getSearchParams } from '@/lib/utils'
import { eq } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export const enforceAPIAuth = async (request: NextRequest): Promise<string | null> => {
  let user = null
  const sessionToken =
    request.headers.get('next-auth.session-token') || request.cookies.get('next-auth.session-token')?.value
  const authorization = request.headers.get('authorization')
  const apiKey = authorization?.slice(7) || getSearchParams(request)['api_key']

  if (sessionToken) {
    const session = await db.query.sessions.findFirst({ where: eq(sessions.sessionToken, sessionToken) })
    user = session?.userId || null
  } else if (apiKey) {
    const secret = await db.query.apiKeys.findFirst({ where: eq(apiKeys.secret, apiKey) })
    user = secret?.user || null
  }
  return user
}
