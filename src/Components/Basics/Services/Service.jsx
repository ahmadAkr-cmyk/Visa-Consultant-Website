import React from 'react'
import serCard from './ser'
import { Link } from 'react-router-dom'
import Intro from './Intro'
import { motion } from 'framer-motion'

const Service = () => {
  return (
    <div>
      <Intro/>
  <h1 className='flex justify-center items-center font-bold text-3xl mt-10 mb-10 '>
    Our Services
  </h1>
<div className='flex gap-8 items-start flex-wrap justify-evenly mt-17 mb-19'>
  {serCard.map((e, index) => (
    <motion.div 
      key={e.id}
      initial={{ opacity: 0, y: 50, rotateX: -15, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      whileHover={{ scale: 1.05, y: -10, boxShadow: "0px 20px 30px rgba(0,0,0,0.15)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
      className="border-2 rounded-lg p-4 w-119 h-63 flex flex-col cursor-pointer border-transparent hover:border-blue-950 bg-white"
    >
     
      <div className="flex items-center gap-2 mb-2">
        <img className='h-28 w-29' src={e.icon} alt={e.category} />
        <h2 className='font-bold text-2xl'>{e.category}</h2>
      </div>

     
      <p className='text-gray-700 text-sm line-clamp-2 mb-4'>
        {e.Des}
      </p>

      <div className='mt-auto flex justify-end'>
        <Link to = "/contact">
  <button className="bg-blue-950 text-white font-semibold px-4 py-2 rounded flex items-center gap-1 hover:bg-blue-950 transition">
    Read More <span className="text-lg">→</span>
  </button>
  </Link>
</div>

      </motion.div>
  ))}
</div>

</div>
  )
}

export default Service
