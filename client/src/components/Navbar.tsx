import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/fleet', label: 'Fleet' },
  { to: '/packages', label: 'Packages' },
  { to: '/booking', label: 'Book Now' },
  { to: '/ai-planner', label: 'Trip Planner' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-black gold-text">GRD</span>
          <span className="text-white font-semibold text-sm leading-tight hidden sm:block">
            Travels<br />
            <span className="text-gray-400 text-xs font-normal">Travel & Fleet Platform</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.to
                  ? 'text-yellow-500 bg-yellow-500/10'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              } ${l.label === 'Book Now' ? 'bg-yellow-500 !text-black hover:bg-yellow-400 !hover:bg-yellow-400 rounded-full ml-2' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:8595995437" className="flex items-center gap-1 text-yellow-500 text-sm font-medium hover:text-yellow-400">
            <Phone size={14} /> 8595995437
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-300">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-gray-900 border-t border-gray-800 overflow-hidden"
          >
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block px-6 py-3 text-sm font-medium border-b border-gray-800 transition-colors ${
                  pathname === l.to ? 'text-yellow-500 bg-yellow-500/10' : 'text-gray-300 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a href="tel:8595995437" className="flex items-center gap-2 px-6 py-3 text-yellow-500 text-sm font-medium">
              <Phone size={14} /> 8595995437
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
