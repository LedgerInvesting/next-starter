export type MenuItemType = {
  title: string
  href: string
  description?: string
}

export const items: MenuItemType[] = [
  {
    title: 'Blog',
    description: 'We write about things',
    href: '/blog',
  },
  {
    title: 'Section',
    href: '/#section-id',
  },
  // ...
]
