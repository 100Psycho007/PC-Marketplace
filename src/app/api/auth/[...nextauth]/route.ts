import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        try {
          await connectDB()
          const existingUser = await User.findOne({ email: user.email })

          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
            })
          }

          return true
        } catch (error) {
          console.error('Error during sign in:', error)
          return false
        }
      }
      return true
    },
    async session({ session }: any) {
      try {
        await connectDB()
        const user = await User.findOne({ email: session.user.email })
        if (user) {
          session.user.id = user._id.toString()
          session.user.role = user.role
        }
        return session
      } catch (error) {
        console.error('Error during session:', error)
        return session
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 