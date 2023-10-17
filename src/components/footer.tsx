import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="z-50 flex h-16 items-center border-t border-gray-200 bg-white">
      <Container>
        <nav className="flex w-full items-center space-x-4">
          <Link href="#">
            <Button variant="link">Footer link</Button>
          </Link>
        </nav>
      </Container>
    </footer>
  )
}
