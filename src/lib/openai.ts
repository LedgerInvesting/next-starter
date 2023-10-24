import OpenAI from 'openai'
import { getEncoding } from 'js-tiktoken'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import {
  type ChatCompletionMessageParam,
  type ChatCompletionCreateParamsBase,
} from 'openai/resources/chat/completions.mjs'

// Create an OpenAI API client (that's edge friendly!)
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
export { type ChatCompletionMessageParam }
export type OpenAIModels = ChatCompletionCreateParamsBase['model']
export type Models = 'gpt-4' | 'gpt-4-32k' | 'gpt-3.5-turbo' | 'gpt-3.5-16k'

// https://platform.openai.com/docs/models/gpt-4
export const MAX_TOKEN_LIMITS: Record<Models, number> = {
  'gpt-4': 8192,
  'gpt-4-32k': 32768,
  'gpt-3.5-turbo': 4097,
  'gpt-3.5-16k': 16385,
}

const DEFAULT_MODEL = 'gpt-4'

const enc = getEncoding('cl100k_base')

// Function to calculate the token length of a single message
export function calculateTokenLength(message: any): number {
  const text = JSON.stringify(message)
  return enc.encode(text).length
}

// Function to process the messages
export function processMessages(messages: ChatCompletionMessageParam[], token_limit: number = 4097) {
  // Create a copy of messages to hold the final result
  let result = messages.slice()

  // Iterate from the end of the array, removing non-system messages as needed
  let tokenCounter = 0
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i]
    const tokenLength = calculateTokenLength(message)

    if (message.role !== 'system') {
      if (tokenCounter + tokenLength > token_limit) {
        // Remove the message if it exceeds the token limit
        result.splice(i, 1)
      } else {
        tokenCounter += tokenLength
      }
    } else {
      tokenCounter += tokenLength
    }
  }

  return result
}

export async function OpenAIChat(messages: ChatCompletionMessageParam[], model: Models = DEFAULT_MODEL) {
  // Extract the `messages` from the body of the request
  // Request the OpenAI API for the response based on the prompt

  const truncatedMessages = processMessages(messages, MAX_TOKEN_LIMITS[model])

  const response = await openai.chat.completions.create({
    model: model,
    stream: true,
    messages: truncatedMessages,
    // max_tokens: 8192,
    temperature: 0.5,
    // top_p: 1,
    // frequency_penalty: 1,
    // presence_penalty: 1,
    // functions: [
    //   {
    //     name: 'semantic_search',
    //     description:
    //       'Semantically search from text database. Use the `query` parameter to pass text to find similar content in meaning. Under the hood, the search transforms query and text data being queried into vectors and then finds the most similar vectors using cosine similarity.',
    //     parameters: {
    //       type: 'object',
    //       properties: {
    //         query: {
    //           type: 'string',
    //           description: 'The sampled text to search for similar content in meaning',
    //         },
    //         collection: {
    //           type: 'string',
    //           enum: ['collection1', 'collection2', 'collection3'],
    //           description: 'The collection of document to search from',
    //         },
    //       },
    //       required: ['query', 'collection'],
    //     },
    //   },
    // ],
  })
  // TODO: https://sdk.vercel.ai/docs/guides/providers/openai#guide-save-to-database-after-completion
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
