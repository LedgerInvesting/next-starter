import db from '@/database'
import { InsertChat, chats } from '@/database/schema/chats'
import { InsertMessage, messages } from '@/database/schema/messages'
import { ChatCompletionMessageParam, Message, OpenAIChat } from '@/lib/openai'
import { OpenAIStreamCallbacks, StreamingTextResponse, experimental_StreamData } from 'ai'
import { desc, eq } from 'drizzle-orm'

export async function createOrContinueChat(
  userId: string,
  messageBody?: ChatCompletionMessageParam[],
  chatId?: string,
) {
  const FLOW = chatId ? 'continue' : 'create'
  let openAIMessages = messageBody
  if (FLOW === 'continue') {
    // TODO: optimize to select only last message from chat within the token limit
    const chatMessages = await db.query.messages.findMany({
      where: eq(messages.chat, chatId),
      orderBy: desc(messages.created_at),
    })
    // take last message from messageBody
    const lastMessage = messageBody[messageBody.length - 1]
    openAIMessages = chatMessages.map((m) => ({
      content: m.content,
      role: m.role,
      function_call: m.function_call || undefined,
    }))
    openAIMessages.push(lastMessage)

    console.log('openAIMessages', openAIMessages)

    const messagesData = {
      content: lastMessage.content,
      role: lastMessage.role,
      user: userId,
      chat: chatId,
    } satisfies InsertMessage
    db.insert(messages).values(messagesData).execute()
  }

  // Instantiate the StreamData. It works with all API providers.
  const data = new experimental_StreamData()
  const streamCallbacks = {
    onStart: async () => {
      data.append({
        event: {
          type: 'onStart',
        },
      })
    },
    onToken: async (token) => {
      // is called at each incremental completion
      // TODO: use caching service KV/Redis to save progress before submitting transaction to Postgres
      data.append({
        event: {
          type: 'onToken',
        },
      })
    },
    experimental_onFunctionCall: async ({ name, arguments: args }, createFunctionCallMessages) => {
      // Do post processing of function calls here
      data.append({
        event: {
          type: 'onFunctionCall',
        },
      })
    },
    onCompletion: async (completion) => {
      // is similar to onFinal and called at the end of the stream
      data.append({
        event: {
          type: 'onCompletion',
        },
      })
    },
    onFinal: async (completion) => {
      // is called at end of the stream
      data.append({
        event: {
          type: 'onFinal',
        },
      })
      if (FLOW === 'create') {
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
        db.insert(messages).values(messagesData).execute()
        data.append({
          new_chat_id: newChat.id,
        })
      } else if (FLOW === 'continue') {
        const messagesData = {
          content: completion,
          role: 'assistant',
          user: userId,
          chat: chatId,
        } satisfies InsertMessage
        db.insert(messages).values(messagesData).execute()
      }

      data.close()
    },
    // IMPORTANT! until this is stable, you must explicitly opt in to supporting streamData.
    experimental_streamData: true,
  } satisfies OpenAIStreamCallbacks
  const stream = await OpenAIChat(openAIMessages, streamCallbacks)
  return await new StreamingTextResponse(stream, {}, data)
}
