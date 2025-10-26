import { cn } from '@/utils/cn'

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'w-full px-4 py-3 rounded-lg',
        'bg-white dark:bg-gray-900',
        'border border-gray-300 dark:border-gray-700',
        'text-gray-900 dark:text-gray-100',
        'placeholder:text-gray-400 dark:placeholder:text-gray-500',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
        'transition-all duration-200',
        className
      )}
      {...props}
    />
  )
}

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'w-full px-4 py-3 rounded-lg',
        'bg-white dark:bg-gray-900',
        'border border-gray-300 dark:border-gray-700',
        'text-gray-900 dark:text-gray-100',
        'placeholder:text-gray-400 dark:placeholder:text-gray-500',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
        'transition-all duration-200',
        'resize-none',
        className
      )}
      {...props}
    />
  )
}

