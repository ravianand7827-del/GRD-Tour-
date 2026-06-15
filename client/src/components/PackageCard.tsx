import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock, Tag, Star } from 'lucide-react'
import type { TourPackage } from '../types'

interface Props { pkg: TourPackage; index?: number }

export default function PackageCard({ pkg, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="card group"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-bold text-white text-xl">{pkg.name}</h3>
          <p className="text-gray-300 text-sm">{pkg.destination}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-1 text-gray-400 text-sm">
            <Clock size={14} /> {pkg.duration}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.highlights.slice(0, 3).map(h => (
            <span key={h} className="flex items-center gap-1 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
              <Star size={9} className="text-yellow-500 fill-yellow-500" /> {h}
            </span>
          ))}
        </div>

        <Link to="/booking" state={{ destination: pkg.destination }} className="btn-primary w-full text-center block text-sm">
          Book This Package
        </Link>
      </div>
    </motion.div>
  )
}
