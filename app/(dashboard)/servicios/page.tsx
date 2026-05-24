'use client'

import { useState, useEffect } from 'react'
import { ServiceCard } from '@/components/features/services/ServiceCard'
import { ServiceForm, type ServiceFormData } from '@/components/features/services/ServiceForm'
import { ServiceModal } from '@/components/features/services/ServiceModal'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/EmptyState'
import { CardSkeleton } from '@/components/ui/CardSkeleton'
import { toast } from 'sonner'

interface Service {
  id: string
  name: string
  durationMinutes: number
  price: number
  description: string | null
  color: string | null
  isActive: boolean
}

export default function ServiciosPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const loadServices = async () => {
    try {
      const res = await fetch('/api/services')
      if (res.ok) {
        const data = await res.json()
        setServices(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
  }, [])

  const openCreateModal = () => {
    setEditingService(null)
    setIsModalOpen(true)
  }

  const openEditModal = (service: Service) => {
    setEditingService(service)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingService(null)
  }

  const handleSaveService = async (data: ServiceFormData) => {
    try {
      const method = editingService ? 'PUT' : 'POST'
      const url = editingService ? `/api/services/${editingService.id}` : '/api/services'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error()

      toast.success(editingService ? 'Servicio actualizado' : 'Servicio creado')
      closeModal()
      loadServices()
    } catch {
      toast.error('No se pudo guardar el servicio')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este servicio?')) return

    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Servicio eliminado')
        loadServices()
      }
    } catch {
      toast.error('Error al eliminar')
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 md:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Servicios</h1>
          <p className="text-white/60 text-sm mt-1">Gestiona lo que ofreces</p>
        </div>
        <Button 
          onClick={openCreateModal} 
          className="hidden md:flex bg-amber-400 hover:bg-amber-500 text-black font-medium"
        >
          + Nuevo servicio
        </Button>
      </div>

      {/* Contenido */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : services.length === 0 ? (
        <EmptyState
          icon="✂️"
          title="No tienes servicios aún"
          description="Crea tu primer servicio para empezar a ofrecerlo a tus clientes."
          action={
            <Button onClick={openCreateModal} className="bg-amber-400 hover:bg-amber-500 text-black">
              Crear primer servicio
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Floating Action Button (solo móvil) */}
      <button
        onClick={openCreateModal}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-amber-400 text-black rounded-full shadow-xl flex items-center justify-center text-3xl active:scale-95 transition"
      >
        +
      </button>

      {/* Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingService ? 'Editar servicio' : 'Nuevo servicio'}
      >
        <ServiceForm
          defaultValues={editingService || undefined}
          onSubmit={handleSaveService}
          onCancel={closeModal}
          isEditing={!!editingService}
        />
      </ServiceModal>
    </div>
  )
}
