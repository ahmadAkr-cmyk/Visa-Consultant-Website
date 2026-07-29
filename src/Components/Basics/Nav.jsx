import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to generate classes for links
  const desktopLinkClass = ({ isActive }) =>
    isActive
      ? 'relative text-white font-bold tracking-wide after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-white after:transition-all after:duration-300'
      : 'relative text-gray-200 font-medium tracking-wide hover:text-white after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all after:duration-300';

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? 'block px-4 py-2 rounded bg-green-500 shadow text-white font-semibold'
      : 'block px-4 py-2 rounded hover:bg-gray-200';

  return (
    <div className="sticky top-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-blue-950 text-white h-9 flex items-center justify-between px-2 sm:px-4 text-xs sm:text-sm">
          {/* Mobile: only icons */}
          <a href="https://maps.google.com/?q=15-A+Hajvery+Centre+Queens+Road+Lahore" target="_blank" rel="noopener noreferrer" className="sm:hidden flex-1 flex justify-center text-red-500"><FaMapMarkerAlt /></a>
          <a href='tel:+923214244140' rel="noopener noreferrer" className="sm:hidden flex-1 flex justify-center text-green-400"><FaPhoneAlt /></a>
          <a href='mailto:info@sirconsultant.com' rel="noopener noreferrer" className="sm:hidden flex-1 flex justify-center text-white"><FaEnvelope /></a>

          {/* Desktop: full text */}
          <div className="hidden sm:flex flex-1 items-center gap-2 justify-start text-gray-200">
            <FaMapMarkerAlt className="text-red-500" /> 15-A Hajvery Centre Queens Road Lahore
          </div>
          <a href='tel:+923214244140' rel="noopener noreferrer" className="hidden sm:flex flex-1 items-center gap-2 justify-center text-gray-200 hover:text-white transition-colors">
            <FaPhoneAlt className="text-green-400" /> Call : +92 321 4244140
          </a>
          <a href='mailto:info@sirconsultant.com' rel="noopener noreferrer" className="hidden sm:flex flex-1 items-center gap-2 justify-end text-gray-200 hover:text-white transition-colors">
            <FaEnvelope className="text-white" /> info@sirconsultant.com
          </a>
      </div>

      {/* Main Navbar */}
      <nav className="bg-indigo-400 flex items-center justify-between px-4 sm:px-6 h-12 shadow-md relative">
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-xl flex-shrink-0 cursor-pointer">
          SIR CONSULTANT
        </Link>

        {/* Hamburger button for mobile */}
        <button
          className="sm:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Links */}
        <ul className="hidden sm:flex ml-auto space-x-6 text-white">
          <li>
            <NavLink to="/" className={desktopLinkClass}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={desktopLinkClass}>About</NavLink>
          </li>
          <li>
            <NavLink to="/countries" className={desktopLinkClass}>Countries</NavLink>
          </li>
          <li>
            <NavLink to="/services" className={desktopLinkClass}>Services</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={desktopLinkClass}>Contact</NavLink>
          </li>
        </ul>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <ul className="absolute top-0 left-0 h-screen w-64 bg-white text-black flex flex-col p-4 space-y-2 shadow-lg sm:hidden z-50 transition-transform duration-300">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-2">
              <div className="bg-amber-50 h-10 flex items-center justify-center text-2xl font-bold text-blue-950 w-full">
                Sir Consultant
              </div>
              <button
                className="text-black text-2xl ml-2"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>
            </div>

            <li>
              <NavLink to="/" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>About</NavLink>
            </li>
            <li>
              <NavLink to="/countries" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Countries</NavLink>
            </li>
            <li>
              <NavLink to="/services" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Services</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Contact</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Nav;
