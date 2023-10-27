import db from '@/database'
import { Table, eq } from 'drizzle-orm'
import { text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import KSUID from 'ksuid'
import { z, SafeParseReturnType, SafeParseError } from 'zod'

export function createModel(table: Table) {
  const insertSchema = createInsertSchema(table)
  const selectSchema = createSelectSchema(table)
  type insertType = typeof table.$inferInsert
  type selectType = typeof table.$inferSelect

  const createSchema = insertSchema.omit({ id: true, created_at: true, updated_at: true })
  const updateSchema = createSchema.partial()

  const create = async (data: z.infer<typeof createSchema>) => {
    let r = createSchema.safeParse(data)
    if (!r.success) {
      r = r as SafeParseError<typeof createSchema>
      console.log(r)
      return r
    }
    return await db
      // @ts-ignore
      .insert(table)
      .values(data)
      .returning()
  }
  const update = async (data: z.infer<typeof updateSchema>) => {
    let r = createSchema.safeParse(data)
    if (!r.success) {
      r = r as SafeParseError<typeof createSchema>
      console.log(r)
      return r
    }
    return await db
      // @ts-ignore
      .insert(table)
      .values(data)
      .returning()
  }
  const _delete = async (id: string) => {
    return await db
      // @ts-ignore
      .delete(table)
      // @ts-ignore
      .where(eq(table.id, id))
  }

  return {
    create,
    update,
    delete: _delete,
    table,
    insertSchema,
    selectSchema,
  }
}
