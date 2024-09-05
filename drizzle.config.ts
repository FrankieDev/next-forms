import type { Config } from 'drizzle-kit'

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: 'libsql://forms-app-franciscoaquino19.turso.io',
    authToken:
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjE0MDk5MTUsImlkIjoiOGRmYjhlMDUtZjE4NC00N2RjLWI4MWQtZWQ3NmVhOTM1OTkyIn0.qFRS0_NnTRn3celIgHQoO4sMKOpz27D0y7UKUnvTlzhUZOvPu2a4Wwg0xEJ7kiBaA1L72b9Sqsz5jaJFhIq2Cw'
  }
} satisfies Config
