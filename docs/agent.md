# Agent Instructions - BarberFlow

Este archivo contiene las reglas para cualquier agente de IA (Cursor, Claude, opencode, etc.) que trabaje en el proyecto.

## Principios Fundamentales

1. **Sprints cortos, no Scrum overhead**
   - Cada entrega es un sprint pequeño (1-3 días máximo).
   - Enfocado en valor real para la barbería (citas que funcionen, no dashboards perfectos).

2. **Calidad > Velocidad**
   - Código limpio, tipado fuerte, accesible.
   - Testing implícito (verificar manualmente en cada DoD).

3. **PWA First**
   - Todo debe funcionar offline lo más posible.
   - Instalable en móviles (Android/iOS).
   - Performance: Lighthouse > 90 en PWA.

4. **Convenciones de Código**
   - Seguir estructura en `project-structure.md`.
   - Usar Server Components siempre que sea posible.
   - shadcn/ui components NO se modifican directamente (extender o crear shared).
   - Nombres en español para UI/UX (clientes, citas, turnos), inglés para código (components, types).
   - Colores: dark elegante (negro, dorado suave, acentos crema) - actualizar tokens en globals.css.

5. **Git & Entregas**
   - Una rama por User Story.
   - Commits pequeños y descriptivos.
   - Nunca commitear sin que el DoD esté 100% cumplido.

6. **Supabase**
   - Row Level Security (RLS) obligatorio.
   - Usar @supabase/ssr para sesiones en Next.
   - Nunca exponer service_role key en cliente.

7. **No hacer**
   - No agregar librerías pesadas sin justificación.
   - No crear features sin User Story + AC + Tasks.
   - No ignorar errores de TypeScript o lint.

## Flujo de Trabajo Recomendado

1. Leer User Story completa del sprint actual.
2. Revisar `development-phases.md` para contexto.
3. Crear/actualizar todo según AC.
4. Probar en móvil real (PWA).
5. Actualizar docs/README si aplica.
6. Marcar DoD completado.

## Herramientas

- Next.js 16 + React 19
- Tailwind 4 + shadcn (base-nova)
- Supabase (Auth + DB + Storage)
- Lucide icons
- Sonner para toasts
- date-fns para fechas

## Contacto / Referencias

- Linear: [link-pendiente]
- Notion: [link-pendiente]
- Figma / Diseño: (pendiente)

Recuerda: este es un proyecto real para una barbería. El código debe ser profesional y mantenible.
