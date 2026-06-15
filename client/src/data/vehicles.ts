import type { Vehicle } from '../types'

export const vehicles: Vehicle[] = [
  {
    id: 1, name: 'Tempo Traveller 12 Seater', category: 'Tempo Traveller',
    capacity: 12, ac: true, pricePerKm: 18,
    image: '/vehicles/tempo-12.jpg',
    features: ['AC', 'Push-back Seats', 'Music System', 'GPS Tracking'],
  },
  {
    id: 2, name: 'Tempo Traveller 17 Seater', category: 'Tempo Traveller',
    capacity: 17, ac: true, pricePerKm: 22,
    image: '/vehicles/tempo-17.jpg',
    features: ['AC', 'LCD Screen', 'Push-back Seats', 'GPS Tracking'],
  },
  {
    id: 9, name: 'Tempo Traveller 25 Seater', category: 'Tempo Traveller',
    capacity: 25, ac: true, pricePerKm: 28,
    image: '/vehicles/tempo-25.jpg',
    features: ['AC', 'Push-back Seats', 'Music System', 'Driver Allowance ₹700/day'],
  },
  {
    id: 3, name: 'Luxury Tempo Traveller', category: 'Luxury',
    capacity: 14, ac: true, pricePerKm: 30,
    image: '/vehicles/luxury-tempo.jpg',
    features: ['Luxury Seats', 'LED TV', 'Mini Fridge', 'WiFi', 'GPS'],
  },
  {
    id: 4, name: 'Innova Crysta', category: 'SUV',
    capacity: 7, ac: true, pricePerKm: 14,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80',
    features: ['AC', 'Leather Seats', 'Music System', 'GPS'],
  },
  {
    id: 5, name: 'Swift Dzire', category: 'Sedan',
    capacity: 4, ac: true, pricePerKm: 10,
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&q=80',
    features: ['AC', 'Music System', 'GPS Tracking'],
  },
  {
    id: 6, name: 'Ertiga', category: 'MPV',
    capacity: 7, ac: true, pricePerKm: 12,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80',
    features: ['AC', 'Music System', 'Spacious Luggage'],
  },
  {
    id: 7, name: 'Mini Bus', category: 'Bus',
    capacity: 30, ac: true, pricePerKm: 35,
    image: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=600&q=80',
    features: ['AC', 'Recliner Seats', 'LCD TV', 'GPS'],
  },
  {
    id: 8, name: 'Volvo Bus', category: 'Bus',
    capacity: 45, ac: true, pricePerKm: 50,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
    features: ['AC', 'Sleeper Seats', 'Entertainment System', 'WiFi'],
  },
]
