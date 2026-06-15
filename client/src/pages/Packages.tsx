import PackageCard from '../components/PackageCard'
import { packages } from '../data/packages'

export default function Packages() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-yellow-500 text-sm font-semibold uppercase tracking-wider">Tour Packages</span>
          <h1 className="section-title mt-2">Explore <span className="gold-text">India</span> with Us</h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Handcrafted tour packages to India's most iconic destinations — fully customizable to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
        </div>

        <div className="mt-16 bg-gray-900 border border-yellow-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Need a Custom Package?</h2>
          <p className="text-gray-400 mb-6">Tell us your destination, budget & dates — we'll craft the perfect trip for you.</p>
          <a
            href="https://wa.me/918595995437?text=Hi%20GRD%20Travels%2C%20I%20need%20a%20custom%20tour%20package"
            target="_blank" rel="noreferrer"
            className="btn-primary inline-block"
          >
            Request Custom Package on WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
