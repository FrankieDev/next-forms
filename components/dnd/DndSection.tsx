import React, { useId, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay
} from '@dnd-kit/core'

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { SortableItem } from '@/components/dnd/SortableItem'

import { Droppable } from '@/components/dnd/Droppable'
import { Draggable } from '@/components/dnd/Draggable'

import { v4 as uuid } from 'uuid'
import TitleField from '@/components/elements/TitleField'
import SubtitleField from '@/components/elements/SubtitleField'

interface DndSectionProps {
  id: string
  type: string
}

function DndSection() {
  const [items] = useState(['1', '2', '3'])
  const [currentType, setCurrentType] = useState('')

  const elements: DndSectionProps[] = [
    {
      id: 'title-field',
      type: 'TitleField'
    },
    {
      id: 'subtitle-field',
      type: 'SubtitleField'
    }
  ]
  const [elementsInForm, setElementsInForm] = useState<DndSectionProps[]>([])

  const dndContextId = useId()

  return (
    <DndContext
      id={dndContextId}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className='bg-slate-100 w-full min-h-[300px]'>
        <h2 className='text-2xl font-medium'>Elements</h2>
        {elements.map((element) => {
          return (
            <SortableItem
              key={element.id}
              id={`${element.id}`}
              element={element}
            >
              {element.type === 'TitleField' && <TitleField />}
              {element.type === 'SubtitleField' && <SubtitleField />}
            </SortableItem>
          )
        })}
      </div>

      <SortableContext items={elementsInForm}>
        <Droppable id='form-builder'>
          <div className='bg-slate-100 w-full min-h-[300px]'>
            <h2 className='text-2xl font-medium'>Form</h2>
            {elementsInForm.map((element) => {
              return (
                <SortableItem
                  key={element.id}
                  id={`${element.id}`}
                  element={element}
                  isDesignElement={false}
                >
                  {element.type === 'TitleField' && <TitleField />}
                  {element.type === 'SubtitleField' && <SubtitleField />}
                </SortableItem>
              )
            })}
          </div>
        </Droppable>
      </SortableContext>
      <DragOverlay dropAnimation={null}>
        <TitleField className=' font-light text-orange-500' />
      </DragOverlay>
    </DndContext>
  )

  function handleDragStart(event: DragStartEvent) {
    const { active } = event

    console.log('event: DragStartEvent', active)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && over.id === 'form-builder') {
      const element = elements.find((element) => element.id === active.id)

      if (element !== undefined) {
        const newId = uuid()
        element.id = newId

        setElementsInForm([...elementsInForm, element])
      }
    }
    if (active.id !== over?.id) {
      const oldIndex = elementsInForm.findIndex((item) => item.id === active.id)
      const newIndex = elementsInForm.findIndex((item) => item.id === over?.id)

      setElementsInForm((item) => {
        return arrayMove(item, oldIndex, newIndex)
      })
    }
  }
}

export default DndSection
