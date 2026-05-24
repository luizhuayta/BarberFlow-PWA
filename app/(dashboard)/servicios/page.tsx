'use client'

import { useState, useEffect } from 'react'
import { ServiceCard } from '@/components/features/services/ServiceCard'
import { ServiceForm, type ServiceFormData } from '@/components/features/services/ServiceForm'
import { ServiceModal } from '@/components/features/services/ServiceModal'
import { Button } from '@/components/ui/button'
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

  // Cargar servicios
  const loadServices = async () => {
    try {
      const res = await fetch('/api/services')
      if (res.ok) {
        const data = await res.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Error loading services', error)
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

  // Crear o actualizar servicio
  const handleSaveService = async (data: ServiceFormData) => {
    try {
      const method = editingService ? 'PUT' : 'POST'
      const url = editingService ? `/api/services/${editingService.id}` : '/api/services'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Error al guardar')

      toast.success(editingService ? 'Servicio actualizado' : 'Servicio creado')
      closeModal()
      loadServices()
    } catch (error) {
      toast.error('No se pudo guardar el servicio')
    }
  }

  // Eliminar servicio (simple)
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
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Servicios</h1>
          <p className="text-white/60 text-sm mt-1">Gestiona los servicios que ofreces</p>
        </div>
        <Button onClick={openCreateModal} className="bg-amber-400 hover:bg-amber-500 text-black font-medium">
          + Nuevo servicio
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-white/60">Cargando servicios...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-16 border border-white/10 rounded-2xl">
          <p className="text-white/60 mb-4">Aún no tienes servicios registrados</p>
          <Button onClick={openCreateModal} variant="outline" className="border-white/20">
            Crear primer servicio
          </Button>
        </div>
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

      {/* Modal de Crear/Editar */}
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
