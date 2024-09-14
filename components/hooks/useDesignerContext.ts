import { useContext } from 'react'
import { DesignerContext } from '@/components/context/DesignerContext'

function useDesignerContext() {
  const context = useContext(DesignerContext)

  if (context === undefined) {
    throw new Error('useDesignerContext must be used within a DesignerProvider')
  }

  return context
}

export default useDesignerContext
