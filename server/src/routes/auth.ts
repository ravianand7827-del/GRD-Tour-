import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../db'

const router = Router()

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const { rows } = await pool.query('SELECT * FROM admins WHERE email = $1', [email])
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, rows[0].password_hash)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET!, { expiresIn: '7d' })
    return res.json({ token })
  } catch (err) {
    return res.status(500).json({ error: 'Server error' })
  }
})

export default router
