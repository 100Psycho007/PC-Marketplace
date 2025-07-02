'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewListingClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    city: '',
    state: '',
    description: '',
    condition: '',
    contactEmail: '',
    brand: '',
    model: '',
    yearOfPurchase: '',
    warranty: false,
    warrantyDetails: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          yearOfPurchase: Number(formData.yearOfPurchase),
          location: {
            city: formData.city,
            state: formData.state,
          },
          specifications: {
            brand: formData.brand,
            model: formData.model,
            yearOfPurchase: Number(formData.yearOfPurchase),
            warranty: formData.warranty,
            warrantyDetails: formData.warrantyDetails,
          },
        }),
      });

      if (response.ok) {
        router.push('/marketplace');
      } else {
        throw new Error('Failed to create listing');
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-background">
      <h1 className="text-2xl font-bold mb-8 text-foreground">Create New Listing</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-foreground">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-border rounded bg-card text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-foreground">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-border rounded bg-card text-foreground"
          >
            <option value="">Select Category</option>
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
          <label className="block text-sm font-medium mb-1 text-foreground">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full p-2 border border-border rounded bg-card text-foreground"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-2 border border-border rounded bg-card text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full p-2 border border-border rounded bg-card text-foreground"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-foreground">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 border border-border rounded bg-card text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-foreground">Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
            className="w-full p-2 border border-border rounded bg-card text-foreground"
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-foreground">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
            className="w-full p-2 border border-border rounded bg-card text-foreground"
          />
        </div>

        <div className="border-t pt-6 border-border">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Specifications</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full p-2 border border-border rounded bg-card text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full p-2 border border-border rounded bg-card text-foreground"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1 text-foreground">Year of Purchase</label>
            <input
              type="number"
              name="yearOfPurchase"
              value={formData.yearOfPurchase}
              onChange={handleChange}
              min="2000"
              max={new Date().getFullYear()}
              className="w-full p-2 border border-border rounded bg-card text-foreground"
            />
          </div>

          <div className="mt-4">
            <label className="flex items-center space-x-2 text-foreground">
              <input
                type="checkbox"
                name="warranty"
                checked={formData.warranty}
                onChange={handleChange}
                className="rounded border-border bg-card text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium">Has Warranty</span>
            </label>
          </div>

          {formData.warranty && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1 text-foreground">Warranty Details</label>
              <textarea
                name="warrantyDetails"
                value={formData.warrantyDetails}
                onChange={handleChange}
                rows={2}
                className="w-full p-2 border border-border rounded bg-card text-foreground"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
        </div>
      </form>
    </div>
  );
} 