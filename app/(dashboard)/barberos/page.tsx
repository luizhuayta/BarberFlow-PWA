'use client'

import { useState, useEffect } from 'react'
import { BarberCard } from '@/components/features/barbers/BarberCard'
import { BarberForm, type BarberFormData } from '@/components/features/barbers/BarberForm'
import { BarberModal } from '@/components/features/barbers/BarberModal'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/EmptyState'
import { CardSkeleton } from '@/components/ui/CardSkeleton'
import { toast } from 'sonner'

interface Barber {
  id: string
  name: string
  phone: string | null
  specialties: string[]
  color: string
  isActive: boolean
}

export default function BarberosPage() {
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null)

  const loadBarbers = async () => {
    try {
      const res = await fetch('/api/barbers')
      if (res.ok) {
        const data = await res.json()
        setBarbers(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadBarbers()
  }, [])

  const openCreateModal = () => {
    setEditingBarber(null)
    setIsModalOpen(true)
  }

  const openEditModal = (barber: Barber) => {
    setEditingBarber(barber)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingBarber(null)
  }

  const handleSaveBarber = async (data: BarberFormData) => {
    try {
      const method = editingBarber ? 'PUT' : 'POST'
      const url = editingBarber ? `/api/barbers/${editingBarber.id}` : '/api/barbers'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error()

      toast.success(editingBarber ? 'Barbero actualizado' : 'Barbero creado')
      closeModal()
      loadBarbers()
    } catch {
      toast.error('No se pudo guardar')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este barbero?')) return

    try {
      const res = await fetch(`/api/barbers/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Barbero eliminado')
        loadBarbers()
      }
    } catch {
      toast.error('Error al eliminar')
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 md:pb-8">
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Barberos</h1>
          <p className="text-white/60 text-sm mt-1">Gestiona a tu equipo</p>
        </div>
        <Button 
          onClick={openCreateModal} 
          className="hidden md:flex bg-amber-400 hover:bg-amber-500 text-black font-medium"
        >
          + Nuevo barbero
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : barbers.length === 0 ? (
        <EmptyState
          icon="👤"
          title="No tienes barberos registrados"
          description="Agrega a los miembros de tu equipo para poder asignarles citas."
          action={
            <Button onClick={openCreateModal} className="bg-amber-400 hover:bg-amber-500 text-black">
              Agregar primer barbero
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {barbers.map((barber) => (
            <BarberCard
              key={barber.id}
              barber={barber}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={openCreateModal}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-amber-400 text-black rounded-full shadow-xl flex items-center justify-center text-3xl active:scale-95 transition"
      >
        +
      </button>

      <BarberModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingBarber ? 'Editar barbero' : 'Nuevo barbero'}
      >
        <BarberForm
          defaultValues={editingBarber || undefined}
          onSubmit={handleSaveBarber}
          onCancel={closeModal}
          isEditing={!!editingBarber}
        />
      </BarberModal>
    </div>
  )
}
