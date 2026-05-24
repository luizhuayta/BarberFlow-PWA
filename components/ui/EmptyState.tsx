'use client'

import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {icon && (
        <div className="mb-4 text-5xl opacity-60">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold tracking-tight mb-2">{title}</h3>
      {description && (
        <p className="text-white/60 max-w-xs mb-6 text-sm leading-relaxed">
          {description}
        </p>
      )}
      {action}
    </div>
  )
}
