import { id, timestampsColumns } from '@/database/utils'
import { users } from '@/database/schema/auth'
import { relations } from 'drizzle-orm'
import { integer, json, pgEnum, pgTable, text } from 'drizzle-orm/pg-core'
import { chats } from '@/database/schema/chats'
import { Message } from 'ai/react'
import { type ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs'

export const messageRoles = ['user', 'assistant', 'system', 'function'] as const
export type MessageRoles = (typeof messageRoles)[number]
type LibMessageRoles = Message['role']
type AreEqual<T, U> = T extends U ? (U extends T ? true : false) : false
export type CheckEquality = AreEqual<MessageRoles, LibMessageRoles>
export const messageRolesEnum = pgEnum('message_roles', messageRoles)

export const messages = pgTable(
  'messages',
  {
    id: id('message'),
    // TODO: add reference to previous message in a thread
    // previous: text('previous').references(() => messages.id, { onDelete: 'cascade' }),
    role: messageRolesEnum('role'),
    content: text('content'),
    function_call: json('function_call').$type<ChatCompletionMessageParam.FunctionCall>(),
    token_count: integer('token_count'),
    user: text('user').references(() => users.id, { onDelete: 'cascade' }),
    chat: text('chat').references(() => chats.id, { onDelete: 'cascade' }),
    ...timestampsColumns,
  },
  (table) => ({}),
)

export const messageRelations = relations(messages, ({ one }) => ({
  user: one(users, {
    fields: [messages.user],
    references: [users.id],
  }),
  chat: one(chats, {
    fields: [messages.chat],
    references: [chats.id],
  }),
}))
export type InsertMessage = typeof messages.$inferInsert
export type SelectMessage = typeof messages.$inferSelect
