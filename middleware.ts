import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { builderMiddleware } from '@/middleware/builderMiddleware'

export function middleware(request: NextRequest) {
  // Ejecuta los middleware en el orden deseado
  const builderResponse = builderMiddleware(request)
  if (builderResponse.status !== 200) {
    return builderResponse
  }

  // Si todos los middleware pasan, continúa con la solicitud
  return NextResponse.next()
}

// Configura el matcher para las rutas que quieres que pasen por el middleware
export const config = {
  matcher: '/builder'
}
