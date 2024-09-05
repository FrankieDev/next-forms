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
import { Payment, columns } from './columns'
import { DataTable } from './data-table'
import { useEffect, useState } from 'react'

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'draft',
      email: 'm@example.com',
      date: '2021-09-01'
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
      date: '2021-09-01'
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
      date: '2021-09-01'
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'draft',
      email: 'm@example.com',
      date: '2021-09-01'
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
      date: '2021-09-01'
    }
  ]
}

export default function Home() {
  const [data, setData] = useState<Payment[]>([])
  console.log('Hello, world!')
  //const turso_url = process.env.TURSO_DATABASE_URL

  useEffect(() => {
    const dataResult = async () => {
      const data = await getData().then((data) => {
        setData(data)
      })
    }

    dataResult()
  }, [])

  // Define other routes and logic
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1 className='text-4xl font-bold mb-8'>Dashboard</h1>

      <div className='container flex gap-5 mb-10'>
        <Card className='basis-1/4 bg-violet-50'></Card>
      </div>

      <div className='container flex gap-5 mb-10'>
        <Card className='basis-1/4 bg-violet-50'>
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
        <Card className='basis-1/4 bg-red-50'>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
        <Card className='basis-1/4 bg-blue-50'>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
        <Card className='basis-1/4 bg-green-50'>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
      </div>
      <div className='container'>
        <Button variant='outline' className='mb-4'>
          Create new form
        </Button>
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  )
}
