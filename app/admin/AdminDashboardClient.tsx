'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinedDate: Date;
}

interface Listing {
  id: string;
  title: string;
  price: number;
  seller: string;
  status: string;
  createdAt: Date;
  isFeatured: boolean;
}

interface Payment {
  id: string;
  amount: number;
  type: string;
  status: string;
  date: Date;
  user: string;
}

interface DashboardStats {
  totalUsers: number;
  totalListings: number;
  totalRevenue: number;
  activeBookings: number;
}

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    joinedDate: '2024-01-15T12:00:00.000Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'technician',
    status: 'active',
    joinedDate: '2024-02-01T12:00:00.000Z',
  },
];

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'RTX 3080 Founders Edition',
    price: 45000,
    seller: 'John Doe',
    status: 'active',
    createdAt: '2024-03-15T12:00:00.000Z',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Ryzen 9 5950X',
    price: 25000,
    seller: 'Jane Smith',
    status: 'pending',
    createdAt: '2024-03-14T12:00:00.000Z',
    isFeatured: false,
  },
];

const mockPayments: Payment[] = [
  {
    id: '1',
    amount: 500,
    type: 'Featured Listing',
    status: 'completed',
    date: '2024-03-15T12:00:00.000Z',
    user: 'John Doe',
  },
  {
    id: '2',
    amount: 1000,
    type: 'Technician Subscription',
    status: 'pending',
    date: '2024-03-14T12:00:00.000Z',
    user: 'Jane Smith',
  },
];

export default function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState<'users' | 'listings' | 'payments'>('users');
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalListings: 0,
    totalRevenue: 0,
    activeBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching dashboard stats
    const mockStats: DashboardStats = {
      totalUsers: 1247,
      totalListings: 892,
      totalRevenue: 2450000,
      activeBookings: 156
    };

    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="backdrop-blur-xl bg-card/80 rounded-3xl p-6 border border-border shadow-2xl animate-pulse">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="backdrop-blur-xl bg-card/80 rounded-3xl p-6 border border-border shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-500/20 rounded-2xl">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <span className="text-success text-sm font-semibold">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{stats.totalUsers.toLocaleString()}</h3>
          <p className="text-muted-foreground">Total Users</p>
        </div>

        <div className="backdrop-blur-xl bg-card/80 rounded-3xl p-6 border border-border shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-2xl">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="text-success text-sm font-semibold">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{stats.totalListings.toLocaleString()}</h3>
          <p className="text-muted-foreground">Active Listings</p>
        </div>

        <div className="backdrop-blur-xl bg-card/80 rounded-3xl p-6 border border-border shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-2xl">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <span className="text-success text-sm font-semibold">+15%</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">₹{(stats.totalRevenue / 100000).toFixed(1)}L</h3>
          <p className="text-muted-foreground">Total Revenue</p>
        </div>

        <div className="backdrop-blur-xl bg-card/80 rounded-3xl p-6 border border-border shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-2xl">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-success text-sm font-semibold">+5%</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{stats.activeBookings}</h3>
          <p className="text-muted-foreground">Active Bookings</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="backdrop-blur-xl bg-card/80 rounded-3xl p-6 border border-border shadow-2xl">
          <h3 className="text-xl font-bold text-foreground mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New user registered', time: '2 minutes ago', type: 'user' },
              { action: 'Listing created', time: '5 minutes ago', type: 'listing' },
              { action: 'Payment received', time: '10 minutes ago', type: 'payment' },
              { action: 'Booking confirmed', time: '15 minutes ago', type: 'booking' },
              { action: 'User logged in', time: '20 minutes ago', type: 'user' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 backdrop-blur-xl bg-muted/60 rounded-xl border border-border">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'user' ? 'bg-red-500' :
                    activity.type === 'listing' ? 'bg-green-500' :
                    activity.type === 'payment' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}></div>
                  <span className="text-foreground">{activity.action}</span>
                </div>
                <span className="text-muted-foreground text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-xl bg-card/80 rounded-3xl p-6 border border-border shadow-2xl">
          <h3 className="text-xl font-bold text-foreground mb-6">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 backdrop-blur-xl bg-muted/60 rounded-xl border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-foreground">Database</span>
              </div>
              <span className="text-success text-sm">Online</span>
            </div>
            <div className="flex items-center justify-between p-4 backdrop-blur-xl bg-muted/60 rounded-xl border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-foreground">API Services</span>
              </div>
              <span className="text-success text-sm">Online</span>
            </div>
            <div className="flex items-center justify-between p-4 backdrop-blur-xl bg-muted/60 rounded-xl border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-foreground">Payment Gateway</span>
              </div>
              <span className="text-success text-sm">Online</span>
            </div>
            <div className="flex items-center justify-between p-4 backdrop-blur-xl bg-muted/60 rounded-xl border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-foreground">Email Service</span>
              </div>
              <span className="text-warning text-sm">Warning</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="backdrop-blur-xl bg-gradient-to-r from-red-500/20 to-green-500/20 rounded-3xl p-8 border border-border shadow-2xl">
        <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button className="p-4 backdrop-blur-xl bg-muted/60 rounded-2xl border border-border hover:bg-muted transition-all duration-300 group">
            <div className="text-center">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📊</div>
              <span className="text-foreground font-semibold">View Reports</span>
            </div>
          </Button>
          <Button className="p-4 backdrop-blur-xl bg-muted/60 rounded-2xl border border-border hover:bg-muted transition-all duration-300 group">
            <div className="text-center">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">👥</div>
              <span className="text-foreground font-semibold">Manage Users</span>
            </div>
          </Button>
          <Button className="p-4 backdrop-blur-xl bg-muted/60 rounded-2xl border border-border hover:bg-muted transition-all duration-300 group">
            <div className="text-center">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">⚙️</div>
              <span className="text-foreground font-semibold">Settings</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
} 