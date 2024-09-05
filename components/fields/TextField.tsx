import React from 'react'
import { ElementsType, FormElement, FormElementInstance } from '@/utils/types'
import { Input } from '@/components/ui/input'
import { LuTextCursorInput } from 'react-icons/lu'

const type: ElementsType = 'TextField'

const extraAttributes = {
  label: 'Text field',
  helperText: 'Helper text',
  required: false,
  placeHolder: 'Value here...'
}

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes
  }),
  formComponent: FormComponent,
  designerComponent: DesignerComponent,
  designerBtnElement: {
    icon: LuTextCursorInput,
    label: 'Text Field'
  }
}

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

function FormComponent({
  elementInstance,
  isInvalid,
  defaultValue
}: {
  elementInstance: FormElementInstance
  isInvalid?: boolean
  defaultValue?: string
}) {
  const element = elementInstance as CustomInstance
  return (
    <div>
      <Input />
    </div>
  )
}

function DesignerComponent({
  elementInstance
}: {
  elementInstance: FormElementInstance
}) {
  const element = elementInstance as CustomInstance
  //const { label, required, placeHolder, helperText } = element.extraAttributes

  console.log(element)

  return <div>label: {extraAttributes.label}</div>
}
