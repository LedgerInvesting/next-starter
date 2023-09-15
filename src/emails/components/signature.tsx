import { siteConfig } from '@/config/site'
import { getSelfURL } from '@/lib/utils'
import { Img, Link } from '@react-email/components'

const baseURL = getSelfURL()
export default function Signature() {
    return (
        <Link
            href={baseURL}
            className="flex items-center space-x-2"
            target="_blank"
        >
            <Img
                src={`${baseURL}/logo.png`}
                width={32}
                height={32}
                style={{
                    WebkitFilter: 'grayscale(100%)',
                    filter: 'grayscale(100%)',
                    margin: '20px 0',
                }}
            />
            <div className="ml-2">
                <div className="font-bold text-black">{siteConfig.company}</div>
                <div className="text-xs font-light text-slate-600">
                    {siteConfig.description}
                </div>
            </div>
        </Link>
    )
}
