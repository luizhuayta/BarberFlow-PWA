'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Scissors, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectedFrom = searchParams.get('redirectedFrom') || '/dashboard'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error('Error al iniciar sesión', {
        description: error.message,
      })
      setLoading(false)
      return
    }

    toast.success('¡Bienvenido de nuevo!')
    router.push(redirectedFrom)
    router.refresh()
  }

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 transition"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 transition"
          placeholder="••••••••"
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
            Ingresando...
          </>
        ) : (
          'Iniciar sesión'
        )}
      </Button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Scissors className="w-9 h-9 text-amber-400" />
            <span className="text-4xl font-semibold tracking-tighter">BarberFlow</span>
          </div>
          <p className="text-white/60 text-sm">Accede a tu barbería</p>
        </div>

        <Suspense fallback={<div className="text-white/50 text-center py-8">Cargando...</div>}>
          <LoginForm />
        </Suspense>

        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm">
            ¿No tienes cuenta?{' '}
            <a href="/signup" className="text-amber-400 hover:underline">
              Regístrate aquí
            </a>
          </p>
        </div>

        <p className="mt-10 text-[10px] text-center text-white/30">
          Solo para personal autorizado de la barbería
        </p>
      </div>
    </div>
  )
}
