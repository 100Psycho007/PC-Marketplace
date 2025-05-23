import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import { Listing } from '@/models/Listing';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 });
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