import React from 'react';

const Intro = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-blue-200 py-12 px-6 lg:px-20 relative">
      
      {/* Left Image */}
      <div className="w-full lg:w-1/2 h-72 lg:h-96">
        <img
          className="w-full h-full object-cover rounded-xl transition-transform duration-300 ease-out hover:scale-105"
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60"
          alt="Visa Consultancy Meeting"
        />
      </div>

      {/* Right Card */}
      <div className="bg-amber-50 rounded-xl shadow-lg mt-6 lg:mt-0 lg:ml-10 p-6 lg:w-1/2 transition-transform duration-300 ease-out hover:scale-105">
        <h2 className="text-2xl font-bold text-blue-950">Services</h2>
        <div className="w-20 h-1 bg-green-400 rounded mt-1 mb-4"></div>

        <p className="text-gray-800 leading-relaxed font-sans">
          Since 2006, we have been providing trusted visa consultancy services 
          for Europe, the USA, the UK, Canada, and many other destinations. 
          We have guided thousands of students, professionals, tourists, and 
          families in achieving their international goals. Whether you are 
          planning to study abroad, apply for a work visa, travel on a tourist/visit visa, 
          or explore business, investor, and family reunification options, we are here to support you. 
          With 18+ years of proven expertise and a high success rate, 
          we deliver reliable and tailored visa solutions to make your journey abroad smooth and successful.
        </p>
      </div>
    </div>
  );
};

export default Intro;
