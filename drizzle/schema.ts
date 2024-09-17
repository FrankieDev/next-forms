import { sql } from 'drizzle-orm'
import {
  text,
  serial,
  timestamp,
  varchar,
  index,
  pgTable
} from 'drizzle-orm/pg-core'

export const formsTable = pgTable(
  'forms',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow()
  },
  (t) => {
    return {
      nameIdx: index('name_idx').on(t.name)
    }
  }
)

export type SelectForm = typeof formsTable.$inferSelect
export type InsertForm = typeof formsTable.$inferInsert
