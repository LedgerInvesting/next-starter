import clsx from 'clsx'

export function Container({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={clsx('mx-auto flex w-full max-w-7xl items-start', className)} {...props} />
}
