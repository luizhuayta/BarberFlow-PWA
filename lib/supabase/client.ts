import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // En modo híbrido devolvemos un cliente dummy que no hace nada
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ error: new Error('Supabase no configurado') }),
        signOut: async () => ({ error: null }),
      },
    } as any
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
