import { cn } from '@/utils/cn'

export function BarChart({ data, height = 200, className }) {
  if (!data || data.length === 0) return null

  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-end justify-between space-x-2" style={{ height }}>
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full flex items-end justify-center" style={{ height: '100%' }}>
              <div
                className={cn(
                  'w-full rounded-t-lg transition-all duration-500 hover:opacity-80',
                  item.color || 'bg-primary-500'
                )}
                style={{ 
                  height: `${(item.value / maxValue) * 100}%`,
                  minHeight: item.value > 0 ? '8px' : '0'
                }}
              />
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 text-center">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LineChart({ data, height = 200, className }) {
  if (!data || data.length === 0) return null

  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((item.value - minValue) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <div className={cn('w-full relative', className)} style={{ height }}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="currentColor"
            strokeWidth="0.1"
            className="text-neutral-200 dark:text-neutral-700"
          />
        ))}
        
        {/* Area under line */}
        <polygon
          points={`0,100 ${points} 100,100`}
          fill="currentColor"
          className="text-primary-500 opacity-10"
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary-500"
        />
        
        {/* Points */}
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100
          const y = 100 - ((item.value - minValue) / range) * 100
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill="currentColor"
              className="text-primary-600"
            />
          )
        })}
      </svg>
      
      {/* Labels */}
      <div className="flex justify-between mt-2">
        {data.map((item, index) => (
          <div key={index} className="text-xs text-neutral-500 dark:text-neutral-400">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

