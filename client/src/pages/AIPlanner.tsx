import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { Bot, Loader2, MapPin, Hotel, Car, Calendar } from 'lucide-react'
import type { AIPlanResponse } from '../types'

export default function AIPlanner() {
  const [form, setForm] = useState({ budget: '', people: '', days: '', destination: '' })
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<AIPlanResponse | null>(null)
  const [error, setError] = useState('')

  const generate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setPlan(null)
    try {
      const { data } = await axios.post('/api/ai/plan', {
        budget: Number(form.budget),
        people: Number(form.people),
        days: Number(form.days),
        destination: form.destination || undefined,
      })
      setPlan(data)
    } catch {
      setError('Trip planner unavailable. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <Bot size={48} className="text-yellow-500 mx-auto mb-3" />
          <span className="text-yellow-500 text-sm font-semibold uppercase tracking-wider">Smart Trip Planning</span>
          <h1 className="section-title mt-2">Smart <span className="gold-text">Trip Planner</span></h1>
          <p className="text-gray-400 mt-3">Enter your details and get a complete personalized itinerary instantly.</p>
        </div>

        <motion.form
          onSubmit={generate}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 md:p-8 mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Budget (₹) *</label>
              <input
                type="number"
                className="input-field"
                placeholder="e.g. 20000"
                value={form.budget}
                onChange={e => setForm({ ...form, budget: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Number of People *</label>
              <input
                type="number"
                className="input-field"
                placeholder="e.g. 4"
                min={1}
                value={form.people}
                onChange={e => setForm({ ...form, people: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Number of Days *</label>
              <input
                type="number"
                className="input-field"
                placeholder="e.g. 5"
                min={1}
                value={form.days}
                onChange={e => setForm({ ...form, days: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Preferred Destination</label>
              <input
                className="input-field"
                placeholder="e.g. Manali (optional)"
                value={form.destination}
                onChange={e => setForm({ ...form, destination: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full mt-6 flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={18} className="animate-spin" /> Generating Plan...</> : <><Bot size={18} /> Generate Itinerary</>}
          </button>
        </motion.form>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-center mb-8">{error}</div>
        )}

        <AnimatePresence>
          {plan && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Summary */}
              <div className="card p-6">
                <h2 className="font-bold text-xl text-white mb-4 flex items-center gap-2">
                  <MapPin className="text-yellow-500" size={20} /> {plan.destination}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <Car size={18} className="text-yellow-500 mb-2" />
                    <p className="text-gray-400 text-xs">Recommended Vehicle</p>
                    <p className="text-white font-bold">{plan.vehicle}</p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <span className="text-2xl mb-2 block">₹</span>
                    <p className="text-gray-400 text-xs">Estimated Cost</p>
                    <p className="text-yellow-500 font-black text-lg">₹{plan.estimatedCost?.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <Hotel size={18} className="text-yellow-500 mb-2" />
                    <p className="text-gray-400 text-xs">Hotels Found</p>
                    <p className="text-white font-bold">{plan.hotels?.length} Options</p>
                  </div>
                </div>
              </div>

              {/* Hotels */}
              <div className="card p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Hotel size={18} className="text-yellow-500" /> Hotel Suggestions
                </h3>
                <div className="space-y-3">
                  {plan.hotels?.map((h, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
                      <div>
                        <p className="text-white font-medium">{h.name}</p>
                        <p className="text-gray-400 text-sm">{h.type}</p>
                      </div>
                      <span className="text-yellow-500 font-bold">₹{h.pricePerNight}/night</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="card p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar size={18} className="text-yellow-500" /> Day-wise Itinerary
                </h3>
                <div className="space-y-4">
                  {plan.itinerary?.map((day) => (
                    <div key={day.day} className="border-l-2 border-yellow-500/40 pl-4">
                      <p className="text-yellow-500 font-bold text-sm">Day {day.day} — {day.title}</p>
                      <ul className="mt-2 space-y-1">
                        {day.activities.map((a, i) => (
                          <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-yellow-500 mt-1">•</span> {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <a
                  href="https://wa.me/918595995437?text=Hi%20GRD%20Travels%2C%20I%20have%20a%20generated%20plan%20and%20want%20to%20book"
                  target="_blank" rel="noreferrer"
                  className="btn-primary inline-block"
                >
                  Book This Trip on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
