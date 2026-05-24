import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const barber = await prisma.barber.update({
      where: { id: params.id },
      data: {
        name: body.name,
        phone: body.phone || null,
        specialties: body.specialties || [],
        color: body.color || '#f59e0b',
        isActive: body.isActive,
      },
    })

    return NextResponse.json(barber)
  } catch (error) {
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
