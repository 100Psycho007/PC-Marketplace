'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MarketplaceClient from './MarketplaceClient';

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
    category: searchParams?.get('category') || '',
    minPrice: searchParams?.get('minPrice') || '',
    maxPrice: searchParams?.get('maxPrice') || '',
    city: searchParams?.get('city') || '',
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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6 animate-fade-in">
            PC Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover premium gaming rigs, custom builds, and high-performance components 
            from trusted sellers in our community
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="backdrop-blur-xl bg-card/80 rounded-3xl p-8 mb-12 border border-border shadow-2xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Search</label>
              <input
                type="text"
                placeholder="Search listings..."
                className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Category</label>
              <select className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent backdrop-blur-sm">
                <option value="">All Categories</option>
                <option value="gaming">Gaming PCs</option>
                <option value="workstation">Workstations</option>
                <option value="components">Components</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Price Range</label>
              <select className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent backdrop-blur-sm">
                <option value="">Any Price</option>
                <option value="0-500">$0 - $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-2000">$1,000 - $2,000</option>
                <option value="2000+">$2,000+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="backdrop-blur-xl bg-card/80 rounded-3xl p-6 border border-border shadow-2xl animate-pulse">
                <div className="h-48 bg-muted rounded-2xl mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
        }>
          <MarketplaceClient />
        </Suspense>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="backdrop-blur-xl bg-card/80 rounded-3xl p-8 border border-border shadow-2xl">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Sell Your PC?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join our community of sellers and reach thousands of potential buyers
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl hover:from-primary/80 hover:to-secondary/80 transform hover:scale-105 transition-all duration-300 shadow-2xl">
              Create Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 