'use server'

import { signIn, signOut } from '@/auth'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error) {
      return 'Something went wrong.'
    }
    throw error
  }
}

export async function signOutSession() {
  await signOut({ redirectTo: '/login' })
}
