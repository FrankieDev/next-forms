import { TextFieldFormElement } from './fields/TextField'

import {
  ElementsType,
  FormElementInstance,
  FormElement,
  FormElementsType
} from '@/utils/types'

export type SubmitFunction = (key: string, value: string) => void

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement
  //TitleField: TitleFieldFormElement,
  //SubTitleField: SubTitleFieldFormElement
}
