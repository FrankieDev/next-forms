import LoginUI from '@/app/ui/LoginPage'
import { SignInButton, SignedOut } from '@clerk/nextjs'

export default function LoginPage() {
  return (
    <main className='flex items-center justify-center md:h-screen'>
      <div className='relative mx-auto flex flex-col space-y-2.5 p-4 md:-mt-32'>
        <div className='flex h-20 items-end rounded-lg bg-blue-500 p-3 md:h-36'>
          <div className='text-white md:w-36'>Logo</div>
        </div>
        <LoginUI />
        <SignedOut>
          <SignInButton />
        </SignedOut>

        {/** 
        <LoginForm />
        <SingInPage />
        */}
      </div>
    </main>
  )
}
