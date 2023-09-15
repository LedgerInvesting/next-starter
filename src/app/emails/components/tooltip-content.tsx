import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import classnames from 'classnames'
import * as React from 'react'
import { inter } from '../layout'

type ContentElement = React.ElementRef<typeof TooltipPrimitive.Content>
type ContentProps = React.ComponentPropsWithoutRef<
    typeof TooltipPrimitive.Content
>

export interface TooltipProps extends ContentProps {}

export const TooltipContent = React.forwardRef<
    ContentElement,
    Readonly<TooltipProps>
>(({ sideOffset = 6, children, ...props }, forwardedRef) => (
    <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
            {...props}
            ref={forwardedRef}
            className={classnames(
                'border-slate-6 z-20 rounded-md border bg-black px-3 py-2 text-xs',
                `${inter.variable} font-sans`,
            )}
            sideOffset={sideOffset}
        >
            {children}
        </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
))

TooltipContent.displayName = 'TooltipContent'
