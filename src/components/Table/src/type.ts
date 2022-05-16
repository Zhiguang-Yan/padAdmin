interface IInput {
  label: string
  type: 'input' | 'select' | 'year' | 'daterange' | 'datetimerange' | 'cascader'
  prop: string
  placeholder?: string
}

interface ISelect extends IInput {
  options?: { label: string; value: string | number }[]
}

interface IDate extends IInput {
  startPlaceholder?: string
  endPlaceholder?: string
  startProp?: string
  endProp?: string
  valueFormat?: string
  format?: string
}

interface ICascader extends IInput {
  attrs?: any
}

export type FromItemTy = IInput & ISelect & IDate & ICascader
