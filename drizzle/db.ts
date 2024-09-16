import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from '@/drizzle/schema'

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
})

const drizzleDb = drizzle(poolConnection, { schema, mode: 'default' })

export { drizzleDb, poolConnection }
