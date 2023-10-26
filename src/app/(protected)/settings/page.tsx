import { Container } from '@/components/container'
import db from '@/database'
import { apiKeys } from '@/database/schema/api_keys'
import { enforceAuth } from '@/lib/enforce-auth'
import { eq } from 'drizzle-orm'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import APIKey from '@/app/(protected)/settings/api-key'

const getOrCreateAPIKey = async (userId: string) => {
  let apiKey = await db.query.apiKeys.findFirst({
    columns: { secret: true },
    where: eq(apiKeys.user, userId),
  })
  if (!apiKey) {
    apiKey = (
      await db
        .insert(apiKeys)
        .values({
          user: userId,
        })
        .returning({ secret: apiKeys.secret })
        .execute()
    )[0]
  }
  return apiKey.secret
}

export default async function Page() {
  const user = await enforceAuth()
  const apiKey = await getOrCreateAPIKey(user.id)
  return (
    <Container className="flex-col space-y-16 pt-24">
      <div className="w-full">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">Manage your account and settings.</p>

        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">{user.name}</div>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">{user.email}</div>
            </dd>
          </div>
        </dl>
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-semibold">API Keys</h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          API token to make requests to{' '}
          <Link
            href={'/api/chats?api_key=YOUR_API_KEY'}
            className="text-primary-900 underline-offset-2 hover:underline"
          >
            /api/chats?api_key=YOUR_API_KEY
          </Link>
          . Visit our{' '}
          <Link
            href={'https://example.com/docs'}
            target="_blank"
            className="inline-flex items-center text-primary-900 underline-offset-2 hover:underline"
          >
            API Documentation <ExternalLink className="mx-1 inline-block h-4 w-4" />
          </Link>
          for more information.
        </p>

        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Secret key</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              {apiKey && <APIKey secret={apiKey} />}
            </dd>
          </div>
        </dl>
      </div>
    </Container>
  )
}
