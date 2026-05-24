import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Intentamos leer el perfil (si ya existe)
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user?.id)
    .single()

  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight mb-2">Dashboard</h1>
      <p className="text-white/60 mb-8">
        Bienvenido, {profile?.full_name || user?.email?.split('@')[0] || 'barbero'}.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Citas de hoy', value: '12', desc: '3 pendientes' },
          { title: 'Clientes activos', value: '184', desc: '+7 esta semana' },
          { title: 'Ventas del día', value: 'S/ 1,240', desc: '↑ 18%' },
        ].map((card, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
          >
            <div className="text-sm text-white/50 mb-1">{card.title}</div>
            <div className="text-4xl font-semibold tracking-tighter mb-1">{card.value}</div>
            <div className="text-xs text-white/40">{card.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-xs text-white/30">
        Rol actual: <span className="text-amber-400">{profile?.role || 'sin asignar'}</span> · 
        (Próximamente: control de acceso por rol)
      </div>
    </div>
  )
}
