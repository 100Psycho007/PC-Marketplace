import { Suspense } from 'react'
import AdminDashboardClient from './AdminDashboardClient'

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-red-400 to-green-400 bg-clip-text text-transparent mb-6 animate-fade-in">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Manage your marketplace, monitor performance, and oversee operations
          </p>
        </div>

        {/* Dashboard Content */}
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl animate-pulse">
                <div className="h-8 bg-white/10 rounded mb-4"></div>
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        }>
          <AdminDashboardClient />
        </Suspense>

        {/* Quick Actions */}
        <div className="mt-16">
          <div className="backdrop-blur-xl bg-gradient-to-r from-red-500/20 to-green-500/20 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button className="p-6 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📊</div>
                <h3 className="text-xl font-semibold text-white mb-2">Analytics</h3>
                <p className="text-gray-300 text-sm">View detailed reports</p>
              </button>
              <button className="p-6 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">👥</div>
                <h3 className="text-xl font-semibold text-white mb-2">Users</h3>
                <p className="text-gray-300 text-sm">Manage user accounts</p>
              </button>
              <button className="p-6 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🛡️</div>
                <h3 className="text-xl font-semibold text-white mb-2">Security</h3>
                <p className="text-gray-300 text-sm">Monitor security logs</p>
              </button>
              <button className="p-6 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⚙️</div>
                <h3 className="text-xl font-semibold text-white mb-2">Settings</h3>
                <p className="text-gray-300 text-sm">Configure system</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 