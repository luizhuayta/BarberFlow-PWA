import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { clientId: params.id },
      orderBy: { startTime: 'desc' },
      take: 20,
      include: {
        // We'll add relations later when models are linked
      },
    })

    // For now return basic data (we can enhance later)
    const formatted = appointments.map((a) => ({
      id: a.id,
      startTime: a.startTime,
      status: a.status,
      barber: null,   // placeholder until relations
      service: null,  // placeholder
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    return NextResponse.json({ error: 'Error al cargar historial' }, { status: 500 })
  }
}
