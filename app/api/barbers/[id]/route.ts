import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { barberSchema } from '@/lib/validations/barber'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const barber = await prisma.barber.update({
      where: { id: params.id },
      data: {
        name: data.name,
        phone: data.phone || null,
        specialties: data.specialties,
        color: data.color,
        isActive: data.isActive,
      },
    })

    return NextResponse.json(barber)
  } catch (error) {
    console.error('Error al actualizar barbero:', error)
    return NextResponse.json({ error: 'Error al actualizar barbero' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.barber.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar barbero' }, { status: 500 })
  }
}
