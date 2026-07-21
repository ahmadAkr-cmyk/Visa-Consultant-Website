import React from "react";
import plane from "../../../assets/imgs/plane.png";
import "./Aeroplane.css"; // animation CSS

const Aeroplane = () => {
  return (
    <div className="relative w-full h-103 lg:h-105 bg-gray-800 overflow-hidden p-5">
      {/* Text Content */}
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        
        {/* Left Text */}
        <div
          className="max-w-md bg-opacity-50 p-4 rounded 
                     transition-transform duration-300 transform 
                     hover:scale-105 hover:-translate-y-2 hover:bg-opacity-70"
        >
          <h1 className="text-white font-bold text-xl mb-2">Who Are We?</h1>
            <div className="w-16 h-1 bg-green-400 rounded  mb-2"></div>
          <p className="text-white text-sm leading-6">
            We are a team of immigration consultants with superior knowledge and
            experience in the visa process. With our help, you’ll enjoy the cultural
            and financial benefits of working on campus while living in countries
            that range from the United States to Cyprus....
          </p>
        </div>

        {/* Right Text → hidden on mobile, visible on lg */}
        <div
          className="hidden lg:block mr-12 max-w-md bg-opacity-50 p-4 rounded 
                     transition-transform duration-300 transform 
                     hover:scale-105 hover:-translate-y-2 hover:bg-opacity-70"
        >
          <h1 className="text-white font-bold text-xl mb-1">
            19 Years of Trusted Visa Success
          </h1>
            <div className="w-16 h-1 bg-green-400 rounded mb-2 "></div>
          <p className="text-white text-sm leading-6">
            By the grace of Allah, we have proudly served in visa consultancy for 19 years 
            with a 90% success ratio. Our expertise covers Study & Visit Visas for the UK, 
            USA, and Spain. We provide complete documentation support and step-by-step guidance.
          </p>
        </div>
      </div>

      {/* Plane Image */}
      <img
        src={plane}
        alt="Plane"
      className="absolute left-[-100px] h-39 w-39 lg:h-50 lg:w-50 animate-planeFly 
            top-46 lg:top-37 mt-8 lg:mt-12"

      />
    </div>
  );
};

export default Aeroplane;
