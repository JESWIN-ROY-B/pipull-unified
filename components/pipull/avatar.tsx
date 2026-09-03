import { initials } from '@/lib/pipull-data'
import { cn } from '@/lib/utils'

export function Avatar({
  name,
  color,
  className,
}: {
  name: string
  color: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold text-white ring-2 ring-background',
        className,
      )}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
