'use client'

import { Button } from '@/components/ui/button'

interface ClientCardProps {
  client: {
    id: string
    name: string
    phone: string | null
    email: string | null
  }
  onSelect: (id: string) => void
}

export function ClientCard({ client, onSelect }: ClientCardProps) {
  return (
    <div 
      onClick={() => onSelect(client.id)}
      className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 active:bg-white/[0.06] transition cursor-pointer"
    >
      <div className="font-semibold text-lg tracking-tight">{client.name}</div>
      <div className="text-sm text-white/60 mt-1 space-y-0.5">
        {client.phone && <div>📞 {client.phone}</div>}
        {client.email && <div>✉ {client.email}</div>}
      </div>
    </div>
  )
}
