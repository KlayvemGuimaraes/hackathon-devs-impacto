import { cn } from '@/utils/cn'

const badgeVariants = {
  default: 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100',
  primary: 'bg-blue-50 text-[#0070F3] dark:bg-blue-950 dark:text-blue-400',
  secondary: 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
}

export default function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

