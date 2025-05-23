import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const data = await req.json()

    const booking = await Booking.create({
      ...data,
      customer: session.user.id,
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json(
      { error: 'Error creating booking' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const role = searchParams.get('role')

    let query: any = {}
    if (status) {
      query.status = status
    }

    if (role === 'technician') {
      query.technician = session.user.id
    } else {
      query.customer = session.user.id
    }

    const bookings = await Booking.find(query)
      .populate('technician', 'name email image')
      .populate('customer', 'name email image')
      .sort({ date: -1 })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Error fetching bookings' },
      { status: 500 }
    )
  }
} 