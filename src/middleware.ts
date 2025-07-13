import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export default auth((req) => {
  if (req.nextUrl.pathname.startsWith('/dashboard') && req.auth?.user?.role !== 'admin') {
    return NextResponse.rewrite(new URL('/auth/signin', req.url))
  }
})

export const config = {
  matcher: ['/dashboard/:path*'],
}