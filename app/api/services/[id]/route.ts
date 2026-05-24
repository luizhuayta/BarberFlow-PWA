import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT - Actualizar servicio
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const service = await prisma.service.update({
      where: { id: params.id },
      data: {
        name: body.name,
        durationMinutes: body.durationMinutes,
        price: body.price,
        description: body.description || null,
        color: body.color || '#f59e0b',
        isActive: body.isActive,
      },
    })

    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar servicio' }, { status: 500 })
  }
}

// DELETE - Eliminar servicio
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.service.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar servicio' }, { status: 500 })
  }
}
