'use client'
import React, { useId, useState } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'

import useDesignerContext from '@/components/hooks/useDesignerContext'
import SidebarFormElements from '@/components/builder/SidebarFormElements'
import DesignerWrapper from '@/components/builder/DesignerWrapper'
import DragOverlayWrapper from '@/components/builder/DragOverlayWrapper'
import dynamic from 'next/dynamic'
import { useFetch } from '@/hooks/useFetch'
import { Form } from '@/drizzle/schema'
import { useParams } from 'next/navigation'

const DinamicReactJson = dynamic(
  // Utiliza una función anónima que retorna una promesa con el componente importado.
  () => import('../JsonViewer'),
  // Establece la opción 'ssr' en 'false' para deshabilitar el pre-renderizado en el lado del servidor.
  { ssr: false }
)

function FormBuilder() {
  const params = useParams<{ id: string }>()

  const { elements } = useDesignerContext()
  const dndContextId = useId()

  const { data, isLoading, error, refetch } = useFetch<Form>(
    `http://localhost:3000/api/forms/${params.id}`
  )

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 0
    }
  })
  const sensors = useSensors(pointerSensor)

  return (
    <DndContext id={dndContextId}>
      <div>
        <h1 className='text-2xl font-bold'>Formulario: {data?.name}</h1>
        <p>{data?.description}</p>
      </div>
      <div className='grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
        <DndContext sensors={sensors}>
          <SidebarFormElements />
          <DesignerWrapper />
          <DragOverlayWrapper />
          <DinamicReactJson jsonData={elements} />
        </DndContext>
      </div>
    </DndContext>
  )
}

export default FormBuilder
