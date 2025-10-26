import { cn } from '@/utils/cn'

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-200 dark:border-gray-800',
        'bg-white dark:bg-gray-900',
        'shadow-sm',
        'transition-all duration-300',
        hover && 'hover:shadow-xl hover:scale-105 hover:border-primary-300 dark:hover:border-primary-700 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-5', className)} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4 border-t border-gray-100 dark:border-gray-800', className)} {...props}>
      {children}
    </div>
  )
}

