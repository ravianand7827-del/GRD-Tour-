# GRD Travels – AI Powered Travel & Fleet Management Platform

## Tech Stack
- **Frontend**: React.js, TypeScript, Tailwind CSS v4, Framer Motion
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL
- **AI**: Google Gemini 1.5 Flash
- **Payments**: Razorpay
- **Infra**: Docker, Docker Compose, Nginx

## Project Structure
```
GRD Tour/
├── client/          # React frontend (Vite)
├── server/          # Node.js API
└── docker-compose.yml
```

## Quick Start (Development)

### Prerequisites
- Node.js 20+
- PostgreSQL running locally OR use Docker

### 1. Start with Docker (Recommended)
```bash
# Copy and fill env variables
cp server/.env.example server/.env
# Add your GEMINI_API_KEY in server/.env

docker-compose up --build
```
Visit http://localhost

### 2. Manual Setup

**Backend**
```bash
cd server
cp .env .env.local   # edit .env with your values
npm run dev          # starts on http://localhost:5000
npm run seed         # creates admin user
```

**Frontend**
```bash
cd client
npm run dev          # starts on http://localhost:5173
```

## Environment Variables (server/.env)
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for JWT tokens |
| `GEMINI_API_KEY` | Google Gemini API key |
| `RAZORPAY_KEY_ID` | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay secret |
| `ADMIN_EMAIL` | Admin dashboard email |
| `ADMIN_PASSWORD` | Admin dashboard password |

## Admin Dashboard
Visit `/admin` → Login with credentials from `.env`

## Contact Info
- **GRD Travels** | A36 Chander Vihar, Vikaspuri, New Delhi – 110041
- 📞 8595995437 | 9810709148
