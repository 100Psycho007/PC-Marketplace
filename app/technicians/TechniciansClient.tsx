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
    specialization: 'Hardware',
    location: 'Mumbai',
    rating: 4.8,
    services: ['Hardware Repair', 'Software Installation'],
    experience: '5 years',
    image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=600',
    hourlyRate: 500,
    availability: 'Mon-Fri, 9AM-6PM',
    description: 'Experienced hardware technician specializing in PC repairs and upgrades.'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    specialization: 'Software',
    location: 'Delhi',
    rating: 4.9,
    services: ['Virus Removal', 'Data Recovery'],
    experience: '3 years',
    image: 'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=600',
    hourlyRate: 450,
    availability: 'Mon-Sat, 10AM-7PM',
    description: 'Expert in virus removal and data recovery with a strong software background.'
  },
  {
    id: '3',
    name: 'Amit Patel',
    specialization: 'Gaming PCs',
    location: 'Bangalore',
    rating: 4.7,
    services: ['Gaming PC Building', 'Performance Optimization'],
    experience: '4 years',
    image: 'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=600',
    hourlyRate: 600,
    availability: 'Mon-Sat, 11AM-8PM',
    description: 'Gaming PC specialist with expertise in high-performance builds and optimization.'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    specialization: 'Workstations',
    location: 'Chennai',
    rating: 4.9,
    services: ['Workstation Setup', 'Network Configuration'],
    experience: '6 years',
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600',
    hourlyRate: 550,
    availability: 'Mon-Fri, 10AM-6PM',
    description: 'Professional workstation specialist for business and creative professionals.'
  },
  {
    id: '5',
    name: 'Vikram Singh',
    specialization: 'Laptop Repair',
    location: 'Kolkata',
    rating: 4.6,
    services: ['Laptop Repair', 'Screen Replacement'],
    experience: '7 years',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
    hourlyRate: 400,
    availability: 'Tue-Sun, 9AM-7PM',
    description: 'Laptop repair expert with extensive experience in all major brands.'
  },
  {
    id: '6',
    name: 'Lisa Chen',
    specialization: 'Data Recovery',
    location: 'Hyderabad',
    rating: 4.8,
    services: ['Data Recovery', 'Storage Solutions'],
    experience: '5 years',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
    hourlyRate: 650,
    availability: 'Mon-Fri, 8AM-5PM',
    description: 'Data recovery specialist with advanced techniques for retrieving lost information.'
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
    'Gaming PC Building',
    'Performance Optimization',
    'Workstation Setup',
    'Network Configuration',
    'Screen Replacement',
    'Storage Solutions',
  ];

  const locations = ['all', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];

  const handleBooking = (technician: Technician) => {
    setSelectedTechnician(technician);
    setShowBookingModal(true);
  };

  const filteredTechnicians = mockTechnicians.filter(tech => {
    const serviceMatch = selectedService === 'all' || tech.services.some(service => 
      service.toLowerCase().includes(selectedService.toLowerCase())
    );
    const locationMatch = selectedLocation === 'all' || tech.location === selectedLocation;
    return serviceMatch && locationMatch;
  });

  return (
    <div className="space-y-8">
      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTechnicians.map((technician) => (
          <div key={technician.id} className="backdrop-blur-xl bg-white/10 rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300 group">
            <div className="relative h-48 overflow-hidden">
              <img
                src={technician.image}
                alt={technician.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {technician.rating} ★
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-1">{technician.name}</h3>
                <p className="text-gray-200 text-sm">{technician.specialization}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm">📍</span>
                  <span className="text-gray-300 text-sm">{technician.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm">⏰</span>
                  <span className="text-gray-300 text-sm">{technician.experience}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 text-white">Services:</h4>
                <div className="flex flex-wrap gap-2">
                  {technician.services.map((service) => (
                    <span
                      key={service}
                      className="bg-gradient-to-r from-red-500/20 to-green-500/20 text-white px-3 py-1 rounded-full text-xs border border-white/20 backdrop-blur-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {technician.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300 text-sm">
                  {technician.availability}
                </span>
                <span className="text-green-400 font-bold text-lg">
                  ₹{technician.hourlyRate}/hour
                </span>
              </div>

              <button
                onClick={() => handleBooking(technician)}
                className="w-full bg-gradient-to-r from-red-500 to-green-500 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedTechnician && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Book Appointment</h2>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-green-500 mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {selectedTechnician.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-white font-semibold">{selectedTechnician.name}</h3>
              <p className="text-gray-300 text-sm">{selectedTechnician.specialization}</p>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent backdrop-blur-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Time
                </label>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent backdrop-blur-sm">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Service Required
                </label>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm">
                  {selectedTechnician.services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Additional Notes
                </label>
                <textarea 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm h-20 resize-none"
                  placeholder="Any specific requirements or issues..."
                />
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-500 to-green-500 text-white px-4 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}