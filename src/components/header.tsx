'use client'

import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserIcon } from 'lucide-react'
import { type User } from 'next-auth'
import { items } from '@/components/menu-items'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { redirect } from 'next/navigation'
import clsx from 'clsx'
import { useState } from 'react'

export function Header({ user }: { user?: User }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="z-50 flex h-16 items-center border-b border-gray-200 bg-white">
      <Container>
        <nav className="flex w-full items-center space-x-4">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" className="dark:invert" width={24} height={24} priority />
          </Link>
          {items.map((i) => (
            <Link href={i.href} key={i.href}>
              <Button variant="link">{i.title}</Button>
            </Link>
          ))}
          <div className="flex-grow" />
          {!user ? (
            <>
              <Link href="/signin">
                <Button variant="link">Sign in</Button>
              </Link>
            </>
          ) : (
            <>
              <DropdownMenu onOpenChange={setOpen}>
                <DropdownMenuTrigger
                  className={clsx(
                    `focus:ring-none rounded-full outline-none`,
                    open ? 'ring-2' : 'ring-none',
                    `ring-primary-700 ring-offset-2 transition-all hover:ring-2 active:ring-2`,
                  )}
                >
                  <Avatar>
                    <AvatarImage src={user?.image} />
                    <AvatarFallback>
                      <UserIcon className="h-5" />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="text-sm">
                    <div className="font-light">Signed in as</div>
                    <div className="font-semibold">{user?.email || user?.name}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={'/settings'}>
                    <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      signOut()
                      redirect('/')
                    }}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </nav>
      </Container>
    </header>
  )
}
