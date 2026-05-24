import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('login page renders form correctly', async ({ page }) => {
    await page.goto('/login')

    await expect(page.getByRole('heading', { name: /barberflow/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/contraseña/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /iniciar sesión/i })).toBeVisible()
  })

  test('signup page renders and has link back to login', async ({ page }) => {
    await page.goto('/signup')

    await expect(page.getByRole('button', { name: /crear cuenta/i })).toBeVisible()
    await expect(page.getByText(/ya tienes cuenta/i)).toBeVisible()
    await page.getByRole('link', { name: /inicia sesión/i }).click()
    await expect(page).toHaveURL(/\/login/)
  })
})
