export interface ListItem {
  avatar?: string
  title?: string
  desc?: string
  time?: string
  tag?: string
  tagType?: '' | 'success' | 'warning' | 'danger' | 'info'
  isRead?: boolean
}

enum TagType {
  '',
  'success',
  'warning',
  'info',
  'danger',
}

export type ListOptions = {
  title: string
  count?: number
  content: ListItem[]
}

export interface ActionOptions {
  text: string
  icon?: string
}
