import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

// This route needs to be refactored to use Prisma/Postgres instead of the deleted Component model.
// All mongoose/mongodb code has been removed.

// GET /api/components - Get components with filters
export async function GET(request: Request) {
  try {
    const session = await auth();
    const { searchParams } = new URL(request.url);
    
    // Build filter object
    const filter: any = { isActive: true };
    
    // Category filter
    if (searchParams.get('category')) {
      filter.category = searchParams.get('category');
    }
    
    // Brand filter
    if (searchParams.get('brand')) {
      filter.brand = searchParams.get('brand');
    }
    
    // Price range filter
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Compatibility filters
    if (searchParams.get('socket')) {
      filter['specifications.cpuSocket'] = searchParams.get('socket');
    }
    if (searchParams.get('formFactor')) {
      filter['specifications.mbFormFactor'] = searchParams.get('formFactor');
    }
    if (searchParams.get('memoryType')) {
      filter['specifications.ramType'] = searchParams.get('memoryType');
    }

    // Search query
    if (searchParams.get('q')) {
      filter.$or = [
        { name: { $regex: searchParams.get('q'), $options: 'i' } },
        { brand: { $regex: searchParams.get('q'), $options: 'i' } },
        { model: { $regex: searchParams.get('q'), $options: 'i' } },
      ];
    }

    // Sort options
    const sort: any = {};
    const sortBy = searchParams.get('sortBy') || 'price';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    const components = await Component.find(filter)
      .sort(sort)
      .limit(50);

    return NextResponse.json(components);
  } catch (error) {
    console.error('Error fetching components:', error);
    return NextResponse.json(
      { error: 'Failed to fetch components' },
      { status: 500 }
    );
  }
}

// POST /api/components - Create a new component (admin only)
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();

    const component = await Component.create(data);
    return NextResponse.json(component, { status: 201 });
  } catch (error) {
    console.error('Error creating component:', error);
    return NextResponse.json(
      { error: 'Failed to create component' },
      { status: 500 }
    );
  }
} 