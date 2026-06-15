import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Zap, CheckCircle } from 'lucide-react'
import type { Vehicle } from '../types'

interface Props { vehicle: Vehicle; index?: number }

export default function VehicleCard({ vehicle, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="card group"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${vehicle.ac ? 'bg-blue-600' : 'bg-gray-600'} text-white`}>
            {vehicle.ac ? 'AC' : 'Non-AC'}
          </span>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-gray-900" />
      </div>

      <div className="p-5">
        <h3 className="font-bold text-white text-lg mb-2">{vehicle.name}</h3>

        <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
          <span className="flex items-center gap-1"><Users size={14} /> {vehicle.capacity} Seats</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {vehicle.features.slice(0, 3).map(f => (
            <span key={f} className="flex items-center gap-1 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
              <CheckCircle size={10} className="text-yellow-500" /> {f}
            </span>
          ))}
        </div>

        <Link to="/booking" state={{ vehicleType: vehicle.name }} className="btn-primary w-full text-center block text-sm">
          Book Now
        </Link>
      </div>
    </motion.div>
  )
}
