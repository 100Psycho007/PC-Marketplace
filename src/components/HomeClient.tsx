'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Cpu,
  Monitor,
  HardDrive,
  MemoryStick,
  Zap,
  Star,
  Users,
  TrendingUp,
  Shield,
  Clock,
} from 'lucide-react'

export default function HomeClient() {
  const featuredBuilds = [
    {
      id: 1,
      name: 'Gaming Beast Pro',
      price: '₹85,000',
      specs: 'RTX 4070 • i7-13700K • 32GB RAM',
      rating: 4.8,
      reviews: 124,
      image: '/api/placeholder/300/200',
    },
    {
      id: 2,
      name: 'Workstation Elite',
      price: '₹1,25,000',
      specs: 'RTX 4080 • i9-13900K • 64GB RAM',
      rating: 4.9,
      reviews: 89,
      image: '/api/placeholder/300/200',
    },
    {
      id: 3,
      name: 'Budget Gaming',
      price: '₹45,000',
      specs: 'RTX 3060 • i5-13400F • 16GB RAM',
      rating: 4.6,
      reviews: 156,
      image: '/api/placeholder/300/200',
    },
  ]

  const trustedDealers = [
    { name: 'TechZone', rating: 4.9, deals: 1247, verified: true },
    { name: 'PC Masters', rating: 4.8, deals: 892, verified: true },
    { name: 'Gaming Hub', rating: 4.7, deals: 567, verified: true },
    { name: 'Build Pro', rating: 4.9, deals: 1023, verified: true },
  ]

  const recentParts = [
    { name: 'RTX 4090 Gaming X', price: '₹1,45,000', category: 'GPU', new: true },
    { name: 'Intel Core i9-13900K', price: '₹42,000', category: 'CPU', new: true },
    { name: 'Samsung 990 Pro 2TB', price: '₹18,000', category: 'Storage', new: false },
    { name: 'Corsair Vengeance 32GB', price: '₹8,500', category: 'RAM', new: false },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 text-foreground"
            >
              <span className="text-gradient">Build.</span>{' '}
              <span className="text-gradient-reverse">Buy.</span>{' '}
              <span className="text-gradient">Byte.</span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
            >
              Your all-in-one PC Part Marketplace
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="lg" className="text-lg px-8 py-6 neon-glow hover:neon-glow bg-primary text-primary-foreground">
                Start Building
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-border text-foreground">
                Browse Marketplace
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            >
              {[
                { label: 'Active Users', value: '10K+', icon: Users },
                { label: 'Parts Available', value: '50K+', icon: Cpu },
                { label: 'Successful Builds', value: '5K+', icon: Monitor },
                { label: 'Trusted Dealers', value: '200+', icon: Shield },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Builds */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Featured Builds</h2>
            <p className="text-muted-foreground text-lg">Handpicked configurations for every need</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredBuilds.map((build, index) => (
              <motion.div key={build.id} variants={itemVariants}>
                <Card className="glass-card hover-lift group bg-card text-foreground border-border">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                        Featured
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star fill="currentColor" className="w-4 h-4 text-warning" />
                        <span className="text-sm font-medium">{build.rating}</span>
                        <span className="text-xs text-muted-foreground">({build.reviews})</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors text-foreground">
                      {build.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {build.specs}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gradient">{build.price}</div>
                      <Button size="sm" className="bg-primary text-primary-foreground">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trusted Dealers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted Dealers</h2>
            <p className="text-muted-foreground text-lg">Verified sellers with proven track records</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {trustedDealers.map((dealer, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="glass-card hover-lift text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2 text-foreground">{dealer.name}</h3>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Star fill="currentColor" className="w-4 h-4 text-warning" />
                      <span className="text-sm font-medium">{dealer.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{dealer.deals} deals completed</p>
                    {dealer.verified && (
                      <Badge variant="outline" className="mt-2 text-success border-success">
                        Verified
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recently Added Parts */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recently Added Parts</h2>
            <p className="text-muted-foreground text-lg">Latest components hitting the market</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {recentParts.map((part, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="glass-card hover-lift group">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        {part.category}
                      </Badge>
                      {part.new && (
                        <Badge className="text-xs bg-success text-success-foreground">
                          New
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {part.name}
                    </h3>
                    <div className="text-lg font-bold text-gradient">{part.price}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-card text-center py-16 px-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Dream PC?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of builders who trust ByteMarket for their PC components and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 neon-glow hover:neon-glow">
                Get Started Today
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 