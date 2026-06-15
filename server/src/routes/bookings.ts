import { Router, Request, Response } from 'express'
import { pool } from '../db'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

// Public: Create booking
router.post('/', async (req: Request, res: Response) => {
  const { fullName, mobile, email, pickupCity, destination, journeyDate, returnDate, vehicleType, passengers, message } = req.body

  if (!fullName || !mobile || !pickupCity || !destination || !journeyDate || !vehicleType || !passengers) {
    return res.status(400).json({ error: 'Required fields missing' })
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO bookings (full_name, mobile, email, pickup_city, destination, journey_date, return_date, vehicle_type, passengers, message)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
      [fullName, mobile, email, pickupCity, destination, journeyDate, returnDate || null, vehicleType, passengers, message || null]
    )
    return res.status(201).json({ id: rows[0].id, message: 'Booking created successfully' })
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create booking' })
  }
})

// Admin: Get all bookings
router.get('/', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, full_name AS "fullName", mobile, email, pickup_city AS "pickupCity", destination,
       TO_CHAR(journey_date, 'YYYY-MM-DD') AS "journeyDate", vehicle_type AS "vehicleType",
       passengers, status, TO_CHAR(created_at, 'YYYY-MM-DD') AS "createdAt"
       FROM bookings ORDER BY created_at DESC`
    )
    return res.json(rows)
  } catch {
    return res.status(500).json({ error: 'Server error' })
  }
})

// Admin: Update booking status
router.patch('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { status } = req.body
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }
  try {
    await pool.query('UPDATE bookings SET status = $1 WHERE id = $2', [status, req.params.id])
    return res.json({ message: 'Status updated' })
  } catch {
    return res.status(500).json({ error: 'Server error' })
  }
})

export default router
