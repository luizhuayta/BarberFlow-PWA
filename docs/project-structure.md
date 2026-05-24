# Project Structure - BarberFlow

BarberFlow es una PWA construida con Next.js 16 (App Router), Tailwind, shadcn/ui (base-nova), Supabase y TypeScript.

## Estructura de Carpetas

```
barberflow-pwa/
├── app/
│   ├── (dashboard)/          # Route group protegido para barbería (citas, clientes, etc.)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (auth)/               # (futuro) login, registro
│   ├── api/                  # Route handlers (Supabase edge functions proxy si necesario)
│   ├── layout.tsx            # Root layout + PWA + Toaster
│   ├── page.tsx              # Landing / Home
│   ├── manifest.ts           # PWA manifest
│   └── globals.css
├── components/
│   ├── ui/                   # shadcn/ui components (button, card, etc.) - NO EDITAR MANUAL
│   ├── shared/               # Componentes reutilizables (RegisterSW, Navbar, Footer, etc.)
│   └── features/             # (futuro) componentes específicos por feature
├── lib/
│   ├── supabase/             # Cliente Supabase (client.ts, server.ts, middleware)
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils.ts              # cn() helper + helpers generales
├── types/                    # TypeScript types globales (db, api, etc.)
│   └── index.ts
├── public/
│   ├── sw.js                 # Service Worker básico
│   └── icons/                # (pendiente) icon-192.png, icon-512.png, etc.
├── docs/
│   ├── project-structure.md
│   ├── agent.md
│   └── development-phases.md
├── README.md
├── components.json
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Convenciones

- Usar **TypeScript** estricto.
- Componentes en **PascalCase**.
- Server Components por defecto.
- 'use client' solo cuando sea necesario (interactividad, hooks).
- Rutas con route groups `(dashboard)` para layouts anidados sin afectar URL.
- Supabase: separar client y server.
- Estilos: Tailwind + shadcn tokens (CSS variables). Dark mode por defecto.
- Commits y PRs siguiendo Conventional Commits.

## Próximos Sprints

Ver `development-phases.md` para el roadmap de entregas cortas.

## Notas

- Este proyecto NO usa metodología Scrum completa, solo sprints cortos de 1-3 días para mantener momentum.
- Toda feature debe tener su User Story + AC + Tasks + DoD.
