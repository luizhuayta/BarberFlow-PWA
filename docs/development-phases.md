# Development Phases - BarberFlow

BarberFlow se desarrolla en **sprints cortos** (no Scrum formal). Cada sprint tiene:
- User Story
- Acceptance Criteria
- Tasks concretas
- Definition of Done

Objetivo: entregas rápidas de valor, feedback constante del cliente (barbero).

---

## Sprint 1: Inicialización + PWA Base (LUI-13 + LUI-14) ✅ Completado

**Linear Issues:**
- LUI-13: Inicialización del proyecto (estructura, shadcn, docs) ✅
- LUI-14: PWA instalable en celular (standalone + portrait) ✅

**Acceptance Criteria (LUI-14):**
- [x] Se puede instalar desde Chrome/Safari en Android e iOS
- [x] Modo `standalone` (sin barra del navegador)
- [x] Orientación `portrait` por defecto
- [x] Íconos 192×192 y 512×512 PNG reales (monograma BF dorado sobre fondo oscuro)
- [x] `theme_color` y `background_color` aplicados
- [x] Service Worker cachea assets (offline básico)
- [x] Botón "Instalar en el celular" en el hero (beforeinstallprompt)

**Tasks completadas:**
- [x] manifest.ts con `display: 'standalone'`, `orientation: 'portrait'`
- [x] Íconos PWA generados (PNG 192/512 profesionales)
- [x] Service Worker registrado + cache-first
- [x] Componente `<InstallPWA />` reutilizable
- [x] Estructura base + lib/supabase + types creados (LUI-13)
- [ ] Probar en teléfono físico Android + iOS (tarea manual del usuario)

**Definition of Done (LUI-14):**  
PWA se instala correctamente en celular real y abre en modo app nativa (sin URL bar). ✅ Código listo.

---

## Sprint 2: (Pendiente - Definir con el barbero)

Ejemplos posibles:
- Autenticación con Supabase (email + magic link o phone)
- Landing page bonita con hero, beneficios y CTA "Reservar cita"
- Formulario básico de reserva (fecha/hora, servicio)
- Dashboard mínimo para el barbero (ver citas del día)

---

## Roadmap General (Sujeto a cambios)

1. Setup & PWA base ✅
2. Auth + Perfiles (clientes y barberos)
3. Sistema de Citas (calendario simple + reservas)
4. Gestión de Clientes y Servicios
5. Notificaciones push / recordatorios
6. Pagos (opcional)
7. Dashboard analítico + reportes
8. Optimización PWA y offline completo
9. Lanzamiento y feedback

---

## Notas

- Cada nuevo sprint debe documentarse aquí antes de empezar.
- Priorizar features que generen revenue o retención inmediata para la barbería.
- Mantener el proyecto deployable en Vercel en todo momento.

Actualizado: 23 Mayo 2026 - Sprint 1 completado al 100% (LUI-13 + LUI-14 + Docker LUI-12)
