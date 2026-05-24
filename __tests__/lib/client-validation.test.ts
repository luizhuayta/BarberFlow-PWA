import { clientSchema } from '@/lib/validations/client'

describe('clientSchema validation', () => {
  it('validates correct client data', () => {
    const result = clientSchema.safeParse({
      name: 'Juan Pérez',
      phone: '999888777',
      email: 'juan@email.com',
    })
    expect(result.success).toBe(true)
  })

  it('fails when name is too short', () => {
    const result = clientSchema.safeParse({
      name: 'J',
    })
    expect(result.success).toBe(false)
  })
})
