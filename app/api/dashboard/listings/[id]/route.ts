import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: params.id }
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching listing' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const listing = await prisma.listing.update({
      where: { id: params.id },
      data: body
    });

    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating listing' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.listing.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting listing' }, { status: 500 });
  }
} 