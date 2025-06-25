// This route needs to be refactored to use Prisma/Postgres instead of the deleted Listing model.
// All mongoose/mongodb code has been removed.

import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'admin') {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

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

    return NextResponse.json({});
  } catch (error) {
    console.error('Error updating listing:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 