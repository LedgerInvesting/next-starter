// https://vercel.com/docs/concepts/functions/serverless-functions#bundling-serverless-functions
import db from '@/database'
import { InsertChat, chats } from '@/database/schema/chats'
import { InsertMessage, messages } from '@/database/schema/messages'
import { enforceAPIAuth } from '@/lib/enforce-api-auth'
import { ChatCompletionMessageParam, OpenAIChat } from '@/lib/openai'
import { OpenAIStreamCallbacks, StreamingTextResponse } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

// https://vercel.com/docs/concepts/functions/edge-functions/limitations#code-size-limit
// export const runtime = 'edge' // 'nodejs' is the default

// Create a new chat
export async function POST(req: NextRequest) {
  const userId = await enforceAPIAuth(req)
  console.log('userId', userId)
  // if (!userId) {
  //   return NextResponse.json({ error: 'unauthorized', message: 'Invalid credentials' }, { status: 401 })
  // }
  const body = await req.json()

  const { messages: messageBody }: { messages: ChatCompletionMessageParam[] } = body

  const streamCallbacks = {
    onToken: async (token) => {
      // is called at each incremental completion
    },
    onCompletion: async (completion) => {
      // is similar to onFinal and called at the end of the stream
    },
    onFinal: async (completion) => {
      // is called at end of the stream
      console.log('onFinal -> completion', completion)
      const chatData = {
        title: null,
        user: userId,
      } satisfies InsertChat
      const [newChat = undefined] = await db.insert(chats).values(chatData).returning().execute()
      const messagesData = messageBody.map((message) => ({
        ...message,
        user: userId,
        chat: newChat.id,
      })) satisfies InsertMessage[]
      messagesData.push({
        content: completion,
        role: 'assistant',
        user: userId,
        chat: newChat.id,
      })
      const newMessages = await db.insert(messages).values(messagesData).returning().execute()
    },
  } satisfies OpenAIStreamCallbacks

  const stream = await OpenAIChat(messageBody, streamCallbacks)
  return await new StreamingTextResponse(stream)
}

// Retrieve multiple chats
export async function GET(req: Request) {
  return NextResponse.json([])
}
