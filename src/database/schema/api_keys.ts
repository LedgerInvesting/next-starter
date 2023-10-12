import { pgTable, text } from 'drizzle-orm/pg-core'
import { users } from '@/database/schema/auth'
import { id, timestampsColumns } from '@/database/utils'
import { nanoId } from '@/database/utils'
import { relations } from 'drizzle-orm'

export const createKey = () => {
  return 'sk_' + nanoId()
}

export const apiKeys = pgTable('api_keys', {
  secret: text('secret')
    .primaryKey()
    .$defaultFn(() => createKey())
    .notNull(),
  user: text('user')
    .notNull()
    .references(() => users.id, { onDelete: 'set null' }),
  ...timestampsColumns,
})

export const apiKeyRelations = relations(apiKeys, ({ one }) => ({
  user: one(users, {
    fields: [apiKeys.user],
    references: [users.id],
  }),
}))

export type InsertAPIKey = typeof apiKeys.$inferInsert
export type SelectAPIKey = typeof apiKeys.$inferSelect
