import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BarberFlow - Barbería Profesional',
    short_name: 'BarberFlow',
    description: 'Reserva tu cita, gestiona tu barbería y fluye con estilo. BarberFlow PWA.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#171717',
    orientation: 'portrait',
    scope: '/',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['business', 'productivity', 'lifestyle'],
    lang: 'es',
    dir: 'ltr',
    prefer_related_applications: false,
    shortcuts: [
      {
        name: 'Reservar cita',
        short_name: 'Reservar',
        description: 'Agenda tu próximo corte',
        url: '/reservar',
        icons: [{ src: '/icon-192.svg', sizes: '192x192' }],
      },
    ],
  }
}
