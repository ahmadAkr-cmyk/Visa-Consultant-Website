import React from 'react'
import plane from "../../../assets/imgs/plane.png";
import './Air.css';

const Air = () => {
  return (
    <div>
       <img
              src={plane}
              alt="Plane"
              className="
            absolute top-32 left-[-100px] animate-planeFly 
             mt-[744px] lg:mt-[504px] 
              h-57 w-57 
            lg:h-62 lg:w-62"
            />
          </div>
  )
}

export default Air
