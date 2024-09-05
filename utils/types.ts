export interface FormElementSelector {
  id: number
  label: string
  type: ElementsType
  inputType?: string
  tag?: string
}

export type ElementsType = 'TextField'

/*
  | 'TitleField'
  | 'SubTitleField'
  | 'ParagraphField'
  | 'SeparatorField'
  | 'SpacerField'
  | 'NumberField'
  | 'TextAreaField'
  | 'DateField'
  | 'SelectField'
  | 'CheckboxField'
  */

export type FormElement = {
  type: ElementsType
  construct: (id: string) => FormElementInstance
  formComponent: React.FC<{
    elementInstance: FormElementInstance
    isInvalid?: boolean
    defaultValue?: string
  }>
  designerComponent: React.FC<{
    elementInstance: FormElementInstance
  }>
  designerBtnElement: {
    icon: React.ElementType
    label: string
  }

  /*
  construct: (id: string) => FormElementInstance

  

  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance
  }>

  validate: (formElement: FormElementInstance, currentValue: string) => boolean*/
}

export type FormElementInstance = {
  id: string
  type: ElementsType
  extraAttributes?: Record<string, any>
}

export type FormElementsType = {
  [key in ElementsType]: FormElement
}
