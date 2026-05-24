import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ReactNode } from 'react'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Opcional: aquí podemos leer el perfil y pasar el rol vía context o props
  // Por ahora solo protegemos el acceso

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar simple del dashboard */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-tight">BarberFlow</span>
            <span className="text-xs text-white/40">/ Dashboard</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/50 hidden sm:inline">{user.email}</span>
            <a
              href="/api/auth/signout"
              className="text-amber-400 hover:text-amber-300 transition"
            >
              Cerrar sesión
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
