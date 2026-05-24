'use client'

import { useState, useEffect } from 'react'

interface ClientSearchProps {
  onSearch: (query: string) => void
  onCreateNew: () => void
  placeholder?: string
}

export function ClientSearch({ onSearch, onCreateNew, placeholder = "Buscar por nombre o teléfono..." }: ClientSearchProps) {
  const [query, setQuery] = useState('')

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [query, onSearch])

  return (
    <div className="flex gap-3 sticky top-0 bg-[#0a0a0a] py-4 z-10">
      <div className="flex-1 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 text-base"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      <button
        onClick={onCreateNew}
        className="px-6 rounded-2xl bg-amber-400 text-black font-medium active:bg-amber-500 transition flex items-center justify-center"
      >
        Nuevo
      </button>
    </div>
  )
}
