// We should just let this file empty, please checkout with TL
import {
  AuthenticateWithRedirectCallback,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'

const auth = AuthenticateWithRedirectCallback
const handlers = ''
const signIn = SignedIn
const signOut = SignedOut

export { auth, handlers, signIn, signOut }
