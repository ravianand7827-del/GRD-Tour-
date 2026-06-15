import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Bot, Shield, Clock, Headphones } from 'lucide-react'
import Hero from '../components/Hero'
import QuickBookForm from '../components/QuickBookForm'
import VehicleCard from '../components/VehicleCard'
import PackageCard from '../components/PackageCard'
import { vehicles } from '../data/vehicles'
import { packages } from '../data/packages'

const whyUs = [
  { icon: Shield, title: 'Safe & Reliable', desc: 'GPS tracked, verified drivers, fully insured vehicles' },
  { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock customer support throughout your journey' },
  { icon: Bot, title: 'Smart Trip Planner', desc: 'Get personalized itineraries tailored to your budget and group size' },
  { icon: Headphones, title: 'Dedicated Help', desc: 'Personal travel assistant from booking to return' },
]

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <QuickBookForm />

      {/* Fleet Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-yellow-500 text-sm font-semibold uppercase tracking-wider">Our Fleet</span>
            <h2 className="section-title mt-2">Premium <span className="gold-text">Vehicles</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.slice(0, 4).map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/fleet" className="btn-secondary inline-block">View All Vehicles</Link>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-yellow-500 text-sm font-semibold uppercase tracking-wider">Tour Packages</span>
            <h2 className="section-title mt-2">Popular <span className="gold-text">Destinations</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.slice(0, 6).map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/packages" className="btn-secondary inline-block">View All Packages</Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose <span className="gold-text">GRD Travels</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-yellow-500" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Planner CTA */}
      <section className="py-20 bg-gradient-to-r from-yellow-500/10 via-gray-900 to-yellow-500/10 border-y border-yellow-500/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Bot size={48} className="text-yellow-500 mx-auto mb-4" />
          <h2 className="section-title mb-4">Meet Your <span className="gold-text">Smart Trip Planner</span></h2>
          <p className="text-gray-400 mb-8">
            Enter your budget, group size & days — get a complete day-wise itinerary, hotel suggestions, and vehicle recommendations instantly.
          </p>
          <Link to="/ai-planner" className="btn-primary text-lg inline-block">Try Trip Planner Free →</Link>
        </div>
      </section>
    </main>
  )
}
