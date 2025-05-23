import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { connectDB } from '@/lib/mongodb';
import { PCBuild } from '@/models/PCBuild';
import { Types } from 'mongoose';

interface Quote {
  _id: Types.ObjectId;
  dealer: Types.ObjectId;
  price: number;
  notes: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

// GET /api/builds/[id]/quotes - Get quotes for a PC build
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const build = await PCBuild.findById(params.id);

    if (!build) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      );
    }

    // Check if user is authorized to view quotes
    if (build.user.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(build.quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}

// POST /api/builds/[id]/quotes - Add a quote to a PC build
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'dealer') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const build = await PCBuild.findById(params.id);

    if (!build) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      );
    }

    const data = await request.json();
    const quote = {
      dealer: session.user.id,
      price: data.price,
      notes: data.notes,
      status: 'pending',
      createdAt: new Date(),
    };

    // Add quote to build
    build.quotes.push(quote);
    build.status = 'quoted';
    await build.save();

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error('Error adding quote:', error);
    return NextResponse.json(
      { error: 'Failed to add quote' },
      { status: 500 }
    );
  }
}

// PUT /api/builds/[id]/quotes/[quoteId] - Update quote status
export async function PUT(
  request: Request,
  { params }: { params: { id: string; quoteId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const build = await PCBuild.findById(params.id);

    if (!build) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      );
    }

    const quote = build.quotes.id(params.quoteId);
    if (!quote) {
      return NextResponse.json(
        { error: 'Quote not found' },
        { status: 404 }
      );
    }

    const data = await request.json();

    // Check if user is authorized to update quote
    if (session.user.role === 'dealer' && quote.dealer.toString() !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Update quote status
    if (data.status) {
      quote.status = data.status;
      
      // If quote is accepted, update build status
      if (data.status === 'accepted') {
        build.status = 'accepted';
        // Reject other quotes
        build.quotes.forEach((q: Quote) => {
          if (q._id.toString() !== params.quoteId) {
            q.status = 'rejected';
          }
        });
      }
    }

    await build.save();
    return NextResponse.json(quote);
  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json(
      { error: 'Failed to update quote' },
      { status: 500 }
    );
  }
} 