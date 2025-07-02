'use client'

import { useState } from 'react'
import ListingCard from '@/components/ListingCard'

// Mock data for demonstration
const mockListings = [
  {
    id: '1',
    title: 'RTX 3080 Founders Edition',
    price: 45000,
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=RTX+3080',
    condition: 'Like New',
    location: 'Mumbai',
    createdAt: new Date('2024-03-15'),
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Ryzen 9 5950X',
    price: 25000,
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Ryzen+9+5950X',
    condition: 'Used',
    location: 'Delhi',
    createdAt: new Date('2024-03-14'),
    isFeatured: false,
  },
  // Add more mock listings as needed
]

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 })

  const categories = [
    'all',
    'cpu',
    'gpu',
    'motherboard',
    'ram',
    'storage',
    'psu',
    'case',
    'cooling',
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Browse Listings</h1>
        
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search listings..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min Price"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockListings.map((listing) => (
            <ListingCard key={listing.id} {...listing} />
          ))}
        </div>
      </div>
    </div>
  )
} 