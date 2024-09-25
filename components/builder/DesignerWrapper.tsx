import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SortableContext } from '@dnd-kit/sortable'
import { Droppable } from '@/components/dnd/Droppable'
import { SortableItem } from '@/components/dnd/SortableItem'
import { FormElements } from '@/components/FormElements'
import useDesignerContext from '@/components/hooks/useDesignerContext'
import { useDndMonitor } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { v4 as uuid } from 'uuid'

const DesignerWrapper: React.FC = () => {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    setElements
  } = useDesignerContext()

  useDndMonitor({
    onDragStart(event) {
      const { active } = event
      setSelectedElement(active.data.current?.element)
    },
    onDragEnd(event) {
      const { active, over } = event
      const data = active.data.current

      if (over && over?.id === 'form-builder' && selectedElement) {
        const newId = uuid()
        const newFormElement =
          FormElements[selectedElement.type].construct(newId)

        if (newFormElement !== undefined) {
          addElement(newFormElement)
        }
      }

      if (!data?.isDesignerBtnElement) {
        const oldIndex = elements.findIndex((item) => item.id === active.id)
        const newIndex = elements.findIndex((item) => item.id === over?.id)

        setElements(() => arrayMove(elements, oldIndex, newIndex))
      }
    },
    onDragCancel(event) {}
  })

  return (
    <Card className='lg:col-span-2'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Diseño del Formulario</CardTitle>
          <CardDescription>
            Mueve aquí los elementos para construir tu formulario
          </CardDescription>
        </div>
        <Button asChild size='sm' className='ml-auto gap-1'>
          <Link href='#'>
            Previsualizar
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <SortableContext items={elements}>
          <Droppable id='form-builder'>
            <div className='w-full min-h-[500px]'>
              {elements.map((element) => {
                //console.log('element: ', element)
                return (
                  <SortableItem
                    key={element.id}
                    id={`${element.id}`}
                    element={element}
                  ></SortableItem>
                )
              })}
            </div>
          </Droppable>
        </SortableContext>
      </CardContent>
    </Card>
  )
}

export default DesignerWrapper
