import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { SidebarFormElementItem } from '@/components/builder/SidebarFormElementItem'
import { FormElementInstance } from '@/utils/types'
import { v4 as uuid } from 'uuid'

const SidebarFormElements: React.FC = () => {
  const elementsDesigner: FormElementInstance[] = [
    {
      id: uuid(),
      type: 'TextField'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fields</CardTitle>
      </CardHeader>
      <CardContent className='flex'>
        <div className='w-full min-h-[300px]'>
          {elementsDesigner.map((element) => {
            return (
              <SidebarFormElementItem
                key={element.id}
                id={element.id}
                element={element}
              ></SidebarFormElementItem>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default SidebarFormElements
