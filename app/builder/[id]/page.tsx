'use client'
import React from 'react'
import Header from '@/app/ui/Header'
import FormBuilder from '@/components/builder/FormBuilder'
import { DesignerProvider } from '@/components/context/DesignerContext'

export default function page() {
  return (
    <DesignerProvider>
      <div className='w-full border-b-gray-900 p-4'>
        <div className='mb-7'>
          <h1 className='text-3xl font-medium py-5'>Form Builder x</h1>
        </div>
        <div className='grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
          <FormBuilder />
        </div>
      </div>
    </DesignerProvider>
  )
}
