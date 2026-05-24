import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Guard: si no hay credenciales de Supabase (ej. en tests E2E sin .env), saltamos auth
  const hasSupabaseEnv =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let user = null

  if (hasSupabaseEnv) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser().
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()

    user = authUser
  }

  const { pathname } = request.nextUrl

  // Rutas protegidas (agrega más según avances)
  const protectedRoutes = ['/dashboard', '/citas', '/clientes', '/ventas', '/reportes']

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Si intenta acceder a ruta protegida sin estar logueado → login
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(url)
  }

  // Si ya está logueado y va a login/signup → redirige al dashboard
  if (user && (pathname === '/login' || pathname === '/signup')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (static assets)
     * - api (API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}
