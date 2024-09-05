import React, {
  createContext,
  SetStateAction,
  Dispatch,
  ReactNode,
  useState
} from 'react'
import { FormElement, FormElementInstance } from '@/utils/types'

// Definir el tipo para el estado y las funciones que se compartirán a través del contexto
type DesignerContextType = {
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>
  elements: FormElementInstance[] // Reemplaza any con un tipo más específico según tus necesidades
  addElement: (element: FormElementInstance) => void // Reemplaza any con un tipo más específico
  removeElement: (elementId: string) => void
  selectedElement: FormElementInstance | null
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>
}

// Crear el contexto con un valor predeterminado
const DesignerContext = createContext<DesignerContextType | undefined>(
  undefined
)

// Crear un proveedor de contexto que envuelva a los hijos y proporcione el estado y las funciones
const DesignerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [elements, setElements] = useState<FormElementInstance[]>([]) // Reemplaza any con un tipo más específico
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null)

  const addElement = (element: FormElementInstance) => {
    setElements((prevElements) => [...prevElements, element])
  }

  const removeElement = (elementId: string) => {
    setElements((prevElements) =>
      prevElements.filter((element) => element.id !== elementId)
    )
  }

  return (
    <DesignerContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement
      }}
    >
      {children}
    </DesignerContext.Provider>
  )
}

export { DesignerProvider, DesignerContext }
