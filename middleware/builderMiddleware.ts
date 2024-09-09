import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function builderMiddleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const id = url.searchParams.get('id')

  if (!id) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
