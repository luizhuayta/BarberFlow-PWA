import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ReactNode } from 'react'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()

  // =====================================================
  // MODO HÍBRIDO (Prisma + Postgres local)
  // Sin Supabase configurado → acceso libre para desarrollo
  // =====================================================
  if (!supabase) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <header className="border-b border-white/10 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-semibold tracking-tight">BarberFlow</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-400/20 text-amber-400">Modo Híbrido</span>
            </div>
            <span className="text-xs text-white/50">Sin auth (Prisma local)</span>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      </div>
    )
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
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
