import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import type { Provider } from 'next-auth/providers'

const providers: Provider[] = [
  Credentials({
    // The name to display on the sign in form (e.g. "Sign in with...")

    name: 'Credentials',

    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
      password: { label: 'Password', type: 'password' }
    },

    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' }

      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
  })
]

export const authOptions = {
  providers: providers,
  secret: process.env.AUTH_SECRET || 'teOjAdpwlt1rNQAb5qdF/yvTmZp/N5OwIugtnpiqSc8=',
  callbacks: {
    async signIn(params: Object) {
      /*
      console.log(params.user)
      console.log(params.account)
      console.log(params.profile)
      console.log(params.email)
      console.log(params.credentials)
      */

      return true
    },
    async session({ session, token }) {
      //console.log('session', session)
      //console.log('token', token)
      session.user.userId = token.id
      session.user.accessToken = token.accessToken
      return session
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Allows relative callback URLs

      //console.log('URL: ', url)
      //console.log('BASE URL: ', baseUrl)
      if (url.startsWith('/')) return `${baseUrl}${url}`

      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url

      return baseUrl
    }
    /*
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    }
      */
  }
}

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider()
    //console.log(providerData)

    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions)
