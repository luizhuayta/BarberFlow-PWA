import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // Necesitamos crear este cliente

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

    const service = await prisma.service.create({
      data: {
        name: body.name,
        durationMinutes: body.durationMinutes,
        price: body.price,
        description: body.description || null,
        color: body.color || '#f59e0b',
        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear servicio' }, { status: 500 })
  }
}
