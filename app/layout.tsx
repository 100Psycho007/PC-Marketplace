import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={null}>
            <div className="min-h-screen flex flex-col">
              <Navigation session={null} />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 