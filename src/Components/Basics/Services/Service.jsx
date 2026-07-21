import React from 'react'
import serCard from './ser'
import { Link } from 'react-router-dom'
import Intro from './Intro'

const Service = () => {
  return (
    <div>
      <Intro/>
  <h1 className='flex justify-center items-center font-bold text-3xl mt-10 mb-10 '>
    Our Services
  </h1>
<div className='flex gap-8 items-start flex-wrap justify-evenly mt-17 mb-19'>
  {serCard.map((e) => (
    <div 
      key={e.id} 
      className="border-2rounded-lg p-4 w-119 h-63 flex flex-col transition-transform duration-300 hover:scale-105 cursor-pointer  hover:border-2 border-blue-950 rounded-md"
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

      </div>
  ))}
</div>

</div>
  )
}

export default Service
