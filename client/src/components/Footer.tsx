import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-black gold-text mb-1">GRD Travels</div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Travel & Fleet Management Platform. Serving India with premium tour packages and vehicle rentals.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-3">Quick Links</h4>
          <div className="space-y-2">
            {[['/', 'Home'], ['/fleet', 'Fleet'], ['/packages', 'Packages'], ['/booking', 'Book Now'], ['/ai-planner', 'Trip Planner']].map(([to, label]) => (
              <Link key={to} to={to} className="block text-gray-400 hover:text-yellow-500 text-sm transition-colors">{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-3">Popular Packages</h4>
          <div className="space-y-2">
            {['Manali', 'Shimla', 'Kashmir', 'Goa', 'Rajasthan', 'Golden Triangle'].map(p => (
              <Link key={p} to="/packages" className="block text-gray-400 hover:text-yellow-500 text-sm transition-colors">{p}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-3">Contact Us</h4>
          <div className="space-y-3">
            <a href="tel:8595995437" className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 text-sm transition-colors">
              <Phone size={14} /> 8595995437
            </a>
            <a href="tel:9810709148" className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 text-sm transition-colors">
              <Phone size={14} /> 9810709148
            </a>
            <a
              href="https://wa.me/918595995437?text=Hi%20GRD%20Travels%2C%20I%20want%20to%20book%20a%20trip"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm transition-colors"
            >
              <MessageCircle size={14} /> WhatsApp Us
            </a>
            <a href="mailto:info@grdtravels.com" className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 text-sm transition-colors">
              <Mail size={14} /> info@grdtravels.com
            </a>
            <div className="flex items-start gap-2 text-gray-400 text-sm">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              A36 Chander Vihar, Vikaspuri, New Delhi – 110041
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-gray-500 text-xs">© 2025 GRD Travels. All rights reserved.</p>
        <p className="text-gray-500 text-xs">Travel & Fleet Management Platform</p>
      </div>
    </footer>
  )
}
