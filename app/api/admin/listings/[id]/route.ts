import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import { Listing } from '@/models/Listing';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await connectDB();
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return new NextResponse(
        JSON.stringify({ error: 'Status is required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!['active', 'pending', 'sold', 'rejected'].includes(status)) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid status value' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const listing = await Listing.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!listing) {
      return new NextResponse(
        JSON.stringify({ error: 'Listing not found' }), 
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Error updating listing:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 