import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { getUserByEmail } from './lib/data';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (!user.email) return false;
      
      const dbUser = await getUserByEmail(user.email);
      if (!dbUser) return false;

      return true;
    },
  },
}); 