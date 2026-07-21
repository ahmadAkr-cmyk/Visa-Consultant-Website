import React, { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { useToast } from '../../Toast'
import { FaWhatsapp } from 'react-icons/fa'

const images = [
  "https://images.unsplash.com/photo-1488747279002-c8523379faaa?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1578912996078-305d92249aa6?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=500&auto=format&fit=crop&q=60",
]

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER

const Contact = () => {
  const [curr, setCurr] = useState(0)
  const [clicked, setClicked] = useState(false)
  const { addToast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  // Background slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurr((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Welcome alert
  useEffect(() => {
    const timer = setTimeout(() => {
      addToast({
        type: 'info',
        title: 'Welcome!',
        message: 'Send your message to us'
      })
    }, 2000)
    return () => clearTimeout(timer)
  }, [addToast])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Submit form to Supabase
  const handleSubmit = async () => {
    setClicked(true)
    try {
      console.log('Inserting message into database...')
      const { error: dbError } = await supabase
        .from("messages")
        .insert([{ ...formData, is_read: false }])

      if (dbError) {
        console.error('Database error:', dbError)
        throw dbError
      }

      console.log('Calling thank you email function...')
      // Call Supabase Edge Function to send email
      const { error: emailError } = await supabase.functions.invoke('send-thank-you-email', {
        body: { name: formData.name, email: formData.email, message: formData.message }
      })

      if (emailError) {
        console.error('Email function error:', emailError)
        // Don't fail the whole form if email fails - just log it
      }

      addToast({
        type: 'success',
        title: 'Message Sent!',
        message: 'Your message has been sent! Kindly wait for our response'
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error!',
        message: 'Failed to send message. Please try again later'
      })
      console.error(err)
    }
    setClicked(false)
  }

  // Form validation
  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.message

  return (
    <div className="relative w-full h-[650px] overflow-hidden">
      {/* Background Slider */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`Slide ${i}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === curr ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Contact Box Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-start">
        <h1 className="font-bold text-3xl text-blue-950 bg-white mt-6 px-4 py-2 rounded-lg">
          Contact Us
        </h1>

        <div className="mt-10 p-6 w-[85%] sm:w-[70%] md:w-[50%] lg:w-[40%] rounded-lg shadow-lg">
          {/* WhatsApp Button */}
          {whatsappNumber && whatsappNumber !== "your_whatsapp_number_here" && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-12 w-full rounded-md font-semibold mb-4 bg-green-500 text-white hover:bg-green-600 transition-all"
            >
              <FaWhatsapp size={20} />
              Contact on WhatsApp
            </a>
          )}

          {/* Inputs */}
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="h-10 border border-gray-400 rounded px-3 bg-amber-50"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="h-10 border border-gray-400 rounded px-3 bg-amber-50"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="h-10 border border-gray-400 rounded px-3 bg-amber-50"
            />
          </div>

          {/* Big chatbox */}
          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            className="mt-4 w-full h-32 border border-gray-400 rounded px-3 py-2 bg-amber-50 resize-none"
          ></textarea>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || clicked}
            className={`h-12 w-full rounded-md font-semibold mt-4 transition-all
              ${
                clicked
                  ? "bg-green-700 text-white"
                  : isFormValid
                  ? "bg-blue-950 text-white hover:bg-blue-800"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
          >
            {clicked ? "Sending..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact