import { id, timestampsColumns } from '@/database/utils'
import { users } from '@/database/schema/auth'
import { relations, sql } from 'drizzle-orm'
import { json, pgTable, text } from 'drizzle-orm/pg-core'
import { messages } from '@/database/schema/messages'

// https://github.com/supabase/pg_jsonschema
export const chats = pgTable(
  'chats',
  {
    id: id('chat'),
    title: text('title'),
    user: text('user').references(() => users.id, { onDelete: 'cascade' }),
    ...timestampsColumns,
  },
  (table) => ({}),
)

export const chatRelations = relations(chats, ({ one, many }) => ({
  user: one(users, {
    fields: [chats.user],
    references: [users.id],
  }),
  messages: many(messages),
}))
export type InsertChat = typeof chats.$inferInsert
export type SelectChat = typeof chats.$inferSelect
