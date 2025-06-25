// This route needs to be refactored to use Prisma/Postgres instead of the deleted User model.
// All mongoose/mongodb code has been removed.

import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export const dynamic = 'force-dynamic'

export async function PUT(req: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()

    // const user = await User.findOneAndUpdate(
    //   { email: session.user.email },
    //   { $set: data },
    //   { new: true }
    // )

    return NextResponse.json(data)
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Error updating profile' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // const user = await User.findOne({ email: session.user.email })

    return NextResponse.json(session)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Error fetching profile' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    // const user = await User.findOneAndUpdate(
    //   { email: session.user.email },
    //   { $set: data },
    //   { new: true }
    // )

    return NextResponse.json(data)
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Error updating profile' },
      { status: 500 }
    )
  }
} 