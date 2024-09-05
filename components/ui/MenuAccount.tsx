'use client'
import React, { Component, ComponentType } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { CircleUser } from 'lucide-react'

import { signOut } from 'next-auth/react'
import withSignOut from '@/lib/withSignOut'
import { Half1Icon } from '@radix-ui/react-icons'

interface SignOutButtonProps {
  className?: string
  onSignOut: () => void
}

const SignOutButton: React.FC<SignOutButtonProps> = ({
  onSignOut,
  className
}) => (
  <DropdownMenuItem className={className} onClick={onSignOut}>
    Sign Out
  </DropdownMenuItem>
)

const DropdownMenuItemSignOutButton = withSignOut(SignOutButton)

export default function MenuAccount() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' size='icon' className='rounded-full'>
          <CircleUser className='h-5 w-5' />
          <span className='sr-only'>Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='bg-white'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-gray-100' />
        <DropdownMenuItem className='hover:bg-gray-100'>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className='hover:bg-gray-100'>
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator className='bg-gray-100' />
        <DropdownMenuItemSignOutButton
          className='hover:bg-gray-100'
          onSignOut={signOut}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
