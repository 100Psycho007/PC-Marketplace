'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  session: {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  } | null;
}

export default function Navigation({ session }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">PC Marketplace</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/marketplace"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/marketplace'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Marketplace
              </Link>
              <Link
                href="/technicians"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/technicians'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Technicians
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Profile
                </Link>
                {session.user.email === 'admin@example.com' && (
                  <Link
                    href="/admin"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="text-gray-500 hover:text-gray-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 