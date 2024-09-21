import React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`min-h-screen bg-background font-sans ${fontSans.variable}`}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <header>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
            <main>
              <div className='flex min-h-screen w-full flex-col'>
                {children}
              </div>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
