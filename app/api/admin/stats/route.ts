import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectDB from '@/lib/mongodb';
import { Listing } from '@/models/Listing';
import User from '@/models/User';

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

    const [totalListings, activeListings, totalUsers, recentListings] = await Promise.all([
      Listing.countDocuments(),
      Listing.countDocuments({ status: 'active' }),
      User.countDocuments(),
      Listing.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title price status')
        .lean(),
    ]);

    return NextResponse.json({
      totalListings,
      activeListings,
      totalUsers,
      recentListings,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch admin stats' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 