'use client';

export const dynamic = "force-dynamic";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Listing {
  _id: string;
  title: string;
  price: number;
  status: string;
  createdAt: string;
  seller: {
    name: string;
    email: string;
  };
}

export default function AdminListings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/admin/listings');
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.role === 'admin') {
      fetchListings();
    }
  }, [session]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/listings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setListings(listings.map(listing => 
          listing._id === id ? { ...listing, status: newStatus } : listing
        ));
      }
    } catch (error) {
      console.error('Error updating listing status:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">Listings</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage all listings in your marketplace. Update status, view details, and monitor activity.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/marketplace/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto transition-colors duration-150"
          >
            Add listing
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Created
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {listings.map((listing) => (
                    <tr key={listing._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {listing.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${listing.price.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <select
                          value={listing.status}
                          onChange={(e) => handleStatusChange(listing._id, e.target.value)}
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            listing.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : listing.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : listing.status === 'sold'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="sold">Sold</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(listing.createdAt).toLocaleDateString()}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          href={`/marketplace/${listing._id}`}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 