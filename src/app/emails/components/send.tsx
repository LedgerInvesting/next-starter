import * as Popover from '@radix-ui/react-popover'
import * as React from 'react'
import { inter } from '../layout'
import { Button } from './button'
import { Text } from './text'

export const Send = ({ markup }: { markup: string }) => {
    const [to, setTo] = React.useState('')
    const [subject, setSubject] = React.useState('Testing React Email')
    const [isSending, setIsSending] = React.useState(false)

    const onFormSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            setIsSending(true)

            const response = await fetch('https://react.email/api/send/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to,
                    subject,
                    html: markup,
                }),
            })

            if (response.status === 429) {
                const { error } = await response.json()
                alert(error)
            }
        } catch (e) {
            alert('Something went wrong. Please try again.')
        } finally {
            setIsSending(false)
        }
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className="text-slate-11 hover:border-slate-12 hover:text-slate-12 box-border flex h-5 w-20 items-center justify-center self-center rounded-lg border border-slate-600 px-4 py-4 text-center font-sans text-sm outline-none transition duration-300 ease-in-out">
                    Send
                </button>
            </Popover.Trigger>
            <Popover.Anchor />
            <Popover.Portal>
                <Popover.Content
                    align="end"
                    className={`border-slate-6 text-slate-11 -mt-10 w-80 rounded-lg border bg-black p-3 font-sans ${inter.variable}`}
                >
                    <Popover.Close
                        aria-label="Close"
                        className="text-slate-11 hover:text-slate-12 absolute right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs transition duration-300 ease-in-out"
                    >
                        ✕
                    </Popover.Close>
                    <form onSubmit={onFormSubmit} className="mt-1">
                        <label
                            htmlFor="to"
                            className="text-slate-10 mb-2 block text-xs uppercase"
                        >
                            Recipient
                        </label>
                        <input
                            autoFocus={true}
                            className="bg-slate-3 placeholder-slate-8 border-slate-6 text-slate-12 focus:ring-slate-12 mb-3 w-full appearance-none rounded-lg border px-2 py-1 text-sm outline-none transition duration-300 ease-in-out focus:ring-1"
                            onChange={(e) => setTo(e.target.value)}
                            defaultValue={to}
                            placeholder="you@example.com"
                            type="email"
                            id="to"
                            required
                        />
                        <label
                            htmlFor="subject"
                            className="text-slate-10 mb-2 block text-xs uppercase"
                        >
                            Subject
                        </label>
                        <input
                            className="bg-slate-3 placeholder-slate-8 border-slate-6 text-slate-12 focus:ring-slate-12 mb-3 w-full appearance-none rounded-lg border px-2 py-1 text-sm outline-none transition duration-300 ease-in-out focus:ring-1"
                            onChange={(e) => setSubject(e.target.value)}
                            defaultValue={subject}
                            placeholder="My Email"
                            type="text"
                            id="subject"
                            required
                        />
                        <input
                            type="checkbox"
                            className="appearance-none checked:bg-blue-500"
                        />
                        <div className="flex items-center justify-between">
                            <Text className="inline-block" size="1">
                                Powered by{' '}
                                <a
                                    className="hover:text-slate-12 transition duration-300 ease-in-out"
                                    href="https://resend.com"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Resend
                                </a>
                            </Text>
                            <Button
                                type="submit"
                                disabled={
                                    subject.length === 0 ||
                                    to.length === 0 ||
                                    isSending
                                }
                                className="disabled:bg-slate-11 disabled:border-transparent"
                            >
                                Send
                            </Button>
                        </div>
                    </form>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
