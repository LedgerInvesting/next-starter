import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import * as React from 'react'
import { Callout } from '@/components/callout'
import { cn } from '@/lib/utils'

/* eslint-disable jsx-a11y/heading-has-content, jsx-a11y/anchor-has-content */
const components = {
    h1: ({ className, ...props }) => (
        <h1
            className={cn(
                'mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
                className,
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }) => (
        <h2
            className={cn(
                'mt-10 scroll-m-20 border-b border-b-slate-900/10 pb-1 text-3xl font-semibold tracking-tight first:mt-0',
                className,
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }) => (
        <h3
            className={cn(
                'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
                className,
            )}
            {...props}
        />
    ),
    h4: ({ className, ...props }) => (
        <h4
            className={cn(
                'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
                className,
            )}
            {...props}
        />
    ),
    h5: ({ className, ...props }) => (
        <h5
            className={cn(
                'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
                className,
            )}
            {...props}
        />
    ),
    h6: ({ className, ...props }) => (
        <h6
            className={cn(
                'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
                className,
            )}
            {...props}
        />
    ),
    a: ({ className, ...props }) => (
        <a
            className={cn(
                'font-medium text-slate-900 underline underline-offset-4',
                className,
            )}
            {...props}
        />
    ),
    p: ({ className, ...props }) => (
        <p
            className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
            {...props}
        />
    ),
    ul: ({ className, ...props }) => (
        <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
        <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
    ),
    li: ({ className, ...props }) => (
        <li className={cn('mt-2', className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
        <blockquote
            className={cn(
                'mt-6 border-l-2 border-slate-900/10 pl-6 italic text-slate-800 [&>*]:text-slate-600',
                className,
            )}
            {...props}
        />
    ),
    img: ({
        className,
        alt,
        children,
        ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            className={cn('rounded-md border border-slate-900/5', className)}
            alt={alt}
            {...props}
        />
    ),
    hr: ({ ...props }) => (
        <hr className="my-4 border-slate-900/10 md:my-8" {...props} />
    ),
    table: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 w-full overflow-y-auto">
            <table className={cn('w-full', className)} {...props} />
        </div>
    ),
    tr: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr
            className={cn(
                'm-0 border-t border-slate-900/10 p-0 even:bg-slate-100',
                className,
            )}
            {...props}
        />
    ),
    th: ({ className, ...props }) => (
        <th
            className={cn(
                'border border-slate-900/10 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
                className,
            )}
            {...props}
        />
    ),
    td: ({ className, ...props }) => (
        <td
            className={cn(
                'border border-slate-900/10 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
                className,
            )}
            {...props}
        />
    ),
    pre: ({ className, ...props }) => (
        <pre
            className={cn(
                'mb-4 mt-6 overflow-x-auto rounded-lg bg-slate-900 py-4',
                className,
            )}
            {...props}
        />
    ),
    code: ({ className, ...props }) => (
        <code
            className={cn(
                'relative rounded border bg-slate-300/25 px-[0.3rem] py-[0.2rem] font-mono text-sm text-slate-600',
                className,
            )}
            {...props}
        />
    ),
    Image,
    Callout,
}

interface MdxProps {
    code: string
}

export function Mdx({ code }: MdxProps) {
    const Component = useMDXComponent(code)

    return (
        <div className="mdx">
            <Component components={components} />
        </div>
    )
}
