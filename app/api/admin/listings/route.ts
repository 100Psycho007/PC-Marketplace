import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  // TODO: Add Neon Auth session check if needed
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const listings = await prisma.listing.findMany();
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching listings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // TODO: Add Neon Auth session check if needed
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const listing = await prisma.listing.create({
      data: body
    });

    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating listing' }, { status: 500 });
  }
} 