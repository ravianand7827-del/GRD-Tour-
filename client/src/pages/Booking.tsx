import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { vehicles } from '../data/vehicles'

interface BookingForm {
  fullName: string
  mobile: string
  email: string
  pickupCity: string
  destination: string
  journeyDate: string
  returnDate: string
  vehicleType: string
  passengers: number
  message: string
}

export default function Booking() {
  const location = useLocation()
  const state = (location.state || {}) as Partial<BookingForm>

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<BookingForm>({
    defaultValues: {
      pickupCity: state.pickupCity || '',
      destination: state.destination || '',
      vehicleType: state.vehicleType || '',
    }
  })

  const onSubmit = async (data: BookingForm) => {
    try {
      await axios.post('/api/bookings', data)
      toast.success('Booking request sent! We will contact you shortly.')
      reset()
    } catch {
      toast.error('Failed to submit. Please call us directly.')
    }
  }

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-yellow-500 text-sm font-semibold uppercase tracking-wider">Online Booking</span>
          <h1 className="section-title mt-2">Book Your <span className="gold-text">Journey</span></h1>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="card p-6 md:p-8 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Full Name *</label>
              <input className="input-field" placeholder="Your full name" {...register('fullName', { required: true })} />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">Required</p>}
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Mobile Number *</label>
              <input className="input-field" placeholder="10-digit mobile number" {...register('mobile', { required: true, pattern: /^[6-9]\d{9}$/ })} />
              {errors.mobile && <p className="text-red-500 text-xs mt-1">Valid mobile required</p>}
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Email</label>
            <input type="email" className="input-field" placeholder="your@email.com" {...register('email')} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Pickup City *</label>
              <input className="input-field" placeholder="e.g. New Delhi" {...register('pickupCity', { required: true })} />
              {errors.pickupCity && <p className="text-red-500 text-xs mt-1">Required</p>}
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Destination *</label>
              <input className="input-field" placeholder="e.g. Manali" {...register('destination', { required: true })} />
              {errors.destination && <p className="text-red-500 text-xs mt-1">Required</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Journey Date *</label>
              <input type="date" className="input-field" {...register('journeyDate', { required: true })} />
              {errors.journeyDate && <p className="text-red-500 text-xs mt-1">Required</p>}
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Return Date</label>
              <input type="date" className="input-field" {...register('returnDate')} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Vehicle Type *</label>
              <select className="input-field" {...register('vehicleType', { required: true })}>
                <option value="">Select vehicle</option>
                {vehicles.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
              </select>
              {errors.vehicleType && <p className="text-red-500 text-xs mt-1">Required</p>}
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Passengers *</label>
              <input type="number" min={1} className="input-field" placeholder="Number of passengers" {...register('passengers', { required: true, min: 1 })} />
              {errors.passengers && <p className="text-red-500 text-xs mt-1">Required</p>}
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Message / Special Requirements</label>
            <textarea className="input-field min-h-24 resize-none" placeholder="Any special requirements, pickup address, etc." {...register('message')} />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-base">
            {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
          </button>

          <p className="text-gray-500 text-xs text-center">
            Or call us directly:{' '}
            <a href="tel:8595995437" className="text-yellow-500">8595995437</a> /{' '}
            <a href="tel:9810709148" className="text-yellow-500">9810709148</a>
          </p>
        </motion.form>
      </div>
    </main>
  )
}
