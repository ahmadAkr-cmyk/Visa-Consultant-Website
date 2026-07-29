import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useToast } from './Toast'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()
  const today = new Date()

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubscribe = async (e) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Please enter a valid email address'
      })
      return
    }

    try {
      setLoading(true)
      console.log('Subscribing email:', email)
      
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }])

      if (error) {
        console.error('Newsletter subscribe error:', error)
        if (error.code === '23505') { // unique violation
          addToast({
            type: 'info',
            title: 'Already Subscribed',
            message: 'This email is already subscribed to our newsletter'
          })
        } else {
          throw error
        }
      } else {
        console.log('Successfully subscribed email:', email)
        addToast({
          type: 'success',
          title: 'Welcome!',
          message: 'Thank you for subscribing to our newsletter'
        })
        setEmail('')
      }
    } catch (err) {
      console.error('Error subscribing:', err)
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to subscribe. Check console for details.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-blue-950 text-white py-6 sm:py-10 w-full text-center text-base sm:text-lg">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        
        {/* Destinations - hidden on mobile */}
        <div className="hidden sm:block">
          <h2 className="text-xl font-semibold mb-4">Destinations</h2>
          <ul className="space-y-2 flex flex-col">
            <Link to="/countries" className="hover:underline">United Kingdom</Link>
            <Link to="/countries" className="hover:underline">EUROPE / SCHENGEN</Link>
            <Link to="/countries" className="hover:underline">UNITED STATES OF AMERICA</Link>
            <Link to="/countries" className="hover:underline">AUSTRALIA</Link>
            <Link to="/countries" className="hover:underline">TURKEY</Link>
          </ul>
        </div>

        {/* Company - hidden on mobile */}
        <div className="hidden sm:block">
          <h2 className="text-xl font-semibold mb-2">Company</h2>
          <ul className="space-y-2">
            <li>SIR CONSULTANT</li>
            <h2 className="text-xl font-semibold mt-3">CEO</h2>
             <li>Mr Shahzad Rafiq</li>
            <li> 
              <Link to="/contact" className="hover:underline">Contact Us</Link>
            </li>
             <div className="flex mt-4 items-center space-x-6">
            <a href="https://www.instagram.com/sirconsultant1818?igsh=ZWxpZ3V0bTZvaHMx" className="text-white hover:text-pink-500 transition-colors">
              <FaInstagram size={28} />
            </a>
            <a href="https://www.facebook.com/share/1B2H3M6Mvt/" className="text-white hover:text-blue-500 transition-colors">
              <FaFacebook size={28} />
            </a>
            </div>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <div className="block lg:hidden">
             <h2 className="text-xl font-semibold mt-3">CEO:</h2>
             <li className="mb-2">Mr Shahzad Rafiq</li>
          </div>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p className="mt-1">
            15-A Hajvery Center Opposite Gerry's Visa Center 
            Queens Road Lahore
          </p>
          <p className="mt-2">
            Call: +92 321 4244140 <br />
            Another: +92 306 4244140
          </p>
          <a  className="mt-2" href="mailto:info@sirconsultant.com" rel="noopener noreferrer">info@sirconsultant.com</a>
        </div>

        <div className="flex mt-1 items-center justify-center space-x-6 lg:hidden">
            <a href="https://www.instagram.com/sirconsultant1818?igsh=ZWxpZ3V0bTZvaHMx" className="text-white hover:text-pink-500 transition-colors">
              <FaInstagram size={28} />
            </a>
            <a href="https://www.facebook.com/share/1B2H3M6Mvt/" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition-colors">
              <FaFacebook size={28} />
            </a>
        </div>
                               

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
          <p className="mb-3">Enter your email to subscribe</p>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-lg text-black w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 sm:mt-10 border-t border-white/20 pt-4 sm:pt-5 text-sm sm:text-base">
        {`© ${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()} All Rights Reserved By `}
        <span className="font-semibold">SIR CONSULTANTS</span>
      </div>
    </footer>
  )
}

export default Footer