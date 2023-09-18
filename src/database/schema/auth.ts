import { timestamp, pgTable, text, primaryKey, integer, pgSchema, index } from 'drizzle-orm/pg-core'
import type { AdapterAccount } from '@auth/core/adapters'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { relations } from 'drizzle-orm'

// Useful links
// https://github.com/drizzle-team/drizzle-orm/tree/main/drizzle-zod

export const authSchema = pgSchema('auth')

export const users = authSchema.table('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
})
export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}))

export const accounts = authSchema.table(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index('userId_idx').on(account.userId),
  }),
)
export const insertAccountSchema = createInsertSchema(accounts)
export const selectAccountSchema = createSelectSchema(accounts)
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessions = authSchema.table(
  'session',
  {
    sessionToken: text('sessionToken').notNull().primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (session) => ({
    userIdIdx: index('userId_idx').on(session.userId),
  }),
)
export const insertSessionSchema = createInsertSchema(sessions)
export const selectSessionSchema = createSelectSchema(sessions)
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const verificationTokens = authSchema.table(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
)
export const insertVerificationSchema = createInsertSchema(verificationTokens)
export const selectVerificationSchema = createSelectSchema(verificationTokens)
