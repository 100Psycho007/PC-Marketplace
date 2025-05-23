import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import { Listing } from '@/models/Listing';

type Props = {
  params: {
    id: string;
  };
};

export async function PATCH(
  req: NextRequest,
  props: Props
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectDB();
    const { id } = props.params;
    const body = await req.json();
    const { status } = body;

    const listing = await Listing.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!listing) {
      return new NextResponse('Listing not found', { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Error updating listing:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 