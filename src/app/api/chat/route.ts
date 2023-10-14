// https://vercel.com/docs/concepts/functions/serverless-functions#bundling-serverless-functions
import { ChatCompletionMessageParam, OpenAIChat } from '@/lib/openai'

// https://vercel.com/docs/concepts/functions/edge-functions/limitations#code-size-limit
export const runtime = 'edge' // 'nodejs' is the default

export async function POST(req: Request) {
  const { messages }: { messages: ChatCompletionMessageParam[] } = await req.json()
  return await OpenAIChat(messages)
}
