import { cn } from '@/utils/cn'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon,
  trend = 'up',
  color = 'primary',
  className 
}) {
  const colorMap = {
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    secondary: 'bg-primary-200 text-primary-800 dark:bg-primary-800/50 dark:text-primary-200',
  }

  return (
    <div className={cn(
      'bg-white dark:bg-primary-900 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all border border-primary-200 dark:border-primary-800',
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-3 rounded-xl', colorMap[color])}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        {change && (
          <div className={cn(
            'flex items-center space-x-1 text-sm font-medium',
            trend === 'up' ? 'text-blue-600 dark:text-blue-400' : 'text-primary-600 dark:text-primary-400'
          )}>
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="text-3xl font-bold text-primary-900 dark:text-white">
          {value}
        </div>
        <div className="text-sm text-primary-600 dark:text-primary-400">
          {title}
        </div>
      </div>
    </div>
  )
}

