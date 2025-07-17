// This route needs to be refactored to use Prisma/Postgres instead of the deleted Listing and User models.
// All mongoose/mongodb code has been removed.

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // TODO: Add Neon Auth session check if needed

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