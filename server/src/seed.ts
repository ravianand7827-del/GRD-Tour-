import { pool, initDB } from './db'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

async function seed() {
  await initDB()
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@GRD2025', 10)
  await pool.query(
    'INSERT INTO admins (email, password_hash) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING',
    [process.env.ADMIN_EMAIL || 'admin@grdtravels.com', hash]
  )
  console.log('✅ Admin seeded:', process.env.ADMIN_EMAIL)
  process.exit(0)
}

seed().catch(console.error)
