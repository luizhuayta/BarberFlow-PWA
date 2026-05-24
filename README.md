# BarberFlow PWA

**BarberFlow** — La aplicación PWA para barberías profesionales. Reserva citas, gestiona clientes y haz que tu barbería fluya con estilo.

Proyecto Next.js 16 + Tailwind 4 + shadcn/ui + Supabase + PWA instalable.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📱 PWA - Instalar en Celular

1. En Chrome (Android) o Safari (iOS) abre la app en localhost o en producción.
2. Toca el menú ⋮ > "Instalar BarberFlow" o "Agregar a pantalla de inicio".
3. ¡Listo! Funciona offline con Service Worker básico.

## 📁 Estructura & Documentación

- Ver `docs/project-structure.md` para la arquitectura completa.
- Ver `docs/development-phases.md` para el roadmap de sprints cortos.
- Ver `docs/agent.md` para reglas de agentes de IA y convenciones.

## 🧭 Metodología

Usamos **sprints cortos** (no Scrum tradicional) para avanzar rápido y entregar valor real en cada iteración.

Sprint actual: **Sprint 1 - Inicialización** (completado)

## 🔗 Enlaces del Proyecto

- **Linear (tareas y sprints):** https://linear.app/luis-inc/team/BARBERFLOW/all (o el workspace real)
- **Notion (docs y research):** (agregar URL del workspace cuando exista)
- **Figma / Diseño:** (pendiente)
- **Repositorio:** (este repo)

## 🛠️ Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4 + shadcn/ui (base-nova style)
- Supabase (Auth + Postgres + Storage)
- Lucide + Sonner + date-fns
- PWA con manifest + Service Worker custom

## 📦 Scripts

- `npm run dev` - Desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servir build
- `npm run lint` - ESLint

## 🐳 Docker (Desarrollo y Producción)

Requerimientos: Docker Desktop + Docker Compose v2.

### Desarrollo local (hot reload)

```bash
npm run docker:dev
# o
docker compose up --build
```

Abre http://localhost:3000. Cambios en código se reflejan automáticamente.

Para parar: `Ctrl+C` o `docker compose down`.

### Producción (build optimizado standalone)

```bash
npm run docker:prod
# o
docker compose -f docker-compose.prod.yml up --build -d
```

- Imagen multi-stage optimizada (Next.js standalone output)
- Usuario no-root por seguridad
- Listo para deploy (VPS, Railway, Fly.io, etc.)

Ver logs: `docker compose -f docker-compose.prod.yml logs -f`

Parar: `npm run docker:prod:down`

### Build manual de imagen

```bash
npm run docker:build
docker run -p 3000:3000 barberflow:latest
```

### Variables de entorno

Copia `.env.example` (cuando exista) a `.env.local` para desarrollo.
Para producción, pasa variables al contenedor vía `environment` en `docker-compose.prod.yml` o con `--env-file`.

### Supabase local (futuro)

Cuando se configure Supabase self-hosted, se agregará servicio `supabase-db` y `supabase-studio` al compose de dev.

## 📦 Scripts (Docker)

- `npm run docker:dev` — Levantar dev con Docker
- `npm run docker:prod` — Levantar prod en background
- `npm run docker:prod:down` — Bajar prod
- `npm run docker:build` — Build solo la imagen prod

## 🧪 Definition of Done por Sprint

Cada sprint debe cumplir:
- [ ] Código compila sin errores TS/lint
- [ ] Features probadas en móvil (PWA instalable)
- [ ] Documentación actualizada
- [ ] Estructura respetada

---

BarberFlow © 2026 - Hecho con ❤️ para barberos que quieren lo mejor.
