'use client'

import { Button } from '@/components/ui/button'

interface BarberCardProps {
  barber: {
    id: string
    name: string
    phone?: string | null
    specialties: string[]
    color: string
    isActive: boolean
  }
  onEdit: (barber: any) => void
  onDelete?: (id: string) => void
}

export function BarberCard({ barber, onEdit, onDelete }: BarberCardProps) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full flex-shrink-0 ring-2 ring-white/20"
            style={{ backgroundColor: barber.color }}
          />
          <div>
            <h3 className="font-semibold text-lg tracking-tight">{barber.name}</h3>
            {barber.phone && <p className="text-xs text-white/50">{barber.phone}</p>}
          </div>
        </div>

        {!barber.isActive && (
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/60">Inactivo</span>
        )}
      </div>

      {/* Especialidades */}
      <div className="flex flex-wrap gap-1.5">
        {barber.specialties.length > 0 ? (
          barber.specialties.map((spec, index) => (
            <span
              key={index}
              className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/80"
            >
              {spec}
            </span>
          ))
        ) : (
          <span className="text-xs text-white/40">Sin especialidades</span>
        )}
      </div>

      <div className="flex gap-2 pt-2 mt-auto">
        <Button
          onClick={() => onEdit(barber)}
          variant="outline"
          size="sm"
          className="flex-1 border-white/20 text-xs h-9"
        >
          Editar
        </Button>
        {onDelete && (
          <Button
            onClick={() => onDelete(barber.id)}
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
