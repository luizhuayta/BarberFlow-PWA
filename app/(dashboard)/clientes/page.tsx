'use client'

import { useState, useEffect, useCallback } from 'react'
import { ClientSearch } from '@/components/features/clients/ClientSearch'
import { ClientCard } from '@/components/features/clients/ClientCard'
import { ClientForm, type ClientFormData } from '@/components/features/clients/ClientForm'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/EmptyState'
import { CardSkeleton } from '@/components/ui/CardSkeleton'
import { toast } from 'sonner'

interface Client {
  id: string
  name: string
  phone: string | null
  email: string | null
  notes: string | null
}

interface AppointmentHistory {
  id: string
  startTime: string
  status: string
  barber: { name: string } | null
  service: { name: string } | null
}

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [history, setHistory] = useState<AppointmentHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const loadClients = useCallback(async (query: string = '') => {
    setIsLoading(true)
    try {
      const url = query 
        ? `/api/clients?search=${encodeURIComponent(query)}` 
        : '/api/clients'
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setClients(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadClients()
  }, [loadClients])

  const handleSearch = (query: string) => {
    loadClients(query)
  }

  const openCreateForm = () => {
    setEditingClient(null)
    setIsFormOpen(true)
  }

  const openEditForm = (client: Client) => {
    setEditingClient(client)
    setIsFormOpen(true)
    setSelectedClient(null)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingClient(null)
  }

  const handleSaveClient = async (data: ClientFormData) => {
    try {
      const method = editingClient ? 'PUT' : 'POST'
      const url = editingClient ? `/api/clients/${editingClient.id}` : '/api/clients'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error()

      toast.success(editingClient ? 'Cliente actualizado' : 'Cliente creado')
      closeForm()
      loadClients()
    } catch {
      toast.error('Error al guardar cliente')
    }
  }

  const selectClient = async (id: string) => {
    try {
      const res = await fetch(`/api/clients/${id}`)
      if (res.ok) {
        const client = await res.json()
        setSelectedClient(client)

        const historyRes = await fetch(`/api/clients/${id}/history`)
        if (historyRes.ok) {
          const historyData = await historyRes.json()
          setHistory(historyData)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const closeDetail = () => {
    setSelectedClient(null)
    setHistory([])
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 md:pb-8">
      <div className="mb-2 px-1">
        <h1 className="text-3xl font-semibold tracking-tight">Clientes</h1>
        <p className="text-white/60 text-sm">Búsqueda rápida y gestión</p>
      </div>

      <ClientSearch 
        onSearch={handleSearch} 
        onCreateNew={openCreateForm}
      />

      {isLoading ? (
        <div className="grid gap-3 mt-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 animate-pulse h-[92px]" />
          ))}
        </div>
      ) : clients.length === 0 ? (
        <EmptyState
          icon="👥"
          title="No se encontraron clientes"
          description="Prueba con otro nombre o crea un nuevo cliente."
          action={
            <Button onClick={openCreateForm} className="bg-amber-400 hover:bg-amber-500 text-black">
              Crear nuevo cliente
            </Button>
          }
        />
      ) : (
        <div className="grid gap-3 mt-2">
          {clients.map((client) => (
            <ClientCard 
              key={client.id} 
              client={client} 
              onSelect={selectClient} 
            />
          ))}
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={openCreateForm}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-amber-400 text-black rounded-full shadow-xl flex items-center justify-center text-3xl active:scale-95 transition"
      >
        +
      </button>

      {/* Client Detail */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end md:items-center justify-center">
          <div className="w-full md:max-w-lg bg-[#111] rounded-t-3xl md:rounded-2xl p-6 border border-white/10 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold">{selectedClient.name}</h2>
                {selectedClient.phone && <p className="text-white/60">📞 {selectedClient.phone}</p>}
              </div>
              <button onClick={closeDetail} className="text-3xl text-white/50">×</button>
            </div>

            <div className="flex gap-3 mb-6">
              <Button onClick={() => openEditForm(selectedClient)} className="flex-1" variant="outline">
                Editar
              </Button>
            </div>

            {selectedClient.notes && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white/70 mb-2">Notas</h3>
                <p className="text-white/90 bg-white/5 p-4 rounded-2xl">{selectedClient.notes}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-white/70 mb-3">Historial de citas</h3>
              {history.length > 0 ? (
                <div className="space-y-3">
                  {history.map((appt) => (
                    <div key={appt.id} className="bg-white/5 p-3 rounded-2xl text-sm">
                      <div className="flex justify-between">
                        <span>{new Date(appt.startTime).toLocaleDateString('es-PE')}</span>
                        <span className="text-amber-400">{appt.status}</span>
                      </div>
                      <div className="text-white/60 text-xs mt-1">
                        {appt.barber?.name} • {appt.service?.name}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/50 text-sm">Sin citas registradas.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end md:items-center justify-center p-4">
          <div className="w-full md:max-w-md bg-[#111] rounded-3xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-6">
              {editingClient ? 'Editar cliente' : 'Nuevo cliente'}
            </h2>
            <ClientForm
              defaultValues={editingClient || undefined}
              onSubmit={handleSaveClient}
              onCancel={closeForm}
              isEditing={!!editingClient}
            />
          </div>
        </div>
      )}
    </div>
  )
}
