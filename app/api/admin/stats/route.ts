// This route needs to be refactored to use Prisma/Postgres instead of the deleted Listing and User models.
// All mongoose/mongodb code has been removed.

import { NextResponse } from 'next/server';
import { auth } from '@/auth';

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

    return NextResponse.json({
      totalListings: 0,
      activeListings: 0,
      totalUsers: 0,
      recentListings: [],
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch admin stats' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 