import { cn } from '@/utils/cn'

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 dark:border-gray-800',
        'bg-white dark:bg-black',
        'shadow-sm',
        'transition-all duration-300',
        hover && 'hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 cursor-pointer',
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
    <div className={cn('px-6 py-4 border-t border-gray-100 dark:border-gray-900', className)} {...props}>
      {children}
    </div>
  )
}

