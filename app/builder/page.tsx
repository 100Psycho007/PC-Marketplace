'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Check, X, Cpu, Monitor, MemoryStick, HardDrive, Zap, Settings } from 'lucide-react'

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

export default function BuilderPage() {
  const [currentBuild, setCurrentBuild] = useState<Build>({})
  const [selectedComponent, setSelectedComponent] = useState<string>('cpu')

  // Mock data for demonstration
  const mockComponents: Record<string, PCComponent[]> = {
    cpu: [
      {
        id: 'cpu1',
        type: 'cpu',
        title: 'Intel Core i9-13900K',
        price: 45000,
        image: '/api/placeholder/300/200',
        specs: {
          cores: '24',
          threads: '32',
          baseSpeed: '3.0 GHz',
          boostSpeed: '5.8 GHz',
          socket: 'LGA1700',
        },
      },
      {
        id: 'cpu2',
        type: 'cpu',
        title: 'AMD Ryzen 9 7950X',
        price: 42000,
        image: '/api/placeholder/300/200',
        specs: {
          cores: '16',
          threads: '32',
          baseSpeed: '4.5 GHz',
          boostSpeed: '5.7 GHz',
          socket: 'AM5',
        },
      },
      {
        id: 'cpu3',
        type: 'cpu',
        title: 'Intel Core i7-13700K',
        price: 32000,
        image: '/api/placeholder/300/200',
        specs: {
          cores: '16',
          threads: '24',
          baseSpeed: '3.4 GHz',
          boostSpeed: '5.4 GHz',
          socket: 'LGA1700',
        },
      },
      {
        id: 'cpu4',
        type: 'cpu',
        title: 'AMD Ryzen 7 7700X',
        price: 28000,
        image: '/api/placeholder/300/200',
        specs: {
          cores: '8',
          threads: '16',
          baseSpeed: '4.5 GHz',
          boostSpeed: '5.4 GHz',
          socket: 'AM5',
        },
      },
    ],
    gpu: [
      {
        id: 'gpu1',
        type: 'gpu',
        title: 'NVIDIA RTX 4090',
        price: 150000,
        image: '/api/placeholder/300/200',
        specs: {
          memory: '24GB GDDR6X',
          boostClock: '2.52 GHz',
          powerConsumption: '450W',
        },
      },
      {
        id: 'gpu2',
        type: 'gpu',
        title: 'NVIDIA RTX 4080',
        price: 120000,
        image: '/api/placeholder/300/200',
        specs: {
          memory: '16GB GDDR6X',
          boostClock: '2.51 GHz',
          powerConsumption: '320W',
        },
      },
      {
        id: 'gpu3',
        type: 'gpu',
        title: 'AMD RX 7900 XTX',
        price: 95000,
        image: '/api/placeholder/300/200',
        specs: {
          memory: '24GB GDDR6',
          boostClock: '2.5 GHz',
          powerConsumption: '355W',
        },
      },
      {
        id: 'gpu4',
        type: 'gpu',
        title: 'NVIDIA RTX 4070 Ti',
        price: 75000,
        image: '/api/placeholder/300/200',
        specs: {
          memory: '12GB GDDR6X',
          boostClock: '2.61 GHz',
          powerConsumption: '285W',
        },
      },
    ],
    ram: [
      {
        id: 'ram1',
        type: 'ram',
        title: 'Corsair Vengeance 32GB DDR5',
        price: 12000,
        image: '/api/placeholder/300/200',
        specs: {
          capacity: '32GB',
          speed: '6000 MHz',
          latency: 'CL36',
        },
      },
      {
        id: 'ram2',
        type: 'ram',
        title: 'G.Skill Trident Z5 16GB DDR5',
        price: 6000,
        image: '/api/placeholder/300/200',
        specs: {
          capacity: '16GB',
          speed: '6000 MHz',
          latency: 'CL36',
        },
      },
      {
        id: 'ram3',
        type: 'ram',
        title: 'Kingston Fury 64GB DDR5',
        price: 24000,
        image: '/api/placeholder/300/200',
        specs: {
          capacity: '64GB',
          speed: '6000 MHz',
          latency: 'CL40',
        },
      },
    ],
    storage: [
      {
        id: 'storage1',
        type: 'storage',
        title: 'Samsung 990 Pro 2TB',
        price: 18000,
        image: '/api/placeholder/300/200',
        specs: {
          capacity: '2TB',
          type: 'NVMe SSD',
          speed: '7450 MB/s',
        },
      },
      {
        id: 'storage2',
        type: 'storage',
        title: 'WD Black SN850X 1TB',
        price: 9000,
        image: '/api/placeholder/300/200',
        specs: {
          capacity: '1TB',
          type: 'NVMe SSD',
          speed: '7300 MB/s',
        },
      },
    ],
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

  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'cpu': return Cpu
      case 'gpu': return Monitor
      case 'ram': return MemoryStick
      case 'storage': return HardDrive
      case 'psu': return Zap
      default: return Settings
    }
  }

  const componentTypes = [
    { key: 'cpu', label: 'CPU', icon: Cpu },
    { key: 'gpu', label: 'Graphics Card', icon: Monitor },
    { key: 'ram', label: 'Memory (RAM)', icon: MemoryStick },
    { key: 'storage', label: 'Storage', icon: HardDrive },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">PC Builder</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Design your dream PC with our interactive builder tool
            </p>
          </motion.div>
        </div>
      </section>

      {/* Builder Interface */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Component Selection */}
            <div className="lg:col-span-2 space-y-6">
              {componentTypes.map((componentType) => (
                <motion.div
                  key={componentType.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="glass-card bg-card text-card-foreground">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <componentType.icon className="w-6 h-6 text-primary" />
                          <CardTitle className="text-xl">{componentType.label}</CardTitle>
                        </div>
                        <Badge variant={currentBuild[componentType.key] ? 'default' : 'secondary'}>
                          {currentBuild[componentType.key] ? 'Selected' : 'Not Selected'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockComponents[componentType.key]?.map((component) => (
                          <motion.div
                            key={component.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleComponentSelect(component)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 bg-card text-card-foreground ${
                              currentBuild[componentType.key]?.id === component.id
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-foreground">{component.title}</h4>
                              {currentBuild[componentType.key]?.id === component.id && (
                                <Check className="w-5 h-5 text-primary" />
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1 mb-3">
                              {Object.entries(component.specs).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="capitalize">{key}:</span>
                                  <span>{value}</span>
                                </div>
                              ))}
                            </div>
                            <div className="text-lg font-bold text-gradient">
                              ₹{component.price.toLocaleString()}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Build Summary */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass-card sticky top-8 bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="text-2xl">Build Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {componentTypes.map((componentType) => {
                      const component = currentBuild[componentType.key]
                      return (
                        <div key={componentType.key} className="flex justify-between items-center p-3 bg-card/50 rounded-xl">
                          <div className="flex items-center space-x-2">
                            <componentType.icon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{componentType.label}</span>
                          </div>
                          <div className="text-right">
                            {component ? (
                              <>
                                <div className="text-sm font-medium text-foreground">{component.title}</div>
                                <div className="text-xs text-muted-foreground">₹{component.price.toLocaleString()}</div>
                              </>
                            ) : (
                              <span className="text-sm text-muted-foreground">Not Selected</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                    
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Price:</span>
                        <span className="text-gradient">₹{calculateTotalPrice().toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      disabled={Object.keys(currentBuild).length === 0}
                    >
                      Save Build
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 