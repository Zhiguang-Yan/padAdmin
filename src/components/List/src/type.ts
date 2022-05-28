export interface ListItem {
  avatar?: string
  title?: string
  desc?: string
  time?: string
  tag?: string
  tagType?: '' | 'success' | 'warning' | 'danger' | 'info'
  isRead?: boolean
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
