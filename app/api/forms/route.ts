import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { formsTable, SelectForm, InsertForm } from '@/drizzle/schema'
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

const formSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
})

const drizzleDb = drizzle(sql)

export async function GET() {
  try {
    const rows = await drizzleDb.select().from(formsTable)

    console.log(rows)

    return NextResponse.json({
      message: 'Forms retrieved successfully!',
      success: true,
      data: rows
    })
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Error retrieving forms', details: (error as Error).message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate the form data using zod
    const parsedData = formSchema.parse(formData)
    const { name, description } = parsedData

    const [result] = await drizzleDb
      .insert(formsTable)
      .values({ name, description })
      .returning()

    console.log('-----------------')
    console.log(result)
    console.log('-----------------')

    return NextResponse.json({
      message: 'Form submitted successfully!',
      success: true,
      data: {
        id: result.id
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error submitting form', details: (error as Error).message },
      { status: 500 }
    )
  }
}
