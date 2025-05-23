import Image from 'next/image'
import Link from 'next/link'

interface ListingCardProps {
  id: string
  title: string
  price: number
  image: string
  condition: string
  location: string
  createdAt: Date
  isFeatured?: boolean
}

export default function ListingCard({
  id,
  title,
  price,
  image,
  condition,
  location,
  createdAt,
  isFeatured = false,
}: ListingCardProps) {
  // Format date in a consistent way (YYYY-MM-DD)
  const formattedDate = new Date(createdAt).toLocaleDateString('en-CA') // en-CA uses YYYY-MM-DD format

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isFeatured ? 'ring-2 ring-primary-500' : ''}`}>
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        {isFeatured && (
          <div className="absolute top-2 right-2 bg-primary-500 text-white px-2 py-1 rounded text-sm">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <Link href={`/listings/${id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600">
            {title}
          </h3>
        </Link>
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl font-bold text-gray-900">₹{price.toLocaleString()}</span>
          <span className="text-sm text-gray-500">{condition}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{location}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  )
} 