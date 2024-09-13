import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { builderMiddleware } from '@/middleware/builderMiddleware'
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

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
  matcher: [
    '/builder',
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
