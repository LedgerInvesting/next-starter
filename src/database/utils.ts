import { text, timestamp } from 'drizzle-orm/pg-core'
import KSUID from 'ksuid'
import { customAlphabet } from 'nanoid'

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
export const nanoId = customAlphabet(alphabet, 27)

export const createId = (prefix: string) => {
  return prefix + '_' + KSUID.randomSync().string
}

export const id = (prefix: string) =>
  text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId(prefix))

export const timestampsColumns = {
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}
