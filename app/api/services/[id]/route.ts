import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { serviceSchema } from '@/lib/validations/service'

// PUT - Actualizar servicio
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const service = await prisma.service.update({
      where: { id: params.id },
      data: {
        name: data.name,
        durationMinutes: data.durationMinutes,
        price: data.price,
        description: data.description || null,
        color: data.color || '#f59e0b',
        isActive: data.isActive,
      },
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error('Error al actualizar servicio:', error)
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
