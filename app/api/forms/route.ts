import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  ConnectionOptions,
  ResultSetHeader,
  RowDataPacket
} from 'mysql2/promise'
import connection from '@/lib/db'

const formSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
})

export async function GET() {
  const db = await connection()

  try {
    const [rows] = await db.query<ResultSetHeader>('SELECT * FROM forms')

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
  } finally {
    db.end()
  }
}

export async function POST(request: NextRequest) {
  const db = await connection()

  try {
    const formData = await request.json()

    // Validate the form data using zod
    const parsedData = formSchema.parse(formData)
    const { name, description } = parsedData

    const [result] = await db.execute<ResultSetHeader>(
      'INSERT INTO forms (name, description) VALUES (?, ?)',
      [name, description]
    )

    return NextResponse.json({
      message: 'Form submitted successfully!',
      success: true,
      data: {
        id: result.insertId
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
  } finally {
    db.end()
  }
}
