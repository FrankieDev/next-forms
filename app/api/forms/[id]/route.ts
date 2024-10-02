import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { formsTable, Form, FormInsert } from '@/drizzle/schema'
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { eq } from 'drizzle-orm'

const formSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
})

const drizzleDb = drizzle(sql)

type Params = {
  id: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
  //validate the id
  if (!context.params.id) {
    return NextResponse.json({ error: 'Form ID is required' }, { status: 400 })
  }

  //validate if the id is a number
  if (isNaN(parseInt(context.params.id))) {
    return NextResponse.json(
      { error: 'Form ID must be a number' },
      { status: 400 }
    )
  }

  const formId = parseInt(context.params.id)

  try {
    const row = await drizzleDb
      .select()
      .from(formsTable)
      .where(eq(formsTable.id, formId))
      .orderBy(formsTable.id)

    return NextResponse.json(row[0])
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Error retrieving forms', details: (error as Error).message },
      { status: 500 }
    )
  }
}
