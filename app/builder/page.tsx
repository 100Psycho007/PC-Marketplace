'use client'

import { useState } from 'react'
import ListingCard from '@/components/ListingCard'

interface PCComponent {
  id: string
  type: string
  title: string
  price: number
  image: string
  specs: Record<string, string>
}

interface Build {
  [key: string]: PCComponent | undefined
  cpu?: PCComponent
  gpu?: PCComponent
  motherboard?: PCComponent
  ram?: PCComponent
  storage?: PCComponent
  psu?: PCComponent
  case?: PCComponent
  cooling?: PCComponent
}

export default function PCBuilderPage() {
  const [currentBuild, setCurrentBuild] = useState<Build>({})
  const [selectedComponent, setSelectedComponent] = useState<string>('cpu')
  const [showCompatibility, setShowCompatibility] = useState(false)

  // Mock data for demonstration
  const mockComponents: Record<string, PCComponent[]> = {
    cpu: [
      {
        id: '1',
        type: 'cpu',
        title: 'AMD Ryzen 9 5950X',
        price: 25000,
        image: '/images/ryzen9.jpg',
        specs: {
          cores: '16',
          threads: '32',
          baseSpeed: '3.4 GHz',
          boostSpeed: '4.9 GHz',
          socket: 'AM4',
        },
      },
      // Add more CPUs
    ],
    gpu: [
      {
        id: '2',
        type: 'gpu',
        title: 'NVIDIA RTX 3080',
        price: 45000,
        image: '/images/rtx3080.jpg',
        specs: {
          memory: '10GB GDDR6X',
          boostClock: '1.71 GHz',
          powerConsumption: '320W',
        },
      },
      // Add more GPUs
    ],
    // Add more component types
  }

  const handleComponentSelect = (component: PCComponent) => {
    setCurrentBuild((prev) => ({
      ...prev,
      [component.type]: component,
    }))
  }

  const calculateTotalPrice = () => {
    return Object.values(currentBuild).reduce((total, component) => {
      return total + (component?.price || 0)
    }, 0)
  }

  const checkCompatibility = () => {
    // Implement compatibility checking logic here
    return {
      isCompatible: true,
      issues: [],
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">PC Builder</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Component Selection */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Select Components</h2>
            <div className="flex space-x-2 mb-6 overflow-x-auto">
              {Object.keys(mockComponents).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedComponent(type)}
                  className={`px-4 py-2 rounded-md ${
                    selectedComponent === type
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockComponents[selectedComponent]?.map((component) => (
                <div
                  key={component.id}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    currentBuild[component.type]?.id === component.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  onClick={() => handleComponentSelect(component)}
                >
                  <h3 className="font-semibold mb-2">{component.title}</h3>
                  <p className="text-primary-600 font-bold mb-2">
                    ₹{component.price.toLocaleString()}
                  </p>
                  <div className="text-sm text-gray-600">
                    {Object.entries(component.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="font-medium">{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Build Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Your Build</h2>
            <div className="space-y-4 mb-6">
              {Object.entries(currentBuild).map(([type, component]) => (
                component && (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-gray-600">{type.toUpperCase()}</span>
                    <span className="font-medium">{component.title}</span>
                  </div>
                )
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total Price:</span>
                <span className="text-2xl font-bold text-primary-600">
                  ₹{calculateTotalPrice().toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => setShowCompatibility(!showCompatibility)}
                className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 mb-4"
              >
                Check Compatibility
              </button>

              {showCompatibility && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-semibold mb-2">Compatibility Check</h3>
                  {checkCompatibility().isCompatible ? (
                    <p className="text-green-600">All components are compatible!</p>
                  ) : (
                    <ul className="text-red-600">
                      {checkCompatibility().issues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 mt-4">
                Get Quotes from Dealers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 