import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer>
      <Container>
        <nav className="flex w-full items-center space-x-4 py-2">
          <Link href="#">
            <Button variant="link">Footer link</Button>
          </Link>
        </nav>
      </Container>
    </footer>
  )
}
