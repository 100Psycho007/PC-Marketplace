import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { auth } from '@/auth'
import SessionProvider from '../components/SessionProvider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PC Marketplace',
  description: 'Your one-stop destination for PC components and services.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider session={session}>
          <Navigation session={session} />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
} 