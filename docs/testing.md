# Testing Guide - BarberFlow

Esta documentación explica cómo correr y escribir tests en el proyecto.

## Stack de Testing

- **Unit / Component Tests**: Jest + React Testing Library + @testing-library/jest-dom
- **E2E Tests**: Playwright (Chromium, Firefox, WebKit, Mobile)
- Soporte completo para TypeScript

## Scripts disponibles

```bash
# Ejecutar todos los tests unitarios
npm test

# Modo watch (útil durante desarrollo)
npm run test:watch

# Ejecutar tests E2E (Playwright)
npm run test:e2e

# Ejecutar tests E2E con UI visual (recomendado para debug)
npm run test:e2e:ui
```

## Estructura de archivos

```
__tests__/
├── components/
│   └── button.test.tsx
└── lib/
    └── utils.test.tsx

e2e/
├── homepage.spec.ts
└── auth.spec.ts
```

## Cómo escribir un nuevo test unitario

```tsx
// __tests__/components/mi-componente.test.tsx
import { render, screen } from '@testing-library/react'
import { MiComponente } from '@/components/mi-componente'

describe('MiComponente', () => {
  it('renderiza correctamente', () => {
    render(<MiComponente />)
    expect(screen.getByText('Hola BarberFlow')).toBeInTheDocument()
  })
})
```

## Cómo escribir un nuevo test E2E

```ts
// e2e/mi-flujo.spec.ts
import { test, expect } from '@playwright/test'

test('mi flujo funciona', async ({ page }) => {
  await page.goto('/ruta')
  await expect(page.getByText('Texto esperado')).toBeVisible()
})
```

## Notas importantes

- Los tests de Jest ignoran la carpeta `e2e/` automáticamente.
- Playwright levanta automáticamente el servidor de desarrollo (`npm run dev`).
- Para tests que requieran Supabase, usa mocks o variables de entorno de test.
- En CI (futuro GitHub Actions) se recomienda:
  - `npm test`
  - `npm run test:e2e` (con `CI=true`)

## Recomendaciones

- Escribe tests para componentes que tengan lógica o interacciones.
- Usa `userEvent` de `@testing-library/user-event` para simular interacciones reales.
- Para componentes con `use client` y hooks complejos, considera `renderHook`.

---

Actualizado: Sprint 1 - LUI-16
