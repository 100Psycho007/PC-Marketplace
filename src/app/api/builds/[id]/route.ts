import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectDB from '@/lib/mongodb';
import { PCBuild } from '@/models/PCBuild';

export const dynamic = 'force-dynamic';

// GET /api/builds/[id] - Get a specific PC build
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const build = await PCBuild.findById(params.id)
      .populate('user', 'name email')
      .populate('components.cpu')
      .populate('components.motherboard')
      .populate('components.gpu')
      .populate('components.ram')
      .populate('components.storage')
      .populate('components.psu')
      .populate('components.case')
      .populate('components.cooling');

    if (!build) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      );
    }

    // Check if user is authorized to view this build
    if (build.user.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(build);
  } catch (error) {
    console.error('Error fetching build:', error);
    return NextResponse.json(
      { error: 'Failed to fetch build' },
      { status: 500 }
    );
  }
}

// PUT /api/builds/[id] - Update a PC build
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
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

    // Check if user is authorized to update this build
    if (build.user.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Update build with new data
    const updatedBuild = await PCBuild.findByIdAndUpdate(
      params.id,
      { $set: data },
      { new: true, runValidators: true }
    )
      .populate('user', 'name email')
      .populate('components.cpu')
      .populate('components.motherboard')
      .populate('components.gpu')
      .populate('components.ram')
      .populate('components.storage')
      .populate('components.psu')
      .populate('components.case')
      .populate('components.cooling');

    return NextResponse.json(updatedBuild);
  } catch (error) {
    console.error('Error updating build:', error);
    return NextResponse.json(
      { error: 'Failed to update build' },
      { status: 500 }
    );
  }
}

// DELETE /api/builds/[id] - Delete a PC build
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
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

    // Check if user is authorized to delete this build
    if (build.user.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await PCBuild.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Build deleted successfully' });
  } catch (error) {
    console.error('Error deleting build:', error);
    return NextResponse.json(
      { error: 'Failed to delete build' },
      { status: 500 }
    );
  }
} 