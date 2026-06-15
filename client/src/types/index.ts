export interface Vehicle {
  id: number
  name: string
  category: string
  capacity: number
  ac: boolean
  pricePerKm: number
  image: string
  features: string[]
}

export interface TourPackage {
  id: number
  name: string
  destination: string
  duration: string
  price: number
  highlights: string[]
  image: string
}

export interface Booking {
  id: number
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
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}

export interface AIPlanRequest {
  budget: number
  people: number
  days: number
  destination?: string
}

export interface AIPlanResponse {
  destination: string
  vehicle: string
  hotels: { name: string; type: string; pricePerNight: number }[]
  itinerary: { day: number; title: string; activities: string[] }[]
  estimatedCost: number
}
