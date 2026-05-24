'use client'

import { ReactNode } from 'react'

interface BarberModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function BarberModal({ isOpen, onClose, title, children }: BarberModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 p-0 md:p-4">
      <div className="w-full md:max-w-lg rounded-t-3xl md:rounded-2xl bg-[#111] border border-white/10 p-6 md:p-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
