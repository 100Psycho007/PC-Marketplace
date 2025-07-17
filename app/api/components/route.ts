import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// This route needs to be refactored to use Prisma/Postgres instead of the deleted Component model.
// All mongoose/mongodb code has been removed.

// GET /api/components - Get components with filters
export async function GET(request: Request) {
  // The Component model is no longer available, so we'll leave the code as it is.
  // The code to get components will be refactored to use Prisma/Postgres.
  return NextResponse.json({ message: 'This route needs to be refactored to use Prisma/Postgres.' });
}

// POST /api/components - Create a new component (admin only)
export async function POST(request: Request) {
  // The Component model is no longer available, so we'll leave the code as it is.
  // The code to create a component will be refactored to use Prisma/Postgres.
  return NextResponse.json({ message: 'This route needs to be refactored to use Prisma/Postgres.' });
}

// TODO: Add Neon Auth session check if needed 