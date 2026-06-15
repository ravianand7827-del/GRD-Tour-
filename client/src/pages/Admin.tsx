import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Users, Package, Car, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react'
import type { Booking } from '../types'

export default function Admin() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'bookings' | 'analytics'>('bookings')
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login', loginForm)
      localStorage.setItem('adminToken', data.token)
      setToken(data.token)
      setLoginError('')
    } catch {
      setLoginError('Invalid credentials')
    }
  }

  useEffect(() => {
    if (!token) return
    axios.get('/api/bookings', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setBookings(data))
      .catch(() => setToken(''))
      .finally(() => setLoading(false))
  }, [token])

  const updateStatus = async (id: number, status: string) => {
    await axios.patch(`/api/bookings/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } })
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: status as Booking['status'] } : b))
  }

  if (!token) {
    return (
      <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={login}
          className="card p-8 w-full max-w-sm space-y-4"
        >
          <h2 className="text-xl font-bold text-white text-center mb-2">Admin Login</h2>
          <input className="input-field" type="email" placeholder="Email" value={loginForm.email}
            onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} required />
          <input className="input-field" type="password" placeholder="Password" value={loginForm.password}
            onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} required />
          {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
          <button type="submit" className="btn-primary w-full">Login</button>
        </motion.form>
      </main>
    )
  }

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    revenue: bookings.filter(b => b.status === 'confirmed').length * 5000,
  }

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="section-title">Admin <span className="gold-text">Dashboard</span></h1>
          <button onClick={() => { localStorage.removeItem('adminToken'); setToken('') }} className="text-gray-400 hover:text-red-400 text-sm transition-colors">
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: 'Total Bookings', value: stats.total, color: 'text-blue-400' },
            { icon: CheckCircle, label: 'Confirmed', value: stats.confirmed, color: 'text-green-400' },
            { icon: Clock, label: 'Pending', value: stats.pending, color: 'text-yellow-400' },
            { icon: TrendingUp, label: 'Est. Revenue', value: `₹${stats.revenue.toLocaleString()}`, color: 'text-yellow-500' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="card p-5">
              <Icon size={20} className={`${color} mb-2`} />
              <p className="text-gray-400 text-xs">{label}</p>
              <p className={`text-2xl font-black ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['bookings', 'analytics'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${tab === t ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'bookings' && (
          <div className="card overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-400">Loading bookings...</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400">
                    {['#', 'Name', 'Mobile', 'Pickup', 'Destination', 'Date', 'Vehicle', 'Pax', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 text-gray-500">{b.id}</td>
                      <td className="px-4 py-3 text-white font-medium">{b.fullName}</td>
                      <td className="px-4 py-3 text-gray-400">{b.mobile}</td>
                      <td className="px-4 py-3 text-gray-400">{b.pickupCity}</td>
                      <td className="px-4 py-3 text-gray-400">{b.destination}</td>
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{b.journeyDate}</td>
                      <td className="px-4 py-3 text-gray-400">{b.vehicleType}</td>
                      <td className="px-4 py-3 text-gray-400">{b.passengers}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          b.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                          b.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>{b.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {b.status !== 'confirmed' && (
                            <button onClick={() => updateStatus(b.id, 'confirmed')}
                              className="text-green-400 hover:text-green-300 transition-colors">
                              <CheckCircle size={16} />
                            </button>
                          )}
                          {b.status !== 'cancelled' && (
                            <button onClick={() => updateStatus(b.id, 'cancelled')}
                              className="text-red-400 hover:text-red-300 transition-colors">
                              <XCircle size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Package size={18} className="text-yellow-500" /> Bookings by Status</h3>
              <div className="space-y-3">
                {[
                  { label: 'Confirmed', count: stats.confirmed, color: 'bg-green-500' },
                  { label: 'Pending', count: stats.pending, color: 'bg-yellow-500' },
                  { label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length, color: 'bg-red-500' },
                ].map(({ label, count, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{label}</span>
                      <span className="text-white font-bold">{count}</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full transition-all`}
                        style={{ width: stats.total ? `${(count / stats.total) * 100}%` : '0%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Car size={18} className="text-yellow-500" /> Vehicle Demand</h3>
              <div className="space-y-2">
                {Object.entries(
                  bookings.reduce((acc, b) => {
                    acc[b.vehicleType] = (acc[b.vehicleType] || 0) + 1
                    return acc
                  }, {} as Record<string, number>)
                ).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([vehicle, count]) => (
                  <div key={vehicle} className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-400 text-sm">{vehicle}</span>
                    <span className="text-yellow-500 font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
