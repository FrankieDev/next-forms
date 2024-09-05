import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { LuGripVertical } from 'react-icons/lu'
import { FormElement, FormElementInstance } from '@/utils/types'
import { FormElements } from '@/components/FormElements'
import { Label } from '@/components/ui/label'
import useDesignerContext from '@/components/hooks/useDesignerContext'

interface SortableItemProps {
  id: string
  element: FormElementInstance
}

const SortableItem: React.FC<SortableItemProps> = ({ id, element }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    items,
    data
  } = useSortable({
    id: id,
    data: {
      type: element.type,
      element: element,
      isDesignerBtnElement: false
    }
  })

  const { elements, addElement, selectedElement, setElements } =
    useDesignerContext()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? '100' : 'auto',
    opacity: isDragging ? 0.5 : 1
  }

  const ElementComponent = FormElements[element.type].formComponent
  const { label, icon: Icon } = FormElements[element.type].designerBtnElement

  return (
    <>
      <div ref={setNodeRef} style={style} className='flex-col mb-4'>
        <Label>{label}</Label>
        <div className='flex gap-4'>
          <div className='w-full'>
            <ElementComponent
              elementInstance={FormElements[element.type].construct(id)}
            />
          </div>

          <button
            type='button'
            {...attributes}
            {...listeners}
            className='border border-gray-300 rounded-md p-1 cursor-grab'
          >
            <LuGripVertical className='h-6 w-6 text-gray-500' />
          </button>
        </div>
      </div>
    </>
  )
}

function ElementFormDragOverlay({ formElement }: { formElement: FormElement }) {
  const ElementComponent = formElement.formComponent
  const { label } = formElement.designerBtnElement

  return (
    <div className='flex-col mb-4 bg-gray-100/55 p-4 rounded-md'>
      <Label>{label}</Label>
      <div className='flex gap-4'>
        <div className='w-full'>
          <ElementComponent
            elementInstance={formElement.construct(formElement.type)}
          />
        </div>
      </div>
    </div>
  )
}

export { SortableItem, ElementFormDragOverlay }
