import { sql } from 'drizzle-orm'
import {
  text,
  int,
  datetime,
  varchar,
  mysqlTable,
  mysqlSchema,
  index
} from 'drizzle-orm/mysql-core'

export const formsTable = mysqlTable(
  'forms',
  {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),
    createdAt: datetime('created_at').default(sql`current_timestamp`),
    updatedAt: datetime('updated_at').default(sql`current_timestamp`)
  },
  (formsTable) => {
    return {
      nameIdx: index('name_idx').on(formsTable.name)
    }
  }
)

export type SelectForm = typeof formsTable.$inferSelect
export type InsertForm = typeof formsTable.$inferInsert
