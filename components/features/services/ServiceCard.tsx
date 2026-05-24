'use client'

import { Button } from '@/components/ui/button'

interface ServiceCardProps {
  service: {
    id: string
    name: string
    durationMinutes: number
    price: number
    description?: string | null
    color?: string
    isActive: boolean
  }
  onEdit: (service: any) => void
  onDelete?: (id: string) => void
}

export function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col gap-3 active:scale-[0.985] transition">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-3.5 h-3.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: service.color || '#f59e0b' }}
          />
          <h3 className="font-semibold text-lg tracking-tight">{service.name}</h3>
        </div>

        {!service.isActive && (
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/60">Inactivo</span>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-white/70">
        <div className="flex items-center gap-1.5">
          <span>⏱</span>
          <span>{service.durationMinutes} min</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium text-amber-400">
          <span>S/</span>
          <span>{Number(service.price).toFixed(2)}</span>
        </div>
      </div>

      {service.description && (
        <p className="text-sm text-white/60 line-clamp-2">{service.description}</p>
      )}

      <div className="flex gap-2 pt-2 mt-auto">
        <Button
          onClick={() => onEdit(service)}
          variant="outline"
          size="sm"
          className="flex-1 border-white/20 text-xs h-9"
        >
          Editar
        </Button>
        {onDelete && (
          <Button
            onClick={() => onDelete(service.id)}
            variant="outline"
            size="sm"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs h-9"
          >
            Eliminar
          </Button>
        )}
      </div>
    </div>
  )
}
