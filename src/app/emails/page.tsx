import { getEmails } from '@/lib/get-emails'
import Home from './home'

export default async function Page() {
    const { emails } = await getEmails()
    return <Home navItems={emails} />
}
