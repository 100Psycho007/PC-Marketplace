// This route needs to be refactored to use Prisma/Postgres instead of the deleted Component model.
// All mongoose/mongodb code has been removed.

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET /api/components/[id] - Get a specific component
export async function GET(request: Request, { params }: { params: { id: string } }) {
  // The Component model is no longer available, so we'll leave the code as it is.
  // The code to get a component will be refactored to use Prisma/Postgres.
  return NextResponse.json({ message: 'This route needs to be refactored to use Prisma/Postgres.' });
}

// PUT /api/components/[id] - Update a component (admin only)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  // The Component model is no longer available, so we'll leave the code as it is.
  // The code to update a component will be refactored to use Prisma/Postgres.
  return NextResponse.json({ message: 'This route needs to be refactored to use Prisma/Postgres.' });
}

// DELETE /api/components/[id] - Delete a component (admin only)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // The Component model is no longer available, so we'll leave the code as it is.
  // The code to delete a component will be refactored to use Prisma/Postgres.
  return NextResponse.json({ message: 'This route needs to be refactored to use Prisma/Postgres.' });
}

// PATCH /api/components/[id] - Update a component (admin only)
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  // The Component model is no longer available, so we'll leave the code as it is.
  // The code to patch a component will be refactored to use Prisma/Postgres.
  return NextResponse.json({ message: 'This route needs to be refactored to use Prisma/Postgres.' });
}

// TODO: Add Neon Auth session check if needed 