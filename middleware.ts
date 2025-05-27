import { auth } from '@/auth';
import { NextResponse } from "next/server";

export default auth((req) => {
  const token = req.auth;
  const isAdmin = token?.user?.role === "admin";

  if (req.nextUrl.pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
}; 