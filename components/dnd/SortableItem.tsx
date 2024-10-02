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
      <div
        ref={setNodeRef}
        style={style}
        className='group relative flex-col mb-2 border border-gray-900 rounded-md bg-gray-900/10'
      >
        <div className='flex gap-4 p-5'>
          <div className='w-full'>
            <Label>{label}</Label>

            <ElementComponent
              elementInstance={FormElements[element.type].construct(id)}
            />
          </div>
        </div>

        <ElementAddedOverlay {...attributes} {...listeners} />
      </div>
    </>
  )
}

function ElementFormDragOverlay({ formElement }: { formElement: FormElement }) {
  const ElementComponent = formElement.formComponent
  const { label } = formElement.designerBtnElement

  return (
    <div className='flex-col mb-2 bg-gray-900/80 rounded-md'>
      <div className='flex gap-4 p-5'>
        <div className='w-full'>
          <Label>{label}</Label>

          <ElementComponent
            elementInstance={formElement.construct(formElement.type)}
          />
        </div>
      </div>
      <ElementAddedOverlay />
    </div>
  )
}

const ElementAddedOverlay = ({ ...props }) => {
  return (
    <div
      {...props}
      className={`absolute flex top-0 w-full h-full rounded-md items-center justify-center font-semibold text-transparent group-hover:bg-gray-900/80 group-hover:text-gray-400 group-hover:cursor-grab transition-colors duration-200`}
    >
      Click for properties or drag to move
    </div>
  )
}

export { SortableItem, ElementFormDragOverlay }
