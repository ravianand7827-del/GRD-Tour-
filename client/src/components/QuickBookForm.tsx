import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Users, Car } from 'lucide-react'

export default function QuickBookForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ pickup: '', destination: '', date: '', passengers: '' })

  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/booking', { state: form })
  }

  return (
    <section id="quick-book" className="py-16 bg-gray-950">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            ✈️ Quick <span className="gold-text">Booking</span>
          </h2>
          <form onSubmit={handle} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                className="input-field pl-9"
                placeholder="Pickup City"
                value={form.pickup}
                onChange={e => setForm({ ...form, pickup: e.target.value })}
                required
              />
            </div>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
              <input
                className="input-field pl-9"
                placeholder="Destination"
                value={form.destination}
                onChange={e => setForm({ ...form, destination: e.target.value })}
                required
              />
            </div>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="date"
                className="input-field pl-9"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div className="relative">
              <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="number"
                className="input-field pl-9"
                placeholder="Passengers"
                min={1}
                value={form.passengers}
                onChange={e => setForm({ ...form, passengers: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-primary flex items-center justify-center gap-2 col-span-1">
              <Car size={16} /> Search
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
