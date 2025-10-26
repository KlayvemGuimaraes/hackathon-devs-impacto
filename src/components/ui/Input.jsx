import { cn } from '@/utils/cn'

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'w-full px-4 py-3 rounded-lg',
        'bg-white dark:bg-black',
        'border border-gray-300 dark:border-gray-700',
        'text-gray-900 dark:text-white',
        'placeholder:text-gray-500 dark:placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-[#0070F3] focus:border-transparent',
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
        'bg-white dark:bg-black',
        'border border-gray-300 dark:border-gray-700',
        'text-gray-900 dark:text-white',
        'placeholder:text-gray-500 dark:placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-[#0070F3] focus:border-transparent',
        'transition-all duration-200',
        'resize-none',
        className
      )}
      {...props}
    />
  )
}

