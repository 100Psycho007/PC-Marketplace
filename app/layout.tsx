import './globals.css'
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import SessionProvider from '@/components/SessionProvider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0E0E10] text-[#F1F5F9] antialiased`}><StackProvider app={stackServerApp}><StackTheme>
        <SessionProvider session={null}>
          <div className="min-h-screen flex flex-col">
            <Navigation session={null} />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </SessionProvider>
      </StackTheme></StackProvider></body>
    </html>
  )
} 