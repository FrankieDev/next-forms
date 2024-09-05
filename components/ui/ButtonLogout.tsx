'use client'
import { signOut } from 'next-auth/react'

const ButtonLogout = () => {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: '/login'
        })
      }
      className='bg-red-300'
    >
      Cerrar Sesión
    </button>
  )
}

export default ButtonLogout
