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
    url: process.env.TURSO_DATABASE_URL,
    sites: sites.rows
  }

  return Response.json(
    {
      message: 'Hello, Next.js!',
      success: true,
      data: query
    },
    {
      status: 200,
      headers: { referer: referer ?? '' }
    }
  )
}

/*
export async function POST(request: Request) {
  const res = await request.json()
  return Response.json({ data: res, success: true }, { status: 201 })
}
  */

export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')

  return Response.json({ name, email })
}
export async function HEAD(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}
