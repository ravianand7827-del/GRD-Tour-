import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

export const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      mobile VARCHAR(15) NOT NULL,
      email VARCHAR(255),
      pickup_city VARCHAR(255) NOT NULL,
      destination VARCHAR(255) NOT NULL,
      journey_date DATE NOT NULL,
      return_date DATE,
      vehicle_type VARCHAR(255) NOT NULL,
      passengers INTEGER NOT NULL,
      message TEXT,
      status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled')),
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `)
  console.log('✅ Database initialized')
}
