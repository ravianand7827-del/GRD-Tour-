import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, MessageCircle, ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80"
          alt="Luxury Tempo Traveller"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/40 to-gray-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-sm px-4 py-1.5 rounded-full mb-6">
            🏆 India's Most Trusted Travel Partner
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4">
            Travel India with<br />
            <span className="gold-text">GRD Travels</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Premium Tour Packages & Vehicle Rentals Across India — Smart Trip Planning
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/booking" className="btn-primary text-base flex items-center gap-2">
              Book Your Journey Today
            </Link>
            <a
              href="https://wa.me/918595995437?text=Hi%20GRD%20Travels%2C%20I%20want%20to%20book%20a%20trip"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-full transition-all duration-300"
            >
              <MessageCircle size={18} /> WhatsApp Now
            </a>
            <a href="tel:8595995437" className="btn-secondary flex items-center gap-2">
              <Phone size={18} /> Call Us Now
            </a>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              ['500+', 'Happy Customers'],
              ['50+', 'Destinations'],
              ['8+', 'Vehicle Types'],
              ['15+', 'Years Experience'],
            ].map(([num, label]) => (
              <div key={label} className="bg-gray-900/80 border border-gray-800 rounded-xl p-4">
                <div className="text-2xl font-black gold-text">{num}</div>
                <div className="text-gray-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#quick-book"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  )
}
