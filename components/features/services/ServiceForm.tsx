'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serviceSchema, type ServiceFormData } from '@/lib/validations/service'
import { Button } from '@/components/ui/button'

interface ServiceFormProps {
  defaultValues?: Partial<ServiceFormData>
  onSubmit: (data: ServiceFormData) => Promise<void>
  onCancel: () => void
  isEditing?: boolean
}

export function ServiceForm({ defaultValues, onSubmit, onCancel, isEditing = false }: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      durationMinutes: 30,
      price: 25,
      description: '',
      color: '#f59e0b',
      isActive: true,
      ...defaultValues,
    },
  })

  const handleFormSubmit = async (data: ServiceFormData) => {
    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Nombre del servicio *</label>
        <input
          {...register('name')}
          type="text"
          placeholder="Corte de cabello"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/60"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Duración */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">Duración (min) *</label>
          <input
            {...register('durationMinutes')}
            type="number"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/60"
          />
          {errors.durationMinutes && (
            <p className="text-red-400 text-xs mt-1">{errors.durationMinutes.message}</p>
          )}
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">Precio (S/) *</label>
          <input
            {...register('price')}
            type="number"
            step="0.5"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/60"
          />
          {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price.message}</p>}
        </div>
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Descripción (opcional)</label>
        <textarea
          {...register('description')}
          rows={3}
          placeholder="Descripción breve del servicio..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/60 resize-none"
        />
      </div>

      {/* Color (simple) */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Color del servicio</label>
        <div className="flex items-center gap-3">
          <input
            {...register('color')}
            type="color"
            className="h-10 w-14 bg-transparent border border-white/10 rounded-lg cursor-pointer"
          />
          <span className="text-xs text-white/50">Color para identificar el servicio</span>
        </div>
      </div>

      {/* Activo */}
      <div className="flex items-center gap-3 pt-2">
        <input
          {...register('isActive')}
          type="checkbox"
          id="isActive"
          className="h-4 w-4 accent-amber-400"
        />
        <label htmlFor="isActive" className="text-sm text-white/80">
          Servicio activo (visible para reservas)
        </label>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 border-white/20 text-white hover:bg-white/5"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-amber-400 hover:bg-amber-500 text-black font-medium"
        >
          {isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar servicio' : 'Crear servicio'}
        </Button>
      </div>
    </form>
  )
}
