import { cn } from '@/utils/cn'

export default function ProgressRing({ 
  progress = 0, 
  size = 120, 
  strokeWidth = 8,
  color = 'primary',
  label,
  value,
  className 
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  const colorMap = {
    primary: 'stroke-primary-600',
    blue: 'stroke-blue-600',
    secondary: 'stroke-primary-500',
  }

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-primary-200 dark:stroke-primary-700"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={cn(colorMap[color], 'transition-all duration-500')}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {value && (
          <div className="text-2xl font-bold text-primary-900 dark:text-white">
            {value}
          </div>
        )}
        {label && (
          <div className="text-xs text-primary-600 dark:text-primary-400 mt-1">
            {label}
          </div>
        )}
      </div>
    </div>
  )
}

