// This route is obsolete. All MongoDB/connectDB code has been removed. You can delete this file.

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Starting MongoDB connection test...')
    
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not defined in environment variables')
      return NextResponse.json(
        { error: 'MongoDB URI not configured' },
        { status: 500 }
      )
    }

    console.log('MongoDB URI found, attempting connection...')
    const conn = await connectDB()
    
    if (!conn) {
      console.error('Connection returned null')
      return NextResponse.json(
        { error: 'Failed to establish connection' },
        { status: 500 }
      )
    }

    console.log('MongoDB connection successful!')
    return NextResponse.json({ 
      status: 'Connected to MongoDB!',
      message: 'Database connection successful'
    })
  } catch (error) {
    console.error('MongoDB connection error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to connect to MongoDB',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 