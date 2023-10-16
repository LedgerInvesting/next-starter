// https://vercel.com/docs/concepts/functions/serverless-functions#bundling-serverless-functions
import { ChatCompletionMessageParam, OpenAIChat } from '@/lib/openai'
import { NextResponse } from 'next/server'

// https://vercel.com/docs/concepts/functions/edge-functions/limitations#code-size-limit
export const runtime = 'edge' // 'nodejs' is the default

// Create a new chat
export async function POST(req: Request) {
  const { messages }: { messages: ChatCompletionMessageParam[] } = await req.json()
  return await OpenAIChat(messages)
}

// Retrieve multiple chats
export async function GET(req: Request) {
  return NextResponse.json([])
}
