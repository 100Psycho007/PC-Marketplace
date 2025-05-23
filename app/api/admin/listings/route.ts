import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import { Listing } from '@/models/Listing';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDatabase();
    const listings = await Listing.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 