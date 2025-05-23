import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import { Listing } from '@/models/Listing';
import User from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 });
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
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 