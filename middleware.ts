import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Configura el matcher para las rutas que quieres que pasen por el middleware
export const config = {
  matcher: [
    '/(builder)/([*])', // It has to be checked if it is necesary to be here
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
