import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SubtitleField({ className }: { className?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={`text-center ${className}`}>
          Subtitle field
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className='font-medium text-center text-4xl'>H2</h2>
      </CardContent>
    </Card>
  )
}
