'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Listing {
  _id: string;
  title: string;
  price: number;
  description: string;
  status: string;
}

export default function AdminListingsPage() {
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
        const response = await fetch('/api/listings');
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchListings();
    }
  }, [session]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Listings</h1>
      <div className="grid gap-4">
        {listings.map((listing) => (
          <div key={listing._id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{listing.title}</h2>
            <p className="text-gray-600">${listing.price}</p>
            <p className="mt-2">{listing.description}</p>
            <div className="mt-2">
              <span className={`px-2 py-1 rounded text-sm ${
                listing.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {listing.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 