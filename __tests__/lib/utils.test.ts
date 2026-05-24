import { cn } from '@/lib/utils'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toContain('text-red-500')
    expect(result).toContain('bg-blue-500')
  })

  it('handles conditional classes', () => {
    const isActive = true
    const result = cn('base', isActive && 'active', !isActive && 'inactive')
    expect(result).toBe('base active')
  })

  it('resolves Tailwind conflicts with twMerge', () => {
    const result = cn('p-4', 'p-8')
    expect(result).toBe('p-8')
  })
})
