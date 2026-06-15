import { useState } from 'react'
import VehicleCard from '../components/VehicleCard'
import { vehicles } from '../data/vehicles'

const categories = ['All', 'Tempo Traveller', 'Luxury', 'SUV', 'MPV', 'Sedan', 'Bus']

export default function Fleet() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? vehicles : vehicles.filter(v => v.category === active)

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-yellow-500 text-sm font-semibold uppercase tracking-wider">Our Fleet</span>
          <h1 className="section-title mt-2">Vehicle <span className="gold-text">Categories</span></h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            From sedans to luxury buses — find the perfect vehicle for every trip size and budget.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
        </div>
      </div>
    </main>
  )
}
