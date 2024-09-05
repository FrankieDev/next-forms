import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FormElement, FormElementInstance } from '@/utils/types'
import { FormElements } from '@/components/FormElements'
import { Button } from '@/components/ui/button'

interface SidebarFormElementItemProps {
  id: string
  element: FormElementInstance
  children?: React.ReactNode
  isDesignElement?: boolean
}

const SidebarFormElementItem: React.FC<SidebarFormElementItemProps> = ({
  id,
  element
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: `designer-btn-${element.type}`,
    data: {
      type: element.type,
      isDesignerBtnElement: true,
      element
    }
  })

  const btnDesigner = FormElements[element.type].designerBtnElement
  const { label, icon: Icon } = btnDesigner

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? '100' : 'auto',
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <>
      <div ref={setNodeRef} style={style} className='flex'>
        <Button
          type='button'
          {...attributes}
          {...listeners}
          className='w-full cursor-grab justify-start mb-4'
        >
          <Icon className='h-6 w-6 ' />
          <p className='ml-2'>{label}</p>
        </Button>
      </div>
    </>
  )
}

export function SidebarElementItemDragOverlay({
  formElement
}: {
  formElement: FormElement
}) {
  const { label, icon: Icon } = formElement.designerBtnElement

  return (
    <Button variant={'outline'} className='w-full cursor-grab justify-start'>
      <Icon className='h-6 w-6 text-gray-200' />
      <p className='ml-2'>{label}</p>
    </Button>
  )
}

export { SidebarFormElementItem }
