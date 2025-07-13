import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const technicians = await prisma.technician.findMany()
    return NextResponse.json(technicians)
  } catch (error) {
    console.error('Error fetching technicians:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
