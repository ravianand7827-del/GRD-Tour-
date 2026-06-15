import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initDB } from './db'
import authRoutes from './routes/auth'
import bookingRoutes from './routes/bookings'
import aiRoutes from './routes/ai'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/ai', aiRoutes)

app.get('/api/health', (_, res) => res.json({ status: 'ok', service: 'GRD Travels API' }))

initDB()
  .then(() => app.listen(PORT, () => console.log(`🚀 GRD Travels API running on http://localhost:${PORT}`)))
  .catch(err => { console.error('Failed to start:', err); process.exit(1) })
