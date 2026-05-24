import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { barberSchema } from '@/lib/validations/barber'

export async function GET() {
  try {
    const barbers = await prisma.barber.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(barbers)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener barberos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validation = barberSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const data = validation.data

    const barber = await prisma.barber.create({
      data: {
        name: data.name,
        phone: data.phone || null,
        specialties: data.specialties,
        color: data.color,
        isActive: data.isActive ?? true,
      },
    })

    return NextResponse.json(barber, { status: 201 })
  } catch (error) {
    console.error('Error al crear barbero:', error)
    return NextResponse.json({ error: 'Error al crear barbero' }, { status: 500 })
  }
}
