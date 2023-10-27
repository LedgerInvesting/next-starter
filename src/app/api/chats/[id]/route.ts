import { createOrContinueChat } from '@/app/api/chats/create-or-continue'
import db from '@/database'
import { chats } from '@/database/schema/chats'
import { InsertMessage, messages } from '@/database/schema/messages'
import { enforceAPIAuth } from '@/lib/enforce-api-auth'
import { ChatCompletionMessageParam, Message, OpenAIChat } from '@/lib/openai'
import { OpenAIStreamCallbacks, StreamingTextResponse } from 'ai'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

type Params = { params: { id: string } }

// export const runtime = 'edge'

// Update a chat by ID
export async function POST(req: NextRequest, { params }: Params) {
  const userId = await enforceAPIAuth(req)
  if (!userId) {
    return NextResponse.json({ error: 'unauthorized', message: 'Invalid credentials' }, { status: 401 })
  }
  const body = await req.json()
  const { messages: messageBody }: { messages: ChatCompletionMessageParam[] } = body
  const chatId = params.id

  return await createOrContinueChat(userId, messageBody, chatId)
}

// Retrieve a chat by ID
export async function GET(req: NextRequest, { params }: Params) {
  const userId = await enforceAPIAuth(req)
  if (!userId) {
    return NextResponse.json({ error: 'unauthorized', message: 'Invalid credentials' }, { status: 401 })
  }
  const chatId = params.id
  const chat = await db.query.chats.findFirst({ where: eq(chats.id, chatId) })
  return NextResponse.json(chat)
}

// Delete a chat by ID
export async function DELETE(req: NextRequest, { params }: Params) {
  const userId = await enforceAPIAuth(req)
  if (!userId) {
    return NextResponse.json({ error: 'unauthorized', message: 'Invalid credentials' }, { status: 401 })
  }
  const chatId = params.id
  const chat = await db.query.chats.findFirst({ where: eq(chats.id, chatId) })
  return NextResponse.json([])
}
