import { RedirectToSignIn } from '@clerk/nextjs'

export default async function SignInPage() {
  return (
    <div className='flex flex-col gap-2'>
      <RedirectToSignIn />
    </div>
  )
}
