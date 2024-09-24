import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Form } from '@/drizzle/schema'
import Link from 'next/link'

const FormCard: React.FC<Form> = ({ id, name, description }) => {
  const colorStatus = id % 2 === 0 ? 'secondary' : 'destructive'

  return (
    <Card className='dark:bg-gray-950'>
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle>{name}</CardTitle>
          <Badge variant={colorStatus}>Draft</Badge>
        </div>

        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <label htmlFor=''>xxxx</label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant={'outline'} asChild>
          <Link href={`/builder/${id}`}>Editar</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default FormCard
