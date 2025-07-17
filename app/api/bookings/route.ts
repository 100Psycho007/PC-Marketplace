// This route needs to be refactored to use Prisma/Postgres instead of the deleted Booking model.
// All mongoose/mongodb code has been removed.

import { NextResponse } from 'next/server'
// TODO: Add Neon Auth session check if needed

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    // const session = await auth()
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const data = await req.json()

    // const booking = await Booking.create({
    //   ...data,
    //   customer: session.user.id,
    // })

    return NextResponse.json(data)
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
    // const session = await auth()
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const role = searchParams.get('role')

    let query: any = {}
    if (status) {
      query.status = status
    }

    if (role === 'technician') {
      // query.technician = session.user.id
    } else {
      // query.customer = session.user.id
    }

    // const bookings = await Booking.find(query)
    //   .populate('technician', 'name email image')
    //   .populate('customer', 'name email image')
    //   .sort({ date: -1 })

    return NextResponse.json(query)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Error fetching bookings' },
      { status: 500 }
    )
  }
} 