'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface Technician {
  id: string
  name: string
  location: string
  rating: number
  services: string[]
  experience: string
  image: string
  hourlyRate: number
  availability: string
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
]

export default function TechniciansPage() {
  const { data: session } = useSession()
  const [selectedService, setSelectedService] = useState<string>('all')
  const [selectedLocation, setSelectedLocation] = useState<string>('all')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null)

  const services = [
    'all',
    'PC Assembly',
    'Hardware Repair',
    'Software Installation',
    'Laptop Repair',
    'Data Recovery',
    'Virus Removal',
  ]

  const locations = ['all', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata']

  const handleBooking = (technician: Technician) => {
    setSelectedTechnician(technician)
    setShowBookingModal(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Find a Technician</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Type
            </label>
            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
          <div key={technician.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img
                src={technician.image}
                alt={technician.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-primary-500 text-white px-2 py-1 rounded">
                {technician.rating} ★
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{technician.name}</h3>
              <p className="text-gray-600 mb-4">{technician.location}</p>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Services:</h4>
                <div className="flex flex-wrap gap-2">
                  {technician.services.map((service) => (
                    <span
                      key={service}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">
                  {technician.experience} years experience
                </span>
                <span className="text-primary-600 font-bold">
                  ₹{technician.hourlyRate}/hour
                </span>
              </div>
              <button
                onClick={() => handleBooking(technician)}
                className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedTechnician && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Required
                </label>
                <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                  {selectedTechnician.services.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 