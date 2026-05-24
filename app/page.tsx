import { Scissors, Calendar, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InstallPWA } from '@/components/shared/InstallPWA';

export default function BarberFlowHome() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scissors className="w-8 h-8 text-amber-400" />
            <span className="text-2xl font-semibold tracking-tight">BarberFlow</span>
          </div>
          <nav className="flex items-center gap-8 text-sm">
            <a href="#servicios" className="hover:text-amber-400 transition-colors">Servicios</a>
            <a href="#como-funciona" className="hover:text-amber-400 transition-colors">Cómo funciona</a>
            <Button variant="outline" className="border-white/20 hover:bg-white/5">
              Iniciar sesión
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-[3px] mb-6">
          PWA INSTALABLE • OFFLINE FIRST
        </div>
        
        <h1 className="text-7xl font-semibold tracking-tighter leading-none mb-6">
          Tu barbería.<br />Fluye perfecto.
        </h1>
        <p className="max-w-md mx-auto text-xl text-white/70 mb-10">
          Reserva citas, gestiona clientes y haz que cada corte sea una experiencia premium. 
          Todo en una app que se instala en el celular.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-black font-medium px-8 h-12 text-base">
            Reservar cita ahora
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/5 h-12 text-base px-8">
            Ver demo para barberos
          </Button>
          <InstallPWA />
        </div>

        <p className="mt-6 text-xs text-white/50">Disponible como PWA • Android &amp; iOS</p>
      </section>

      {/* Features */}
      <section id="servicios" className="border-y border-white/10 bg-black/40 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { icon: Calendar, title: "Citas inteligentes", desc: "Agenda en segundos. Recordatorios automáticos y disponibilidad en tiempo real." },
            { icon: Users, title: "Gestión de clientes", desc: "Historial, preferencias y fidelización. Nunca olvides un cliente VIP." },
            { icon: Clock, title: "Flujo del día", desc: "Dashboard del barbero con el día organizado. Menos caos, más cortes." },
          ].map((f, i) => (
            <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <f.icon className="w-8 h-8 text-amber-400" />
              <h3 className="text-xl font-medium tracking-tight">{f.title}</h3>
              <p className="text-white/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-semibold tracking-tight mb-12">Cómo funciona en 3 pasos</h2>
        
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            { num: "01", title: "Instala la app", desc: "Abre en Chrome o Safari y toca Instalar. Sin App Store." },
            { num: "02", title: "Elige tu barbero y hora", desc: "Ve disponibilidad real y reserva al instante." },
            { num: "03", title: "Llega y fluye", desc: "Recibe recordatorio. El barbero tiene todo listo." },
          ].map((step, idx) => (
            <div key={idx} className="border-l-2 border-amber-400 pl-6">
              <div className="text-amber-400 text-sm font-mono mb-2 tracking-widest">{step.num}</div>
              <div className="text-2xl font-medium mb-3 tracking-tight">{step.title}</div>
              <p className="text-white/60">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/40">
        BarberFlow — Hecho para barberos que exigen lo mejor. © 2026
        <br />
        Sprint 1 completado • Estructura limpia + PWA base lista
      </footer>
    </div>
  );
}
