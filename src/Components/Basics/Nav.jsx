import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to generate classes for links
  const desktopLinkClass = ({ isActive }) =>
    isActive
      ? 'hover:text-gray-200 text-green-500 font-semibold'
      : 'hover:text-gray-200';

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? 'block px-4 py-2 rounded bg-green-500 shadow text-white font-semibold'
      : 'block px-4 py-2 rounded hover:bg-gray-200';

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-blue-950 text-white h-9 flex items-center justify-between px-2 sm:px-4 text-xs sm:text-sm">
        <ul className="flex items-center justify-between w-full">
          {/* Mobile: only symbols */}
          <li className="sm:hidden flex-1 text-center">📍</li>
          <a href='tel:+923214244140 ' rel="noopener noreferrer" className="sm:hidden flex-1 text-center">📞</a>
          <a href='mailto:info@sirconsultant.com' rel="noopener noreferrer" className="sm:hidden flex-1 text-center">✉️</a>

          {/* Desktop: full text */}
          <li className="hidden sm:block">
            📍 15-A Hajvery Centre Queens Road Lahore
          </li>
          <a href='tel:+923214244140' rel="noopener noreferrer" className="hidden sm:block">
            📞 Call : +92 321 4244140
          </a>
          <a href='mailto:info@sirconsultant.com' rel="noopener noreferrer" className="hidden sm:block">
            ✉️ info@sirconsultatant.com
          </a>
        </ul>
      </div>

      {/* Main Navbar */}
      <nav className="bg-indigo-400 flex items-center justify-between px-4 sm:px-6 h-12 shadow-md relative">
        {/* Logo */}
        <div className="text-white font-bold text-xl flex-shrink-0">
          SIR CONSULTANT
        </div>

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
    </>
  );
};

export default Nav;
