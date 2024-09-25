import React from 'react'
import Header from '@/app/ui/Header'
import FormBuilder from '@/components/builder/FormBuilder'
import { DesignerProvider } from '@/components/context/DesignerContext'

export default function page() {
  return (
    <DesignerProvider>
      <div className='w-full border-b-gray-900 p-4'>
        <div className='mb-7'>
          <h1 className='text-3xl font-medium py-5'>Form Builder</h1>
        </div>
        <FormBuilder />
      </div>
    </DesignerProvider>
  )
}
