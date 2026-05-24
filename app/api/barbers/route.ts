import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    const barber = await prisma.barber.create({
      data: {
        name: body.name,
        phone: body.phone || null,
        specialties: body.specialties || [],
        color: body.color || '#f59e0b',
        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json(barber, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear barbero' }, { status: 500 })
  }
}
