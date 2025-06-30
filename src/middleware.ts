import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Public paths that don't require authentication
    const publicPaths = [
      '/',
      '/marketplace',
      '/listings',
      '/builder',
      '/auth/signin',
      '/auth/signup',
      '/api/auth/login',
      '/api/auth/register',
    ];
    if (publicPaths.includes(pathname)) {
      return NextResponse.next();
    }

    // Check if the path is an API route
    const isApiRoute = pathname.startsWith('/api/');
    
    if (!token) {
      if (isApiRoute) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    const payload = verifyToken(token);
    if (!payload) {
      if (isApiRoute) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Check admin routes
    if (pathname.startsWith('/admin') && payload.role !== 'admin') {
      if (isApiRoute) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 