'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { CircleUser } from 'lucide-react' // This is showing error, please check with dependencies
import { SignedOut } from '@clerk/nextjs'

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
        <DropdownMenuItem className='hover:bg-gray-100'>
          <SignedOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
