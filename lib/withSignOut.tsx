'use client'
import React from 'react'

// Step 1: Define Prop Types
interface WithSignOutProps {
  onSignOut: (params: object) => void // Define additional props as needed
}

// Creating a generic type for component props to ensure type safety
function withSignOut<T>(
  WrappedComponent: React.ComponentType<T & WithSignOutProps>
) {
  // The HOC itself is a functional component
  const WithSignOut: React.FC<T & WithSignOutProps> = (props) => {
    const handleSignOut = (): void => {
      console.log('Signing out...')
      props.onSignOut({ callbackUrl: '/login' })
      // Implement your sign-out logic here
    }

    // Step 3: Pass Props to the Wrapped Component
    return <WrappedComponent {...(props as T)} onSignOut={handleSignOut} />
  }

  return WithSignOut
}

export default withSignOut
