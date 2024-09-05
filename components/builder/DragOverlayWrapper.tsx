import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { SidebarElementItemDragOverlay } from '@/components/builder/SidebarFormElementItem'
import { ElementFormDragOverlay } from '@/components/dnd/SortableItem'
import { ElementsType } from '@/utils/types'
import { FormElements } from '@/components/FormElements'

function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active)
    },
    onDragCancel: () => {
      setDraggedItem(null)
    },
    onDragEnd: () => {
      setDraggedItem(null)
    }
  })

  if (!draggedItem) return null

  let node = <div>No drag overlay</div>
  const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement

  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType
    node = <SidebarElementItemDragOverlay formElement={FormElements[type]} />
  }

  if (!isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType
    node = <ElementFormDragOverlay formElement={FormElements[type]} />
  }

  return <DragOverlay>{node}</DragOverlay>
}

export default DragOverlayWrapper
