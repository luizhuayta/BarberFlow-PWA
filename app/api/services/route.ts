import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { serviceSchema } from '@/lib/validations/service'

// GET - Listar todos los servicios
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener servicios' }, { status: 500 })
  }
}

// POST - Crear nuevo servicio
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validación en el servidor
    const validation = serviceSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const data = validation.data

    const service = await prisma.service.create({
      data: {
        name: data.name,
        durationMinutes: data.durationMinutes,
        price: data.price,
        description: data.description || null,
        color: data.color || '#f59e0b',
        isActive: data.isActive ?? true,
      },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Error al crear servicio:', error)
    return NextResponse.json({ error: 'Error al crear servicio' }, { status: 500 })
  }
}
