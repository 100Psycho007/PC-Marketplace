export const runtime = 'nodejs';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { getUserByEmail } from './lib/data';

const handler = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = typeof user.id === 'string' ? user.id : '';
        token.role = typeof user.role === 'string' ? user.role : 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = typeof token.id === 'string' ? token.id : '';
        session.user.role = typeof token.role === 'string' ? token.role : 'user';
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (!user?.email) return false;
      try {
        const dbUser = await getUserByEmail(user.email);
        if (!dbUser) return false;
        return true;
      } catch (error) {
        console.error('SignIn error:', error);
        return false;
      }
    },
  },
});

export { handler as authHandler };
export const { auth, signIn, signOut } = handler; 