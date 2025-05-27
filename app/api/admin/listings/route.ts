import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectDB from '@/lib/mongodb';
import { Listing } from '@/models/Listing';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await connectDB();
    const listings = await Listing.find()
      .populate('seller', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch listings' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 