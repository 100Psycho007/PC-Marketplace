'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Listing {
  _id: string;
  title: string;
  category: string;
  price: number;
  location: {
    city: string;
    state: string;
  };
  images: string[];
  condition: string;
  isFeatured: boolean;
  createdAt: string;
}

export default function MarketplacePage() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    city: searchParams.get('city') || '',
  });

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const fetchListings = async () => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`/api/listings?${queryParams}`);
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">All Categories</option>
              <option value="CPU">CPU</option>
              <option value="GPU">GPU</option>
              <option value="RAM">RAM</option>
              <option value="Motherboard">Motherboard</option>
              <option value="Storage">Storage</option>
              <option value="PSU">PSU</option>
              <option value="Case">Case</option>
              <option value="Cooling">Cooling</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={filters.city}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Listings Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : listings.length === 0 ? (
            <div className="text-center py-8">No listings found</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <Link
                  href={`/marketplace/${listing._id}`}
                  key={listing._id}
                  className={`block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                    listing.isFeatured ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="relative h-48">
                    <Image
                      src={listing.images[0] || '/placeholder.png'}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                    {listing.isFeatured && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{listing.category}</p>
                    <p className="text-xl font-bold text-blue-600 mb-2">
                      ₹{listing.price.toLocaleString()}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{listing.location.city}</span>
                      <span>{listing.condition}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 