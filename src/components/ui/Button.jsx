import { cn } from '@/utils/cn'

const buttonVariants = {
  default: 'bg-[#0070F3] text-white hover:bg-[#0761D1] shadow-sm hover:shadow-md transition-all',
  outline: 'border border-gray-300 text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-900',
  ghost: 'hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-900 dark:text-white',
  secondary: 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100',
}

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className,
  ...props 
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transform hover:scale-105 active:scale-95',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

