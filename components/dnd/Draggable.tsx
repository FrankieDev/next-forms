'use client'
import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface DraggableProps {
  children: React.ReactNode
  id?: string
  element?: Object
}
export function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id || 'draggable',
      data: props.element
    })
  const style = {
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? '100' : 'auto',
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={isDragging ? 'bg-slate-500' : 'bg-slate-900'}
    >
      {props.children}
    </div>
  )
}
