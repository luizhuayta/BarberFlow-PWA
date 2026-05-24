'use client'

import { useState, useEffect, useCallback } from 'react'
import { ClientSearch } from '@/components/features/clients/ClientSearch'
import { ClientCard } from '@/components/features/clients/ClientCard'
import { ClientForm, type ClientFormData } from '@/components/features/clients/ClientForm'
import { Button } from '@/components/ui/button'
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

        // Load appointment history
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
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold tracking-tight">Clientes</h1>
        <p className="text-white/60 text-sm">Búsqueda rápida y gestión</p>
      </div>

      <ClientSearch 
        onSearch={handleSearch} 
        onCreateNew={openCreateForm}
      />

      {isLoading ? (
        <div className="text-center py-10 text-white/60">Buscando...</div>
      ) : clients.length === 0 ? (
        <div className="text-center py-16 border border-white/10 rounded-2xl">
          <p className="text-white/60">No se encontraron clientes</p>
          <Button onClick={openCreateForm} className="mt-4" variant="outline">
            Crear nuevo cliente
          </Button>
        </div>
      ) : (
        <div className="grid gap-3">
          {clients.map((client) => (
            <ClientCard 
              key={client.id} 
              client={client} 
              onSelect={selectClient} 
            />
          ))}
        </div>
      )}

      {/* Client Detail Modal */}
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
                <p className="text-white/50 text-sm">Sin citas registradas aún.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Form Modal */}
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
