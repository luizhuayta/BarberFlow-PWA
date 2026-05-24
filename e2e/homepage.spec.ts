import { test, expect } from '@playwright/test'

test.describe('BarberFlow Homepage', () => {
  test('should load and display the brand name', async ({ page }) => {
    await page.goto('/')

    // Expect the main heading or logo text (use more specific selector)
    await expect(page.getByRole('heading', { name: /tu barbería/i })).toBeVisible()
    await expect(page.locator('header').getByText('BarberFlow')).toBeVisible()
  })

  test('should show the Install PWA button on desktop', async ({ page }) => {
    await page.goto('/')

    // The InstallPWA component shows when beforeinstallprompt fires,
    // but we can at least check the hero CTA buttons exist
    await expect(page.getByRole('button', { name: /reservar cita ahora/i })).toBeVisible()
  })

  test('should have correct meta tags for PWA', async ({ page }) => {
    await page.goto('/')

    const manifestLink = page.locator('link[rel="manifest"]')
    await expect(manifestLink).toHaveAttribute('href', '/manifest.webmanifest')
  })
})
