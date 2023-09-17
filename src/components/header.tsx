'use client'

import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserIcon } from 'lucide-react'
import { type User } from 'next-auth'

export function Header({ user }: { user: Omit<User, 'id'> }) {
  return (
    <header>
      <Container>
        <nav className="flex w-full items-center space-x-4 py-2">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              className="dark:invert"
              width={24}
              height={24}
              priority
            />
          </Link>
          <div className="flex-grow" />
          {!user ? (
            <>
              <Link href="/signin">
                <Button variant="link">Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button variant="link">Sign up</Button>
              </Link>
            </>
          ) : (
            <>
              <Button variant="link" onClick={() => signOut()}>
                Sign out
              </Button>
              <Avatar>
                <AvatarImage src={user?.image} />
                <AvatarFallback>
                  <UserIcon className="h-5" />
                </AvatarFallback>
              </Avatar>
            </>
          )}
        </nav>
      </Container>
    </header>
  )
}
