// https://vercel.com/docs/concepts/functions/serverless-functions#bundling-serverless-functions
import { createOrContinueChat } from '@/app/api/chats/create-or-continue'
import db from '@/database'
import { InsertChat, chats } from '@/database/schema/chats'
import { InsertMessage, messages } from '@/database/schema/messages'
import { enforceAPIAuth } from '@/lib/enforce-api-auth'
import { ChatCompletionMessageParam, OpenAIChat } from '@/lib/openai'
import { OpenAIStreamCallbacks, StreamingTextResponse, experimental_StreamData } from 'ai'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

// https://vercel.com/docs/concepts/functions/edge-functions/limitations#code-size-limit
// TODO: edge not working with db queries, defaulting to nodejs
// export const runtime = 'edge' // 'nodejs' is the default

// Create a new chat
export async function POST(req: NextRequest) {
  const userId = await enforceAPIAuth(req)
  if (!userId) {
    return NextResponse.json({ error: 'unauthorized', message: 'Invalid credentials' }, { status: 401 })
  }
  const body = await req.json()

  const { messages: messageBody }: { messages: ChatCompletionMessageParam[] } = body

  return await createOrContinueChat(userId, messageBody)
}

// Retrieve multiple chats
export async function GET(req: NextRequest) {
  const userId = await enforceAPIAuth(req)
  const userChats = await db.query.chats.findMany({ where: eq(chats.user, userId) })
  return NextResponse.json(userChats)
}
