'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Scissors, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      toast.error('Error al registrarte', {
        description: error.message,
      })
      setLoading(false)
      return
    }

    toast.success('Cuenta creada', {
      description: 'Revisa tu email para confirmar la cuenta (si está activado).',
    })

    // La mayoría de proyectos en desarrollo tienen confirmación de email desactivada
    // así que redirigimos directo al login
    setTimeout(() => {
      router.push('/login')
    }, 1200)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Scissors className="w-9 h-9 text-amber-400" />
            <span className="text-4xl font-semibold tracking-tighter">BarberFlow</span>
          </div>
          <p className="text-white/60 text-sm">Crea tu cuenta de personal</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 transition"
              placeholder="Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 transition"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 transition"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-amber-400 hover:bg-amber-500 text-black font-medium text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creando cuenta...
              </>
            ) : (
              'Crear cuenta'
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-white/50">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-amber-400 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  )
}
