import { Suspense } from 'react'
import TechniciansClient from './TechniciansClient'

export default function TechniciansPage() {
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
            PC Technicians
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Find certified technicians for PC building, repair, and maintenance services
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 mb-12 border border-white/20 shadow-2xl">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Search</label>
              <input
                type="text"
                placeholder="Search technicians..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Service Type</label>
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent backdrop-blur-sm [&>option]:bg-slate-800 [&>option]:text-white [&>option]:py-2">
                <option value="">All Services</option>
                <option value="building">PC Building</option>
                <option value="repair">Repair</option>
                <option value="maintenance">Maintenance</option>
                <option value="upgrade">Upgrade</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Location</label>
              <input
                type="text"
                placeholder="Enter location..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Rating</label>
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm [&>option]:bg-slate-800 [&>option]:text-white [&>option]:py-2">
                <option value="">Any Rating</option>
                <option value="4+">4+ Stars</option>
                <option value="4.5+">4.5+ Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Technicians Grid */}
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl animate-pulse">
                <div className="h-48 bg-white/10 rounded-2xl mb-4"></div>
                <div className="h-4 bg-white/10 rounded mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
        }>
          <TechniciansClient />
        </Suspense>

        {/* Services Overview */}
        <div className="mt-16">
          <div className="backdrop-blur-xl bg-gradient-to-r from-red-500/20 to-green-500/20 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🔧</div>
                <h3 className="text-xl font-semibold text-white mb-2">PC Building</h3>
                <p className="text-gray-300 text-sm">Custom gaming and workstation builds</p>
              </div>
              <div className="text-center p-6 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🛠️</div>
                <h3 className="text-xl font-semibold text-white mb-2">Repair</h3>
                <p className="text-gray-300 text-sm">Diagnosis and hardware repair</p>
              </div>
              <div className="text-center p-6 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⚡</div>
                <h3 className="text-xl font-semibold text-white mb-2">Upgrade</h3>
                <p className="text-gray-300 text-sm">Performance upgrades and optimization</p>
              </div>
              <div className="text-center p-6 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🧹</div>
                <h3 className="text-xl font-semibold text-white mb-2">Maintenance</h3>
                <p className="text-gray-300 text-sm">Regular cleaning and maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}