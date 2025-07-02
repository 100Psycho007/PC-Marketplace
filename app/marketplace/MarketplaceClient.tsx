'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Listing {
  _id: string
  title: string
  description: string
  price: number
  category: string
  condition: string
  images: string[]
  location: {
    city: string
    state: string
  }
  isFeatured?: boolean
  createdAt: string
}

export default function MarketplaceClient() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const params = new URLSearchParams(searchParams ? searchParams : undefined)
        const response = await fetch(`/api/listings?${params}`)
        if (response.ok) {
          const data = await response.json()
          setListings(data)
        }
      } catch (error) {
        console.error('Error fetching listings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [searchParams])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="backdrop-blur-xl bg-card/80 rounded-3xl p-6 border border-border shadow-2xl animate-pulse">
            <div className="h-48 bg-muted rounded-2xl mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="backdrop-blur-xl bg-card/80 rounded-3xl p-12 border border-border shadow-2xl">
          <h3 className="text-2xl font-bold text-foreground mb-4">No listings found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search criteria or check back later</p>
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground">
            Browse All Listings
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {listings.map((listing) => (
        <Link
          href={`/listings/${listing._id}`}
          key={listing._id}
          className="group block"
        >
          <div className={`backdrop-blur-xl bg-card/80 rounded-3xl overflow-hidden border border-border shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 hover:bg-muted/60 ${
            listing.isFeatured ? 'ring-2 ring-accent/50' : ''
          }`}>
            <div className="relative h-48 overflow-hidden">
              <Image
                src={listing.images[0] || '/placeholder.png'}
                alt={listing.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {listing.isFeatured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Featured
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                  {listing.title}
                </h3>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {listing.category}
                </span>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {listing.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ₹{listing.price.toLocaleString()}
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{listing.location.city}</div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full mt-1">
                    {listing.condition}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 