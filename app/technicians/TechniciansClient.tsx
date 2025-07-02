'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Technician {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  location: string;
  hourlyRate: number;
  image?: string;
  services: string[];
  description: string;
  availability?: string;
}

// Mock data for demonstration
const mockTechnicians: Technician[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    location: 'Mumbai',
    rating: 4.8,
    services: ['Hardware Repair', 'Software Installation'],
    experience: '5 years',
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Technician+1',
    hourlyRate: 500,
    availability: 'Mon-Fri, 9AM-6PM',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'Delhi',
    rating: 4.9,
    services: ['Virus Removal', 'Data Recovery'],
    experience: '3 years',
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Technician+2',
    hourlyRate: 450,
    availability: 'Mon-Sat, 10AM-7PM',
  },
];

export default function TechniciansClient() {
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);

  const services = [
    'all',
    'PC Assembly',
    'Hardware Repair',
    'Software Installation',
    'Laptop Repair',
    'Data Recovery',
    'Virus Removal',
  ];

  const locations = ['all', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];

  const handleBooking = (technician: Technician) => {
    setSelectedTechnician(technician);
    setShowBookingModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-background">
      <h1 className="text-3xl font-bold text-foreground mb-8">Find a Technician</h1>

      {/* Filters */}
      <div className="bg-card rounded-lg shadow-md p-6 mb-8 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Service Type
            </label>
            <select
              className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              {services.map((service) => (
                <option key={service} value={service}>
                  {service.charAt(0).toUpperCase() + service.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location
            </label>
            <select
              className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location.charAt(0).toUpperCase() + location.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Technicians List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTechnicians.map((technician) => (
          <div key={technician.id} className="bg-card rounded-lg shadow-md overflow-hidden border border-border">
            <div className="relative h-48">
              <img
                src={technician.image}
                alt={technician.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded">
                {technician.rating} ★
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-foreground">{technician.name}</h3>
              <p className="text-muted-foreground mb-4">{technician.location}</p>
              <div className="mb-4">
                <h4 className="font-medium mb-2 text-foreground">Services:</h4>
                <div className="flex flex-wrap gap-2">
                  {technician.services.map((service) => (
                    <span
                      key={service}
                      className="bg-muted text-muted-foreground px-2 py-1 rounded text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">
                  {technician.experience}
                </span>
                <span className="text-primary font-bold">
                  ₹{technician.hourlyRate}/hour
                </span>
              </div>
              <button
                onClick={() => handleBooking(technician)}
                className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedTechnician && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="rounded-2xl p-8 max-w-md w-full bg-card text-foreground border border-border shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-border rounded-md bg-muted text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Time
                </label>
                <select className="w-full px-4 py-2 border border-border rounded-md bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Service Required
                </label>
                <select className="w-full px-4 py-2 border border-border rounded-md bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  {selectedTechnician.services.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Notes
                </label>
                <textarea className="w-full px-4 py-2 border border-border rounded-md bg-muted text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 rounded-md bg-muted text-muted-foreground border border-border hover:bg-muted/80"
                >
                  Cancel
                </button>
                <Button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                  Confirm
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 