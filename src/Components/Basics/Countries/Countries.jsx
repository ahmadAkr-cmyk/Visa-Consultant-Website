import React, { useEffect, useState } from 'react'
import countriesName from './Card'
import { Link } from 'react-router-dom'
const Countries = () => {

  const [click, setclick] = useState(false)
  useEffect(() => {
  if( click === true){
    alert(`Contact us for further details ` )
  }
  
  }, [click])
  
  return (
    <>
    <h1 className='text-3xl text-blue-950 font-bold mt-3 ml-[34%] lg:ml-[45%] '>Countries</h1>
      <div className='w-20 h-1 bg-green-400 rounded mx-auto mt-1'></div>
    <div className='h-full flex gap-5 flex-wrap justify-center items-center mt-7 mb-11'>

      {countriesName.map((e) =>(
     <div className="h-99 w-90  ">
       <div className=" h-50 w-85">
       <img  className= "object-fill h-50 w-85 ml-2 transform transition-transform duration-500 hover:scale-110"src={e.img} alt="" srcset="" />
       </div>
        <h1 className='texl-3xl text-black font-bold ml-28 mt-2'>{e.country}</h1>
        <h2 className='texl-2xl text-black font-semibold ml-2'>Description:</h2>
        <p className='ml-6'>{e.description}</p>
      <Link to = "/contact" >
        <button  className='bg-blue-900 w-25 h-8 text-amber-50 rounded-md mt-2 ml-60'> Read More</button>
      </Link>
     </div>
      ))} 
    </div>
    
    </>
  )
}

export default Countries
