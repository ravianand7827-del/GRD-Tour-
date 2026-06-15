import { motion } from 'framer-motion'
import { Phone, MessageCircle, MapPin, Mail, Clock } from 'lucide-react'

export default function Contact() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-yellow-500 text-sm font-semibold uppercase tracking-wider">Get In Touch</span>
          <h1 className="section-title mt-2">Contact <span className="gold-text">Us</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card p-6">
              <h2 className="font-bold text-white text-xl mb-4">GRD Travels</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Office Address</p>
                    <p className="text-gray-400 text-sm">A36 Chander Vihar, Vikaspuri<br />New Delhi – 110041</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <a href="tel:8595995437" className="text-gray-400 hover:text-yellow-500 text-sm block transition-colors">8595995437</a>
                    <a href="tel:9810709148" className="text-gray-400 hover:text-yellow-500 text-sm block transition-colors">9810709148</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a href="mailto:info@grdtravels.com" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">info@grdtravels.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Business Hours</p>
                    <p className="text-gray-400 text-sm">Mon – Sat: 9:00 AM – 8:00 PM</p>
                    <p className="text-gray-400 text-sm">Sunday: 10:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:8595995437"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-4 rounded-xl transition-all"
              >
                <Phone size={20} /> Call Now
              </a>
              <a
                href="https://wa.me/918595995437?text=Hi%20GRD%20Travels%2C%20I%20need%20help%20with%20booking"
                target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-4 rounded-xl transition-all"
              >
                <MessageCircle size={20} /> WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card overflow-hidden h-96 lg:h-auto"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.23!2d77.0418!3d28.6692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04a0!2sChander+Vihar+Vikaspuri+New+Delhi!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ minHeight: '350px', border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GRD Travels Location"
            />
          </motion.div>
        </div>
      </div>
    </main>
  )
}
