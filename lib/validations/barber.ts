import { z } from "zod"

export const barberSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().optional(),
  specialties: z.array(z.string()).min(1, "Debe tener al menos una especialidad"),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Color inválido"),
  isActive: z.boolean().default(true),
})

export type BarberFormData = z.infer<typeof barberSchema>
