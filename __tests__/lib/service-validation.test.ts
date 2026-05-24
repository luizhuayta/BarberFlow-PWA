import { serviceSchema } from '@/lib/validations/service'

describe('serviceSchema validation', () => {
  it('validates correct data', () => {
    const result = serviceSchema.safeParse({
      name: 'Corte Fade',
      durationMinutes: 45,
      price: 35,
      isActive: true,
    })

    expect(result.success).toBe(true)
  })

  it('fails when name is too short', () => {
    const result = serviceSchema.safeParse({
      name: 'A',
      durationMinutes: 30,
      price: 25,
    })

    expect(result.success).toBe(false)
  })

  it('fails when price is zero or negative', () => {
    const result = serviceSchema.safeParse({
      name: 'Barba',
      durationMinutes: 20,
      price: 0,
    })

    expect(result.success).toBe(false)
  })
})
