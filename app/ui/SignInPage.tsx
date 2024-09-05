import { redirect } from 'next/navigation'
import { signIn, auth, providerMap } from '@/auth'
import { AuthError } from 'next-auth'
import { ButtonGoogleProvider } from '@/components/ui/ButtonGoogleProvider'

export default async function SignInPage() {
  const SIGNIN_ERROR_URL = '/signin/error'
  return (
    <div className='flex flex-col gap-2'>
      {Object.values(providerMap).map((provider) => {
        if (provider.id == 'credentials') {
          return null
        }

        const SignInProvider = async () => {
          switch (provider.id) {
            case 'google':
              return <ButtonGoogleProvider />
            default:
              return <span>Sign in with {provider.name}</span>
          }
        }

        return (
          <form
            key={provider.id}
            action={async () => {
              'use server'
              try {
                await signIn(provider.id, { redirectTo: '/dashboard' })
              } catch (error) {
                // Signin can fail for a number of reasons, such as the user
                // not existing, or the user not having the correct role.
                // In some cases, you may want to redirect to a custom error
                if (error instanceof AuthError) {
                  return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                }

                // Otherwise if a redirects happens NextJS can handle it
                // so you can just re-thrown the error and let NextJS handle it.
                // Docs:
                // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                throw error
              }
            }}
            className='flex flex-col gap-2'
          >
            <button type='submit'>
              <SignInProvider />
            </button>
          </form>
        )
      })}
    </div>
  )
}
