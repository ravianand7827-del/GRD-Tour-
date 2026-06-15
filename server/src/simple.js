import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Mock routes for testing
app.post('/api/bookings', (req, res) => {
  res.json({ message: 'Booking received (demo mode)' })
})

app.post('/api/ai/plan', (req, res) => {
  res.json({
    destination: 'Manali, Himachal Pradesh',
    vehicle: 'Tempo Traveller 12 Seater',
    hotels: [
      { name: 'Hotel Snow View', type: 'Standard', pricePerNight: 2500 },
      { name: 'Mountain Resort', type: 'Luxury', pricePerNight: 4000 }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Local Sightseeing', activities: ['Check-in hotel', 'Mall Road walk', 'Hadimba Temple visit'] },
      { day: 2, title: 'Adventure Day', activities: ['Solang Valley', 'Paragliding', 'River rafting'] }
    ],
    estimatedCost: 15000
  })
})

app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))