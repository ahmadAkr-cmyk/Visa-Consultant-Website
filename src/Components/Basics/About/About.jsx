import React, { useState, useEffect } from 'react'
import Air from './Air'
import { Link } from 'react-router-dom'
import { supabase } from '../../../lib/supabaseClient'
import pass1 from '../../../assets/imgs/pass1.jpg'
import pass2 from '../../../assets/imgs/pass2.jpg'
import pass3 from '../../../assets/imgs/pass3.jpg'
import pass4 from '../../../assets/imgs/pass4.jpg'
import pass5 from '../../../assets/imgs/pass5.jpg'
import pass6 from '../../../assets/imgs/pass6.jpg'
import pass7 from '../../../assets/imgs/pass7.jpg'
import pass8 from '../../../assets/imgs/pass8.jpg'
import pass10 from '../../../assets/imgs/pass10.jpg'

const defaultGalleryImages = [
  { id: 'default-1', image_url: pass1, country: 'United Kingdom' },
  { id: 'default-2', image_url: pass2, country: 'United Kingdom' },
  { id: 'default-3', image_url: pass3, country: 'United Kingdom' },
  { id: 'default-4', image_url: pass4, country: 'United Kingdom' },
  { id: 'default-5', image_url: pass5, country: 'Schengen' },
  { id: 'default-6', image_url: pass6, country: 'United Kingdom' },
  { id: 'default-7', image_url: pass7, country: 'Schengen' },
  { id: 'default-8', image_url: pass8, country: 'Schengen' },
  { id: 'default-9', image_url: pass10, country: 'Schengen' },
]

const About = () => {
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGalleryImages()
  }, [])

  const fetchGalleryImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setGalleryImages(data)
    } catch (err) {
      console.error('Error fetching gallery images:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Heading */}
      <h1 className='hidden md:block ml-[44%] font-bold text-3xl text-blue-950 mt-2'>About Us</h1>
      <h1 className='md:hidden text-center font-bold text-3xl text-blue-950 mt-4'>About Us</h1>
      <div className='hidden md:block w-22 h-1 bg-green-400 rounded mt-1 ml-[45%]'></div>
      <div className='md:hidden w-20 h-1 bg-green-400 rounded mx-auto mt-2'></div>

      {/* Image + Info */}
<div className="flex flex-col md:flex-row items-center md:items-start bg-blue-200 px-4 md:px-20 gap-6
                mt-3 md:mt-20 mb-6 md:mb-0 h-156 lg:h-85">
  {/* Left Image */}
  <div className="w-full md:w-1/3">
    <img
      className="w-full  h-auto lg:h-70 object-cover rounded-xl transition-transform duration-300 ease-out hover:scale-105 mt-2"
      src="https://plus.unsplash.com/premium_photo-1661503228332-03778ab6d6a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D"
      alt="Meeting"
    />
  </div>

  {/* Right Text Box */}
  <div className="bg-amber-50 rounded-xl lg:mt-5 mr-0  p-6 w-full md:w-2/3 transition-transform duration-300 ease-out hover:scale-105">
    <h2 className="text-2xl font-bold">Who Are We</h2>
    <div className="w-16 h-1 bg-green-400 rounded mt-1 mb-3"></div>
    <p className="font-sans text-sm md:text-base">
      Since 2006, we have been providing trusted visa consultancy services
      with dedication and expertise. Alhamdulillah, over the years we have
      successfully guided countless students, professionals, workers, and
      tourists in securing visas for their dream destinations. Our proven
      track record, deep industry knowledge, and client-focused approach
      have made us a reliable choice for visa solutions. Now it's your
      turn—let us help you achieve your travel, study, or work goals. Your
      journey to your favorite country begins here!
    </p>
  </div>
</div>


      {/* Call to Action */}
      <div className='text-center mt-10'>
        <h1 className='font-black text-3xl text-blue-950 mb-4'>So Book Your Appointment</h1>
        <Link to="/contact">
          <button className='bg-blue-950 text-white h-12 px-8 text-xl rounded-3xl hover:bg-blue-800 transition mt-70'>
            Contact Us
          </button>
        </Link>
      </div>

      {/* Subheading */}
      <h2 className='text-center text-3xl text-blue-950 font-bold mt-12 mb-8'>
        Here Are Some Of Our Successful Visa Approvals In 2025
      </h2>

      {/* Air Component */}
      <Air />

      {/* Gallery Grid: Responsive, uniform card layout */}
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-8 px-4'>
  {/* Render default gallery images first */}
  {defaultGalleryImages.map((img) => (
    <div key={img.id} className="w-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          src={img.image_url}
          alt={img.country || 'Visa Approval'}
        />
      </div>
      {img.country && (
        <div className="p-2">
          <h3 className='text-base text-blue-950 font-semibold text-center'>{img.country}</h3>
        </div>
      )}
    </div>
  ))}
  {/* Then render admin-added dynamic images */}
  {galleryImages.map((img) => (
    <div key={img.id} className="w-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          src={img.image_url}
          alt={img.country || 'Visa Approval'}
        />
      </div>
      {img.country && (
        <div className="p-2">
          <h3 className='text-base text-blue-950 font-semibold text-center'>{img.country}</h3>
        </div>
      )}
    </div>
  ))}
</div>

    </>
  )
}

export default About