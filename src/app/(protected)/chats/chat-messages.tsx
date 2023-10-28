'use client'

import { ChatWithMessages } from '@/app/(protected)/chats/[id]/page'
import { useChats } from '@/app/(protected)/chats/chat-provider'
import { Button } from '@/components/ui/button'
import { useChat } from 'ai/react'
import { ChevronRight } from 'lucide-react'
import { type User } from 'next-auth'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export const PROMPT_INSTRUCTIONS = ``

export default function Chat({ chat, user }: { chat?: ChatWithMessages; user?: User }) {
  const { setChats } = useChats()
  const router = useRouter()
  const initialMessages = chat?.messages
    ? chat.messages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        function_call: m.function_call,
      }))
    : []
  const [rows, setRows] = useState(1)
  const {
    messages,
    data,
    input,
    error,
    handleInputChange,
    handleSubmit,
    stop,
    reload,
    setMessages,
    isLoading,
    append,
  } = useChat({
    api: chat?.id ? `/api/chats/${chat?.id}` : '/api/chats',
    initialMessages: [
      ...initialMessages,
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
      console.log('onResponse > res', res.body)
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

  const buttonRef = useRef<HTMLButtonElement>(null)

  const rowHeight = 24 // px
  const maxRows = 4
  const maxHeight = rowHeight * maxRows // 96px

  useEffect(() => {
    console.log('data', data)
    const newChat = data?.find((d) => !!d.new_chat?.id)?.new_chat
    if (!!newChat && !!router && !!setChats) {
      // router.push(`/chats/${chatId}`)
      setChats((chats) => [newChat, ...chats])
      router.replace(`/chats/${newChat.id}`)
    }
  }, [data, router, setChats])

  return (
    <div className="flex h-full flex-col">
      {/* {messages.map((m) => (
        <div className="mb-4" key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))} */}
      <pre className=" prose	m-4 w-[400px] break-normal rounded-md border bg-white p-4">
        {JSON.stringify(messages, null, 2)}
      </pre>
      {/* <form className="m-4 flex space-x-4" onSubmit={handleSubmit}>
        <input
          className="rounded-md p-2 text-black"
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />
        <button className="rounded-md border-2 border-solid border-white p-2" type="submit">
          Send
        </button>
      </form> */}

      <div className="w-full pt-2">
        <div className="w-full ">
          <form
            onSubmit={handleSubmit}
            className="

          stretch mx-2 flex flex-row gap-3 md:mx-4 lg:mx-auto lg:max-w-3xl xl:max-w-5xl"
          >
            <div className="relative flex h-full flex-1 flex-col items-stretch">
              <div className="relative mb-4 flex h-2 w-full justify-center gap-2">
                <div className="absolute -top-6 right-0 flex gap-2">
                  {!isLoading && (
                    <Button onClick={() => setMessages([])} variant="outline">
                      Clear
                    </Button>
                  )}
                  {!isLoading && (
                    <Button onClick={() => reload()} variant="outline">
                      Reload
                    </Button>
                  )}
                  {isLoading && (
                    <Button onClick={() => stop()} variant="outline">
                      Stop
                    </Button>
                  )}
                </div>
              </div>
              <div
                className="flex w-full flex-grow flex-col rounded-lg border border-black/10 bg-white
            py-4 shadow-md md:pl-4"
              >
                <textarea
                  value={input}
                  onKeyDown={(e) => {
                    if (e.key == 'Enter' && e.shiftKey == false && !isLoading && input?.length > 0) {
                      e.preventDefault()
                      buttonRef.current?.click()
                    }
                  }}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n').length
                    setRows(Math.min(lines, maxRows))
                    handleInputChange(e)
                  }}
                  disabled={isLoading}
                  rows={rows}
                  placeholder="Ask a question..."
                  className="
                scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded m-0 w-full
                resize-none overflow-y-scroll overscroll-auto border-0 bg-transparent p-0 pl-3 pr-10 focus:ring-0 focus-visible:ring-0 md:pl-0 md:pr-12
                "
                  style={{ maxHeight: maxHeight }}
                />

                <Button
                  ref={buttonRef}
                  className="enabled:bg-brand-purple absolute bottom-2 right-2 rounded-md px-2 py-1 text-white transition-colors disabled:text-gray-400 disabled:opacity-40"
                  type="submit"
                  variant={isLoading || !input ? 'secondary' : 'default'}
                  disabled={isLoading || !input}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
