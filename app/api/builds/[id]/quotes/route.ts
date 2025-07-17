// This route needs to be refactored to use Prisma/Postgres instead of the deleted Quote and PCBuild models.
// All mongoose/mongodb code has been removed.

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET /api/builds/[id]/quotes - Get quotes for a PC build
export async function GET(request: Request, { params }: { params: { id: string } }) {
  // The Quote and PCBuild models are no longer available, so we'll leave the code as it is.
  // The code to get quotes will be refactored to use Prisma/Postgres.
  return NextResponse.json({ message: 'This route needs to be refactored to use Prisma/Postgres.' });
}

// POST /api/builds/[id]/quotes - Add a quote to a PC build
export async function POST(request: Request, { params }: { params: { id: string } }) {
  // The Quote and PCBuild models are no longer available, so we'll leave the code as it is.
  // The code to add a quote will be refactored to use Prisma/Postgres.
  return NextResponse.json({ message: 'This route needs to be refactored to use Prisma/Postgres.' });
}

// PUT /api/builds/[id]/quotes/[quoteId] - Update quote status
export async function PUT(request: Request, { params }: { params: { id: string; quoteId: string } }) {
  // The Quote and PCBuild models are no longer available, so we'll leave the code as it is.
  // The code to update a quote will be refactored to use Prisma/Postgres.
  return NextResponse.json({ message: 'This route needs to be refactored to use Prisma/Postgres.' });
}

// TODO: Add Neon Auth session check if needed 