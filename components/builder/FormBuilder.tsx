import React, { useId, useState } from 'react'
import { DndContext } from '@dnd-kit/core'

import useDesignerContext from '@/components/hooks/useDesignerContext'
import SidebarFormElements from '@/components/builder/SidebarFormElements'
import DesignerWrapper from '@/components/builder/DesignerWrapper'
import DragOverlayWrapper from '@/components/builder/DragOverlayWrapper'
import dynamic from 'next/dynamic'

const DinamicReactJson = dynamic(
  // Utiliza una función anónima que retorna una promesa con el componente importado.
  () => import('../JsonViewer'),
  // Establece la opción 'ssr' en 'false' para deshabilitar el pre-renderizado en el lado del servidor.
  { ssr: false }
)

function FormBuilder() {
  const { elements } = useDesignerContext()
  const dndContextId = useId()

  return (
    <DndContext id={dndContextId}>
      <SidebarFormElements />
      <DesignerWrapper />
      <DragOverlayWrapper />
      <DinamicReactJson jsonData={elements} />
      <h1>Titulo Hora saai as as ps as a</h1>
    </DndContext>
  )
}

export default FormBuilder
