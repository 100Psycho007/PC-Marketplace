import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JWTPayload {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function getTokenFromCookies(): string | null {
  const cookieStore = cookies();
  return cookieStore.get('token')?.value || null;
}

export function setTokenCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export function removeTokenCookie() {
  const cookieStore = cookies();
  cookieStore.delete('token');
} 