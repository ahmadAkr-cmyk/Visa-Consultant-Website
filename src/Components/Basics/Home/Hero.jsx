import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const images = [
  "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1687992176093-6417a93fa3d0?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1581745841536-c10790870219?w=500&auto=format&fit=crop&q=60",
];

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Show text only once with smooth animation
    const timer = setTimeout(() => setTextVisible(true), 500);

    // Auto-slide images
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full h-[640px] overflow-hidden">
      {/* Background Images */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          className={`h-full w-full object-cover absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Text Overlay (comes from top once) */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
        <div
          className={`bg-blue-100 p-6 rounded-lg shadow-lg max-w-lg transition-all duration-1000 ${
            textVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-20 opacity-0"
          }`}
        >
          <h3 className="text-blue-900 text-3xl font-bold text-center">
            WELCOME TO SIR CONSULTANT
          </h3>
          <p className="text-black font-semibold mt-3 text-center">
            We are expert consultants with years of professional experience in visa guidance and travel documentation.
          </p>
          <div className="flex flex-col gap-3 mt-4">
            <Link to="/contact" className="mx-auto">
              <button className="w-40 h-10 bg-green-400 text-white text-[1.3rem] flex justify-center items-center rounded-md font-bold hover:bg-green-500 transition-colors">
                Contact Us
              </button>
            </Link>
            {whatsappNumber && whatsappNumber !== "your_whatsapp_number_here" && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-48 h-10 bg-green-500 text-white text-lg rounded-md mx-auto font-bold hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp size={20} />
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
