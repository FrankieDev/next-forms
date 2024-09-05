import { headers } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { forms } from '@/app/data/forms'

import { turso } from '@/drizzle/db'

export async function GET(request: NextRequest, response: NextResponse) {
  const headersList = headers()
  const referer = headersList.get('referer')

  const sites = await turso.execute('SELECT * FROM sites')

  const searchParams = request.nextUrl.searchParams
  const query = {
    name: searchParams.get('name'),
    email: searchParams.get('email'),
    path: request.nextUrl.pathname,
    forms: forms,
    sites: sites.rows
  }

  return Response.json(
    {
      message: 'Get all sites from the database',
      success: true,
      data: sites.rows
    },
    {
      status: 200,
      headers: { referer: referer ?? '' }
    }
  )
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get('name') ?? ''
  const url = formData.get('url') ?? ''

  await turso.execute({
    sql: 'INSERT INTO sites (name, url) VALUES (?, ?)',
    args: [name, url]
  })

  return Response.json({ name, url })
}
export async function HEAD(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}
