"use client";

import { useState } from "react";
import Chat from "@/components/Chat";
import { useSession } from "next-auth/react";

// Mock function to get listing details (replace with real data fetching)
function getListingById(id: string) {
  return {
    id,
    title: "RTX 4090 Gaming X",
    description: "Latest NVIDIA graphics card for ultimate gaming performance",
    price: 145000,
    category: "GPU",
    condition: "New",
    seller: { id: "seller123", name: "TechZone" },
    location: { city: "Mumbai", state: "Maharashtra" },
    images: ["/api/placeholder/400/300"],
    createdAt: new Date().toISOString(),
  };
}

export default function ListingDetailsPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const listing = getListingById(params.id);
  const user = session?.user;
  const isSeller = user?.id === listing.seller.id;
  // Unique roomId for this listing and user pair
  const roomId = `${listing.id}_${user?.id || "guest"}_${listing.seller.id}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-8">
        <img src={listing.images[0]} alt={listing.title} className="w-full md:w-1/3 rounded-lg" />
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{listing.title}</h1>
          <p className="text-lg text-gray-700">{listing.description}</p>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>Category: {listing.category}</span>
            <span>Condition: {listing.condition}</span>
            <span>Location: {listing.location.city}, {listing.location.state}</span>
          </div>
          <div className="text-2xl font-bold text-green-600">₹{listing.price}</div>
          <div className="mt-4">
            {!user ? (
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = '/auth/signin'}>
                Sign in to Chat
              </button>
            ) : isSeller ? (
              <span className="text-gray-500">You are the seller</span>
            ) : (
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setDrawerOpen(true)}>
                Chat with Seller
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Drawer for Chat */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={() => setDrawerOpen(false)}>
          <div className="w-full max-w-md h-full bg-white shadow-xl p-0 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">Chat with {listing.seller.name}</h2>
              <button onClick={() => setDrawerOpen(false)} className="text-gray-500 hover:text-gray-800">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Chat roomId={roomId} user={{ name: user?.name || "Guest", id: user?.id || "guest" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 