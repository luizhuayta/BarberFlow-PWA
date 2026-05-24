import { barberSchema } from '@/lib/validations/barber'

describe('barberSchema validation', () => {
  it('validates correct data', () => {
    const result = barberSchema.safeParse({
      name: 'Carlos Mendoza',
      phone: '999888777',
      specialties: ['Corte', 'Barba'],
      color: '#f59e0b',
      isActive: true,
    })

    expect(result.success).toBe(true)
  })

  it('fails when specialties is empty', () => {
    const result = barberSchema.safeParse({
      name: 'Carlos',
      specialties: [],
      color: '#f59e0b',
    })

    expect(result.success).toBe(false)
  })

  it('fails with invalid color', () => {
    const result = barberSchema.safeParse({
      name: 'Carlos',
      specialties: ['Corte'],
      color: 'red',
    })

    expect(result.success).toBe(false)
  })
})
