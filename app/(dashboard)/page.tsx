'use client'
import Image from 'next/image'
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
import Header from '../ui/Header'
import NewForm from './components/NewForm'
import { BiDesktop } from 'react-icons/bi'

import type { Form } from '@/lib/definitions'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

async function getData(): Promise<Form[]> {
  // Fetch data from your API here.
  const dataResult = await fetch('/api/forms').then((result) => {
    return result.json()
  })

  console.log(dataResult.data)
  return dataResult.data
}

export default function Home() {
  const [forms, setForms] = useState<Form[]>([])
  const [openNewForm, setOpenNewForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const dataResult = async () => {
      await getData().then((result) => {
        setForms(result)
        setLoading(false)
      })
    }

    dataResult()
  }, [])

  // Define other routes and logic
  return (
    <div>
      <Header />
      <main className='flex min-h-screen flex-col items-center p-24'>
        <div className='container flex gap-5 mb-10'>
          <Card className='basis-1/4 bg-violet-50 flex flex-col justify-between'>
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
          <Card className='basis-1/4 bg-red-50 flex flex-col justify-between'>
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
          <Card className='basis-1/4 bg-blue-50 flex flex-col justify-between'>
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
          <Card className='basis-1/4 bg-green-50flex flex-col justify-between'>
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
          <h2 className='text-3xl text-slate-700 font-bold mb-4'>
            Formularios
          </h2>
          <hr className='mb-8' />
          <NewForm open={openNewForm} />
          {loading ? (
            <SkeletonTheme baseColor='#E5E7EB' highlightColor='#F3F4F6'>
              <Skeleton count={10} />
            </SkeletonTheme>
          ) : (
            <>
              {forms.length > 0 ? (
                <DataTable columns={columns} data={forms} />
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
      </main>
    </div>
  )
}
