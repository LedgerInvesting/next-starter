export type MenuItemType = {
  title: string
  href: string
  description?: string
}

export const items: MenuItemType[] = [
  {
    title: 'Page',
    description: 'Page description',
    href: '/page',
  },
  {
    title: 'Section',
    href: '/#section-id',
  },
  // ...
]
