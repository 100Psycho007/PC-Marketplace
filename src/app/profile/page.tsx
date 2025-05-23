'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [name, setName] = useState(session?.user?.name || '')
  const [isUpdating, setIsUpdating] = useState(false)

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Please sign in to view your profile
            </h2>
          </div>
        </div>
      </div>
    )
  }

  const handleProfileUpdate = async () => {
    try {
      setIsUpdating(true)
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      await update({ name })
      router.refresh()
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center space-x-4 mb-8">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-xl">
                      {session.user?.name?.[0] || 'U'}
                    </span>
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {session.user?.name}
                  </h1>
                  <p className="text-gray-500">{session.user?.email}</p>
                </div>
              </div>

              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`${
                      activeTab === 'profile'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('listings')}
                    className={`${
                      activeTab === 'listings'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    My Listings
                  </button>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`${
                      activeTab === 'bookings'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Bookings
                  </button>
                </nav>
              </div>

              <div className="mt-6">
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={session.user?.email || ''}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        disabled
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={handleProfileUpdate}
                        disabled={isUpdating}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUpdating ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'listings' && (
                  <div className="text-center py-12">
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No listings yet
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by creating a new listing.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Create Listing
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'bookings' && (
                  <div className="text-center py-12">
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No bookings yet
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Book a technician to get started.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Book Technician
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 