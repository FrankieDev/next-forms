import React from 'react'
import Link from 'next/link'
import { ModeToggle } from '@/components/DarkModeToggle'
import { CircleUser, Menu, Package2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import MenuAccount from '@/components/ui/MenuAccount'
import { clsx } from 'clsx'

interface Props {
  className?: string
}

const Header = ({ className = '' }) => {
  return (
    <header
      className={clsx(
        'sticky top-0 flex flex-row h-16 items-center gap-4 border-b border-b-gray-900 bg-white dark:bg-gray-950 px-4 md:px-6',
        className
      )}
    >
      <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <Link
          href='#'
          className='flex items-center gap-2 text-lg font-semibold md:text-base'
        >
          <Package2 className='h-6 w-6' />
          <span className='sr-only'>Acme Inc</span>
        </Link>
        <Link href='/' className='dark:text-gray-400 hover:dark:text-gray-300'>
          Dashboard
        </Link>
      </nav>
      <div className='flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <ModeToggle />
        <MenuAccount />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link
              href='#'
              className='flex items-center gap-2 text-lg font-semibold'
            >
              <Package2 className='h-6 w-6' />
              <span className='sr-only'>Acme Inc</span>
            </Link>
            <Link href='#' className='hover:text-foreground'>
              Dashboard
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-foreground'
            >
              Orders
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-foreground'
            >
              Products
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-foreground'
            >
              Customers
            </Link>
            <Link
              href='/builder'
              className='text-muted-foreground hover:text-foreground'
            >
              Builder
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default Header
