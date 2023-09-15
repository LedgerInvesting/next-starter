import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { ScrollArea } from "@/components/ui/scroll-area"

type Props = {
  headings: {
    level: number
    text: string
    slug: string
  }[]
  backLinkHref?: string
  backLinkText?: string
}
export const TableOfContent  = ({ headings, backLinkHref, backLinkText}: Props)  => {
  return (
      <nav>
        {backLinkHref && backLinkText && (<Link
              href={backLinkHref}
              className="-ml-6 mb-6 inline-flex text-sm font-medium text-slate-900"
          >
              <Button variant="link">
                  <ChevronLeftIcon className="ml-1 mr-2 h-5" /> {backLinkText}
              </Button>
          </Link>)}


          {headings?.length > 0 && (
              <>
                  <div className="mb-4 text-xs font-bold uppercase">
                      In this page
                  </div>
                  {/* TODO: change scroll track style and back to top button */}
                  {/* scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-900 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-900 scrollbar-track:!rounded  */}
                  <ScrollArea className="h-[calc(100vh-12.75rem)]">
                      <div className="flex flex-col space-y-3 pb-[8rem] text-sm">
                          {(() => {
                              let padding = 0
                              return headings.map((heading, index) => {
                                  const isFirst = index === 0
                                  if (!isFirst) {
                                      // TODO: find min level first then properly calculate padding
                                      const prev = headings[index - 1]
                                      padding =
                                          padding +
                                          1 * (heading.level - prev.level)
                                  }
                                  return (
                                      <Link
                                          href={`#${heading.slug}`}
                                          key={`#${heading.slug}`}
                                          data-level={heading.level}
                                          className="leading-5 text-slate-600 hover:text-slate-900"
                                          style={{
                                              paddingLeft: `${padding}rem`,
                                          }}
                                      >
                                          {heading.text}
                                      </Link>
                                  )
                              })
                          })()}
                      </div>
                  </ScrollArea>
              </>
          )}
      </nav>
  )
}
