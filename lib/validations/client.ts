import { z } from "zod"

export const clientSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(6, "Teléfono inválido").optional().or(z.literal("")),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  notes: z.string().optional(),
})

export type ClientFormData = z.infer<typeof clientSchema>
