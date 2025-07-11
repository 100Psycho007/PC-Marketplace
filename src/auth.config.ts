export const runtime = 'nodejs';

import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

interface User {
  id: string;
  email: string;
  name: string | null;
  password: string;
  role: string;
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: Partial<Record<'email' | 'password', unknown>> | undefined) {
        try {
          const email = typeof credentials?.email === 'string' ? credentials.email : undefined;
          const password = typeof credentials?.password === 'string' ? credentials.password : undefined;
          if (!email || !password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email }
          }) as User | null;

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            password as string,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && 'role' in user && typeof user.role === 'string' && 'id' in user && typeof user.id === 'string') {
        token.id = user.id;
        token.role = user.role as string;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token && session.user) {
        if (typeof token.id === 'string') session.user.id = token.id;
        if (typeof token.role === 'string') session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  }
} satisfies NextAuthConfig; 