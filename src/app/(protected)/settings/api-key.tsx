'use client'

import { copyTextToClipboard } from '@/lib/utils'
import { ClipboardCopy } from 'lucide-react'

export default function APIKey({ secret }: { secret: string }) {
  return (
    <div
      className="hover:text-gray group flex cursor-pointer items-center space-x-1 rounded-sm border bg-gray-100 px-3 py-1 hover:bg-gray-200"
      onClick={() => copyTextToClipboard(secret)}
    >
      <span className="text-gray-500 group-hover:text-gray-600">
        {secret.slice(0, 3)}*************{secret.slice(-4)}
      </span>{' '}
      <ClipboardCopy className="ml-4 h-4 w-4 text-gray-600 group-hover:text-gray-700" />
    </div>
  )
}
