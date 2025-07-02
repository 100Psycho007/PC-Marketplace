import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

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
  isFeatured,
}: ListingCardProps) {
  return (
    <div className="relative group rounded-xl shadow-3d bg-card/80 backdrop-blur-glass border border-border p-4 flex flex-col gap-3 transition-3d hover:scale-[1.03] hover:shadow-glass hover:z-10">
      {isFeatured && (
        <span className="absolute top-2 right-2 bg-gradient-to-r from-accent to-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-3d z-20">
          Featured
        </span>
      )}
      <Link href={`/listings/${id}`} className="block">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-inner bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-1 mt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground drop-shadow-sm truncate max-w-[70%]">
            {title}
          </h3>
          <span className="text-xl font-extrabold text-success drop-shadow-sm">
            ${price}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-accent/10 px-3 py-1 font-semibold">
            {condition}
          </span>
          <span className="rounded-full bg-success/10 px-3 py-1 font-semibold">
            {location}
          </span>
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
      <Button
        asChild
        className="mt-2 w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-3d hover:bg-primary/90 hover:scale-105 transition-3d"
      >
        <Link href={`/listings/${id}`}>View Details</Link>
      </Button>
    </div>
  )
} 