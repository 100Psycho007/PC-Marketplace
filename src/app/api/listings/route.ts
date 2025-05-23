import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectDB } from '@/lib/mongodb';
import { Listing } from '@/models/Listing';

// GET /api/listings - Get all listings with filters
export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    
    // Build filter object
    const filter: any = { status: 'active' };
    
    // Category filter
    if (searchParams.get('category')) {
      filter.category = searchParams.get('category');
    }
    
    // Price range filter
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Location filter
    if (searchParams.get('city')) {
      filter['location.city'] = searchParams.get('city');
    }
    
    // Search query
    if (searchParams.get('q')) {
      filter.$or = [
        { title: { $regex: searchParams.get('q'), $options: 'i' } },
        { description: { $regex: searchParams.get('q'), $options: 'i' } },
      ];
    }

    // Sort by featured status and date
    const sort: any = { isFeatured: -1, createdAt: -1 };
    
    const listings = await Listing.find(filter)
      .sort(sort)
      .populate('seller', 'name email')
      .limit(20);

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

// POST /api/listings - Create a new listing
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const data = await request.json();

    // Create new listing
    const listing = await Listing.create({
      ...data,
      seller: session.user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
} 