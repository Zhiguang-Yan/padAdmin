import type { FormItemRule } from 'element-plus'
import { CSSProperties } from 'vue'

type FormTy =
  | 'cascader'
  | 'checkbox'
  | 'checkbox-group'
  | 'checkbox-button'
  | 'color-picker'
  | 'date-picker'
  | 'input'
  | 'input-number'
  | 'radio'
  | 'radio-group'
  | 'radio-button'
  | 'rate'
  | 'select'
  | 'option'
  | 'slider'
  | 'switch'
  | 'time-picker'
  | 'time-select'
  | 'transfer'
  | 'upload'

export interface FormOption<T = any> {
  type: FormTy
  value: T
  label?: string
  prop?: string
  placeholder?: string
  rules?: FormItemRule[]
  attrs?: {
    [prop: string]: any
    clearable?: boolean
    showPassword?: boolean
    disabled?: boolean
    filterable?: boolean
    style?: CSSProperties
  }
  children?: FormOptions
}

export type FormOptions = FormOption[]

export interface Ilayout {
  [prop: string]: number
}
