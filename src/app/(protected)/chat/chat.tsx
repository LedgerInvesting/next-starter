'use client'

import { type Message, useChat } from 'ai/react'

export const PROMPT_INSTRUCTIONS = ``

export default function Chat() {
  const { messages, input, error, handleInputChange, handleSubmit, stop, reload, setMessages, isLoading, append } =
    useChat({
      api: '/api/chat',
      initialMessages: [
        // {
        //   id: '1',
        //   role: 'system',
        //   content: PROMPT_INSTRUCTIONS,
        // },
      ],
      onError: (err) => {
        console.error('onError', err)
      },
      onResponse: (res) => {
        console.log('onResponse > res.json()', res)
      },
      onFinish: (msg) => {
        console.log('onFinish > msg', msg)
      },
      experimental_onFunctionCall: async (msgList) => {
        console.log('experimental_onFunctionCall > msgList', msgList)
        const msg = msgList[msgList.length - 1]
        const function_call = msg.function_call
        if (!function_call) return
        if (typeof function_call === 'string') return
        const { name, arguments: args } = function_call
        if (name === 'functionName' && !!args) {
          const body = JSON.stringify(JSON.parse(args))
          console.log('body', body)

          // let newMessages = []
          // const r = await fetch('/api/functions/<functionName>', {
          //   body: body,
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          // })

          // const prompt = processFunctionResponse(r)
          // newMessages.push({
          //   id: Math.random().toString(),
          //   role: 'assistant',
          //   content: `${prompt}`,
          // } satisfies Message)
          // return { messages: [...msgList, ...newMessage] }
        }
        return
      },
    })

  return (
    <>
      {/* {messages.map((m) => (
        <div className="mb-4" key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))} */}
      <pre className=" break-normal	prose m-4 w-[400px] rounded-md border bg-white p-4">{JSON.stringify(messages, null, 2)}</pre>
      <form className="m-4 flex space-x-4" onSubmit={handleSubmit}>
        <input
          className="rounded-md p-2 text-black"
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />
        <button className="rounded-md border-2 border-solid border-white p-2" type="submit">
          Send
        </button>
      </form>
    </>
  )
}
