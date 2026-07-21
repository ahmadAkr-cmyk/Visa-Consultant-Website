import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useToast } from './Toast'

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
          <ul className="space-y-2">
            <li>United Kingdom</li>
            <li>EUROPE / SCHENGEN</li>
            <li>UNITED STATES OF AMERICA</li>
            <li>AUSTRALIA</li>
            <li>TURKEY</li>
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
              <a href="/contact" className="hover:underline">Contact Us</a>
            </li>
             <div className="flex mt-4  items-center">
            <a href="https://www.instagram.com/sirconsultant1818?igsh=ZWxpZ3V0bTZvaHMx">
 <img  className="h-8.5 ml-17  hover:text-pink-500"  src="https://img.freepik.com/free-vector/instagram-logo_1199-122.jpg?semt=ais_hybrid&w=740&q=80" alt="Instagram" srcset="" /></a>
  
   <a href="https://www.facebook.com/share/1B2H3M6Mvt/">
 <img  className="h-8.5 ml-11  hover:text-pink-500"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEU7V53///8gRZUyUZrn6vKKl785VZxAW6Dh5O5yg7QmSZbR1uUxUJojR5Y2U5vx8vdbcKqyutSXosVidq3a3urM0uPCyd6ps9B7i7n09vrx9Pm4wNikrs1MZKRYbqp/j7tqfbGapsiPnMIAMY0VP5JdM9iBAAAD+UlEQVR4nO3dbVOjMBSG4fDSUEISXtRatta67v7/37hF7eiMs5iKyTmHee4Zx08i13RIhACq7K1mqCu1lqp6aC4w9fqtr5z1mnrHfiztrav6D8K2M+vRXdKmay/CsiiodydKRVG+ClvrqfclUt62L8JunZ/gVNFNwt5Q70fETH8WVusbZN7TVaYaR70XUXONGiz1TkTNDqpe60D6mq/Vqg/D6UCk3gOEEEIIIYQQQgghhMjz1hr3ofz8ZZwxxlpbFFr2NUJ9tvmbzf2u2ZbjmGXZOI6/2rLc3jZ3u0P/MGz2N0dtnZPJ9NYdN7sy+7p2q+QRtc0f70N0b0vY0tLGDuE8eUJtdH8NT5zQ2vsrfbKEOj+NVwMlCQvffO2RLDRP3/EJEubD94BihPm1Q6g0Yb77LlCIcAFQhtBdPwvKEprNAqAEoX9cAhQg1KZdudB9e54QIvTdMiB/Yb5dubA4LQSyF7qrzucFCpd/hNyFi49C7kK9dCBlLzSH1QuXA3kLi/3ahWbBaaEMoVv2Nzd/4cLTJgFC+3ydpd3eNp+65bz2dMVhOB5ORzstjX6OMVC50D9otntnJK74ahsIHHKhDw/qYxjwRuyzg0UdBKzlPncWNpQeBD86GLYaKvQQfCnoxOIg9iA8Z+4ChE+Sn410IUu+Vt4s+F7IhL8VPM6ECXeSD0OVB1xIvJc7Gaow4e/VC59XL9xInvAhhFBAEELIPwgh5B+EEPIPQgj5ByGE/INQhlD/vzChndnCy1aoq2YyIUI9t4UpWqMPW+VdUkl72T9wHXtJd6sX9rQXxRMIid+fm0C4p51OEggfaVfBEwiJl/njC0fiVfD4Qup1/vhC6nX++ELqdf74QupV8PhC6lum4guPxKdP8YXUd3lHF7bUN4VFF96uXkg9HcYXPlDfMhVdSH4pLrrwhvoO4uhC8v+uEls4Ug800YUl9WQRXdis/jOkfxgjtpD+HunYwj31ZBFd2FFPFtGF1L7oQvrpMLaQ+lJifCHxytqUfyq3MwUg5n6+JD93mohupj8Bq9ynvzMbYACcbx33YswFIYT8gxBC/kEIIf8ghJB/EELIPwgh5B+EEPIPQgj5ByGE/IMQQv5BCCH/IISQfxBCyD8IIeQfhBDyD0II+QchhPyDEEL+QQgh/yCEkH8QQsg/CCHkH4QQ8g9CCPmXUEj01rNUQl2pmuZlRKmEvlZE76ZPJbSDamjeZJNK6BpF9PrBREJdZSrrSV7Wk0ho+rMw6yimnTTCossmYWsJhtMkQm/bF2FW2vSfYgphYadfMgmztkv+auz4Qm26NrsIs6yvnPUplXGF2ltX9a9bUZfNNUNd/SThi+IKq3poLlv5B3kiS8fmdy97AAAAAElFTkSuQmCC" alt="Instagram" srcset="" />
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

        <div className="flex mt-1  items-center lg:hidden">
            <a href="https://www.instagram.com/sirconsultant1818?igsh=ZWxpZ3V0bTZvaHMx">
 <img  className="h-8.5 ml-28  hover:text-pink-500"  src="https://img.freepik.com/free-vector/instagram-logo_1199-122.jpg?semt=ais_hybrid&w=740&q=80" alt="Instagram" srcset="" /></a>
  
   <a href="https://www.facebook.com/share/1B2H3M6Mvt/" rel="noopener noreferrer">
 <img  className="h-8.5 ml-11  hover:text-pink-500"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEU7V53///8gRZUyUZrn6vKKl785VZxAW6Dh5O5yg7QmSZbR1uUxUJojR5Y2U5vx8vdbcKqyutSXosVidq3a3urM0uPCyd6ps9B7i7n09vrx9Pm4wNikrs1MZKRYbqp/j7tqfbGapsiPnMIAMY0VP5JdM9iBAAAD+UlEQVR4nO3dbVOjMBSG4fDSUEISXtRatta67v7/37hF7eiMs5iKyTmHee4Zx08i13RIhACq7K1mqCu1lqp6aC4w9fqtr5z1mnrHfiztrav6D8K2M+vRXdKmay/CsiiodydKRVG+ClvrqfclUt62L8JunZ/gVNFNwt5Q70fETH8WVusbZN7TVaYaR70XUXONGiz1TkTNDqpe60D6mq/Vqg/D6UCk3gOEEEIIIYQQQgghhMjz1hr3ofz8ZZwxxlpbFFr2NUJ9tvmbzf2u2ZbjmGXZOI6/2rLc3jZ3u0P/MGz2N0dtnZPJ9NYdN7sy+7p2q+QRtc0f70N0b0vY0tLGDuE8eUJtdH8NT5zQ2vsrfbKEOj+NVwMlCQvffO2RLDRP3/EJEubD94BihPm1Q6g0Yb77LlCIcAFQhtBdPwvKEprNAqAEoX9cAhQg1KZdudB9e54QIvTdMiB/Yb5dubA4LQSyF7qrzucFCpd/hNyFi49C7kK9dCBlLzSH1QuXA3kLi/3ahWbBaaEMoVv2Nzd/4cLTJgFC+3ydpd3eNp+65bz2dMVhOB5ORzstjX6OMVC50D9otntnJK74ahsIHHKhDw/qYxjwRuyzg0UdBKzlPncWNpQeBD86GLYaKvQQfCnoxOIg9iA8Z+4ChE+Sn410IUu+Vt4s+F7IhL8VPM6ECXeSD0OVB1xIvJc7Gaow4e/VC59XL9xInvAhhFBAEELIPwgh5B+EEPIPQgj5ByGE/INQhlD/vzChndnCy1aoq2YyIUI9t4UpWqMPW+VdUkl72T9wHXtJd6sX9rQXxRMIid+fm0C4p51OEggfaVfBEwiJl/njC0fiVfD4Qup1/vhC6nX++ELqdf74QupV8PhC6lum4guPxKdP8YXUd3lHF7bUN4VFF96uXkg9HcYXPlDfMhVdSH4pLrrwhvoO4uhC8v+uEls4Ug800YUl9WQRXdis/jOkfxgjtpD+HunYwj31ZBFd2FFPFtGF1L7oQvrpMLaQ+lJifCHxytqUfyq3MwUg5n6+JD93mohupj8Bq9ynvzMbYACcbx33YswFIYT8gxBC/kEIIf8ghJB/EELIPwgh5B+EEPIPQgj5ByGE/IMQQv5BCCH/IISQfxBCyD8IIeQfhBDyD0II+QchhPyDEEL+QQgh/yCEkH8QQsg/CCHkH4QQ8g9CCPmXUEj01rNUQl2pmuZlRKmEvlZE76ZPJbSDamjeZJNK6BpF9PrBREJdZSrrSV7Wk0ho+rMw6yimnTTCossmYWsJhtMkQm/bF2FW2vSfYgphYadfMgmztkv+auz4Qm26NrsIs6yvnPUplXGF2ltX9a9bUZfNNUNd/SThi+IKq3poLlv5B3kiS8fmdy97AAAAAElFTkSuQmCC" alt="Instagram" srcset="" />
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