import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TitleFieldProps {
  title: string
  subtitle: string
  icon?: React.ComponentType<{
    className?: string
  }>
  className?: string
}

const TitleField: React.FC<TitleFieldProps> = (props) => {
  return (
    <Card className={`w-full rounded-sm ${props.className}`}>
      <CardContent className='flex items-center p-2'>
        <div className='p-1 border border-gray-150 bg-slate-100 text-center'>
          {props.icon && <props.icon className='h-6 w-6' />}
        </div>
        <div className='ml-2'>
          <h1 className='text-md font-medium'>{props.title}</h1>
          <p className='text-sm text-gray-500'>{props.subtitle}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TitleField
