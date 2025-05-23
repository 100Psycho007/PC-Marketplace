import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { authOptions } from '../auth/[...nextauth]/route'

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const data = await req.json()

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: data },
      { new: true }
    )

    return NextResponse.json(user)
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
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const user = await User.findOne({ email: session.user.email })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Error fetching profile' },
      { status: 500 }
    )
  }
} 