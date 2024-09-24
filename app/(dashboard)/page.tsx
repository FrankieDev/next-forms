'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { columns } from './columns'
import { DataTable } from './data-table'
import { useEffect, useState } from 'react'
import NewForm from './components/NewForm'
import { BiDesktop } from 'react-icons/bi'

//import type { Form } from '@/lib/definitions'
import { Form } from '@/drizzle/schema'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import FormCard from '@/components/FormCard'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
  const [forms, setForms] = useState<Form[]>([])
  const [openNewForm, setOpenNewForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getForms()
  }, [])

  const getForms = async () => {
    await fetch('/api/forms')
      .then((result) => {
        if (!result.ok) throw new Error('Error fetching forms')

        return result.json()
      })
      .then((result) => {
        setForms(result.data)
        setLoading(false)
      })
  }

  // Define other routes and logic
  return (
    <div>
      <div className='container grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 mb-10'>
        <Card className='bg-violet-50 dark:bg-gray-900'>
          <CardHeader>
            <CardTitle>Total visits</CardTitle>
            <CardDescription>All time form visits</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-xl'>
              <span className='font-semibold'>1900</span>
            </p>
          </CardContent>
        </Card>
        <Card className=' bg-red-50 dark:bg-gray-900'>
          <CardHeader>
            <CardTitle>Total submissions</CardTitle>
            <CardDescription>All time form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-xl'>
              <span className='font-semibold'>1900</span>
            </p>
          </CardContent>
        </Card>
        <Card className=' bg-blue-50 dark:bg-gray-900'>
          <CardHeader>
            <CardTitle>Submission rate</CardTitle>
            <CardDescription>
              Visits that result in form submission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-xl'>
              <span className='font-semibold'>1900</span>
            </p>
          </CardContent>
        </Card>
        <Card className='bg-green-50 dark:bg-gray-900'>
          <CardHeader>
            <CardTitle>Bounce rate</CardTitle>
            <CardDescription>
              Visits that leaves without interacting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-xl'>
              <span className='font-semibold'>1900</span>
            </p>
          </CardContent>
        </Card>
      </div>
      <div className='container'>
        <h2 className='text-3xl text-slate-700 font-bold mb-4'>Formularios</h2>
        <hr className='mb-8' />
        <NewForm open={openNewForm} />
        {loading ? (
          <SkeletonTheme baseColor='#E5E7EB' highlightColor='#F3F4F6'>
            <Skeleton count={10} />
          </SkeletonTheme>
        ) : (
          <>
            {forms.length > 0 ? (
              <>
                {/*<DataTable columns={columns} data={forms} /> */}
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                  {forms.map((form) => (
                    <FormCard key={form.id} {...form}></FormCard>
                  ))}
                </div>
              </>
            ) : (
              <div className='flex flex-col border border-slate-300 border-dotted rounded items-center p-8 mb-4'>
                <div className='bg-slate-200 p-4 mb-4 rounded'>
                  <BiDesktop className='text-slate-600 text-2xl' />
                </div>

                <h2 className='text-xl font-bold text-slate-700'>
                  No tienes formularios creados
                </h2>
                <p className='text-lg font-semibold text-slate-700 mb-4'>
                  Crea un formulario para comenzar a recibir información.
                </p>
                <NewForm open={openNewForm} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
