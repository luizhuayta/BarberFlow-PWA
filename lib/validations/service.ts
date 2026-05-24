import { z } from "zod"

export const serviceSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  durationMinutes: z.coerce.number().min(5, "Mínimo 5 minutos").max(300, "Máximo 5 horas"),
  price: z.coerce.number().min(1, "El precio debe ser mayor a 0"),
  description: z.string().optional(),
  color: z.string().optional().default("#f59e0b"), // amber por defecto
  isActive: z.boolean().default(true),
})

export type ServiceFormData = z.infer<typeof serviceSchema>
