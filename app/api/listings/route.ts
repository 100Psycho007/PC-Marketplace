// This route needs to be refactored to use Prisma/Postgres instead of the deleted Listing model.
// All mongoose/mongodb code has been removed.

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET /api/listings - Get all listings with filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Mock data for now - replace with actual database query
    const mockListings = [
      {
        _id: '1',
        title: 'RTX 4090 Gaming X',
        description: 'Latest NVIDIA graphics card for ultimate gaming performance',
        price: 145000,
        category: 'GPU',
        condition: 'New',
        seller: 'TechZone',
        location: {
          city: 'Mumbai',
          state: 'Maharashtra'
        },
        images: ['/api/placeholder/400/300'],
        createdAt: '2024-03-15T12:00:00.000Z',
        isFeatured: true,
      },
      {
        _id: '2',
        title: 'Intel Core i9-13900K',
        description: 'High-performance processor for gaming and content creation',
        price: 42000,
        category: 'CPU',
        condition: 'New',
        seller: 'PC Masters',
        location: {
          city: 'Delhi',
          state: 'Delhi'
        },
        images: ['/api/placeholder/400/300'],
        createdAt: '2024-03-14T12:00:00.000Z',
        isFeatured: false,
      },
      {
        _id: '3',
        title: 'Samsung 990 Pro 2TB',
        description: 'Ultra-fast NVMe SSD for lightning-fast storage',
        price: 18000,
        category: 'Storage',
        condition: 'New',
        seller: 'Gaming Hub',
        location: {
          city: 'Bangalore',
          state: 'Karnataka'
        },
        images: ['/api/placeholder/400/300'],
        createdAt: '2024-03-13T12:00:00.000Z',
        isFeatured: true,
      },
      {
        _id: '4',
        title: 'Corsair Vengeance 32GB DDR5',
        description: 'High-speed memory for gaming and productivity',
        price: 8500,
        category: 'RAM',
        condition: 'New',
        seller: 'Build Pro',
        location: {
          city: 'Chennai',
          state: 'Tamil Nadu'
        },
        images: ['/api/placeholder/400/300'],
        createdAt: '2024-03-15T12:00:00.000Z',
        isFeatured: false,
      },
      {
        _id: '5',
        title: 'ASUS ROG Strix B760-F',
        description: 'Premium motherboard for Intel 13th/14th gen processors',
        price: 22000,
        category: 'Motherboard',
        condition: 'New',
        seller: 'TechZone',
        location: {
          city: 'Hyderabad',
          state: 'Telangana'
        },
        images: ['/api/placeholder/400/300'],
        createdAt: '2024-03-14T12:00:00.000Z',
        isFeatured: true,
      },
      {
        _id: '6',
        title: 'NZXT H510 Flow',
        description: 'Modern case with excellent airflow and cable management',
        price: 7500,
        category: 'Case',
        condition: 'New',
        seller: 'PC Masters',
        location: {
          city: 'Pune',
          state: 'Maharashtra'
        },
        images: ['/api/placeholder/400/300'],
        createdAt: '2024-03-13T12:00:00.000Z',
        isFeatured: false,
      },
    ];

    // Apply filters
    let filteredListings = mockListings;
    
    if (category) {
      filteredListings = filteredListings.filter(listing => 
        listing.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      filteredListings = filteredListings.filter(listing =>
        listing.title.toLowerCase().includes(search.toLowerCase()) ||
        listing.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedListings = filteredListings.slice(startIndex, endIndex);

    // Return the listings array directly for compatibility with the client
    return NextResponse.json(paginatedListings);
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
    // TODO: Add Neon Auth session check if needed
    
    const body = await request.json();
    const { title, description, price, category, condition, location, images } = body;

    // Validate required fields
    if (!title || !description || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mock creation - replace with actual database insert
    const newListing = {
      _id: '999', // fixed id for mock
      title,
      description,
      price: parseFloat(price),
      category,
      condition: condition || 'Used',
      seller: 'Anonymous',
      location: location || { city: 'Unknown', state: 'Unknown' },
      images: images || [],
      createdAt: '2024-03-16T12:00:00.000Z', // fixed date for mock
      userId: 'anonymous',
      isFeatured: false,
    };

    return NextResponse.json(
      { listing: newListing, message: 'Listing created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
} 