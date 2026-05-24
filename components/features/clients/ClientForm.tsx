'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientSchema, type ClientFormData } from '@/lib/validations/client'
import { Button } from '@/components/ui/button'

interface ClientFormProps {
  defaultValues?: Partial<ClientFormData>
  onSubmit: (data: ClientFormData) => Promise<void>
  onCancel: () => void
  isEditing?: boolean
}

export function ClientForm({ defaultValues, onSubmit, onCancel, isEditing = false }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      notes: '',
      ...defaultValues,
    },
  })

  const handleFormSubmit = async (data: ClientFormData) => {
    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Nombre completo *</label>
        <input
          {...register('name')}
          type="text"
          placeholder="Juan Pérez"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/60"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">Teléfono</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="999 888 777"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/60"
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="juan@email.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/60"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Notas / Preferencias</label>
        <textarea
          {...register('notes')}
          rows={4}
          placeholder="Prefiere corte fade, no le gusta el perfume fuerte..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/60 resize-none"
        />
      </div>

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
          {isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar cliente' : 'Crear cliente'}
        </Button>
      </div>
    </form>
  )
}
