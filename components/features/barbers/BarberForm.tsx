'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { barberSchema, type BarberFormData } from '@/lib/validations/barber'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface BarberFormProps {
  defaultValues?: Partial<BarberFormData>
  onSubmit: (data: BarberFormData) => Promise<void>
  onCancel: () => void
  isEditing?: boolean
}

export function BarberForm({ defaultValues, onSubmit, onCancel, isEditing = false }: BarberFormProps) {
  const [specialtyInput, setSpecialtyInput] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BarberFormData>({
    resolver: zodResolver(barberSchema),
    defaultValues: {
      name: '',
      phone: '',
      specialties: [],
      color: '#f59e0b',
      isActive: true,
      ...defaultValues,
    },
  })

  const specialties = watch('specialties')

  const addSpecialty = () => {
    const trimmed = specialtyInput.trim()
    if (trimmed && !specialties.includes(trimmed)) {
      setValue('specialties', [...specialties, trimmed])
      setSpecialtyInput('')
    }
  }

  const removeSpecialty = (index: number) => {
    const newSpecialties = specialties.filter((_, i) => i !== index)
    setValue('specialties', newSpecialties)
  }

  const handleFormSubmit = async (data: BarberFormData) => {
    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Nombre del barbero *</label>
        <input
          {...register('name')}
          type="text"
          placeholder="Carlos Mendoza"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/60"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Teléfono (opcional)</label>
        <input
          {...register('phone')}
          type="tel"
          placeholder="999 888 777"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/60"
        />
      </div>

      {/* Especialidades */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Especialidades *</label>
        
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={specialtyInput}
            onChange={(e) => setSpecialtyInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addSpecialty()
              }
            }}
            placeholder="Corte, Barba, Fade..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/60"
          />
          <Button type="button" onClick={addSpecialty} variant="outline" className="border-white/20">
            Agregar
          </Button>
        </div>

        {/* Tags de especialidades */}
        <div className="flex flex-wrap gap-2 min-h-[32px]">
          {specialties.length > 0 ? (
            specialties.map((spec, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 bg-white/10 text-sm px-3 py-1 rounded-full"
              >
                {spec}
                <button
                  type="button"
                  onClick={() => removeSpecialty(index)}
                  className="text-white/50 hover:text-red-400 ml-1"
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <p className="text-xs text-white/40">Agrega al menos una especialidad</p>
          )}
        </div>

        {errors.specialties && (
          <p className="text-red-400 text-xs mt-1">{errors.specialties.message}</p>
        )}
      </div>

      {/* Color */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Color para el calendario</label>
        <div className="flex items-center gap-4">
          <input
            {...register('color')}
            type="color"
            className="h-10 w-16 bg-transparent border border-white/10 rounded-lg cursor-pointer p-1"
          />
          <span className="text-xs text-white/50">Este color se usará en la agenda</span>
        </div>
      </div>

      {/* Activo */}
      <div className="flex items-center gap-3 pt-2">
        <input
          {...register('isActive')}
          type="checkbox"
          id="isActiveBarber"
          className="h-4 w-4 accent-amber-400"
        />
        <label htmlFor="isActiveBarber" className="text-sm text-white/80">
          Barbero activo
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
          {isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar barbero' : 'Crear barbero'}
        </Button>
      </div>
    </form>
  )
}
