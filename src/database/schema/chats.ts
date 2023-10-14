import { id, timestampsColumns } from '@/database/utils'
import { users } from '@/database/schema/auth'
import { relations, sql } from 'drizzle-orm'
import { json, pgTable, text } from 'drizzle-orm/pg-core'

// const contentSchema = z
//   .object({
//     myString: z.string().min(5),
//     myUnion: z.union([z.number(), z.boolean()]),
//   })
//   .describe('My neat object schema')

// https://github.com/supabase/pg_jsonschema
export const chats = pgTable(
  'chats',
  {
    id: id('chat'),
    title: text('title'),
    content: json('content'),
    user: text('user').references(() => users.id, { onDelete: 'cascade' }),
    ...timestampsColumns,
  },
  (table) => ({}),
)

export const chatRelations = relations(chats, ({ one }) => ({
  user: one(users, {
    fields: [chats.user],
    references: [users.id],
  }),
}))
export type InsertChat = typeof chats.$inferInsert
export type SelectChat = typeof chats.$inferSelect
