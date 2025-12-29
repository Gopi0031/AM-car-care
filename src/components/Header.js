"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-gray-900 text-white backdrop-blur-md border-b border-white/10 sticky top-0 shadow-lg" style={{ zIndex: 9999 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 lg:h-24">
            {/* Logo with Image */}
            <Link 
              href="/"
              className="flex items-center gap-3 group"
              onClick={closeMenu}
              style={{ position: 'relative', zIndex: 10001 }}
            >
              {/* Logo Image */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14">
                <Image
                  src="/logo.png" 
                  alt="logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* Logo Text */}
              <div className="text-lg sm:text-xl font-light tracking-tight text-white group-hover:text-amber-400 transition-colors duration-300" style={{ fontFamily: 'Georgia, serif' }}>
                <span className="hidden sm:inline">Automotive <span className="font-normal">Car Care</span></span>
                <span className="sm:hidden">Automotive Car Care</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              <Link
                href="/"
                className="text-sm tracking-[0.15em] uppercase text-white/90 hover:text-white transition-colors duration-300 font-light relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/services"
                className="text-sm tracking-[0.15em] uppercase text-white/90 hover:text-white transition-colors duration-300 font-light relative group"
              >
                Services
                <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/contact"
                className="text-sm tracking-[0.15em] uppercase text-white/90 hover:text-white transition-colors duration-300 font-light relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              {/* Book Now Button */}
              <Link
                href="/booking"
                className="group relative inline-flex items-center gap-3 px-8 py-3 border border-white/30 text-white text-xs tracking-[0.25em] uppercase font-light overflow-hidden transition-all duration-500 hover:border-amber-400"
              >
                <span className="absolute inset-0 bg-amber-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 group-hover:text-gray-900 transition-colors duration-300">Book Now</span>
                <svg 
                  className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 group-hover:text-gray-900 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-white hover:text-amber-400 transition-colors duration-300"
              aria-label="Toggle menu"
              style={{ position: 'relative', zIndex: 10001 }}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - MOVED OUTSIDE HEADER */}
      {isMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500"
            onClick={closeMenu}
            style={{ zIndex: 9998 }}
          />
          
          {/* Mobile Menu Panel */}
          <nav
            className="lg:hidden fixed top-0 right-0 w-[85vw] sm:w-[400px] h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transform transition-transform duration-700 ease-out shadow-2xl overflow-y-auto"
            style={{ zIndex: 10000 }}
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="relative flex flex-col min-h-full">
              {/* Mobile Header with Logo */}
              <div className="flex-shrink-0 px-6 py-8 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {/* Logo in Mobile Menu */}
                    <div className="relative w-10 h-10">
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="text-lg font-light text-white" style={{ fontFamily: 'Georgia, serif' }}>
                      <span className="block text-sm text-white/60 tracking-[0.2em] uppercase mb-1">Menu</span>
                      Automotive <span className="font-normal">Car Care</span>
                    </div>
                  </div>
                  <button
                    onClick={closeMenu}
                    className="p-2 text-white/70 hover:text-amber-400 hover:rotate-90 transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex-1 px-6 py-10 space-y-3">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="group flex items-center justify-between py-5 text-white/90 hover:text-amber-400 transition-all duration-300 border-b border-white/5 hover:border-amber-400/30"
                >
                  <span className="text-2xl font-light tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                    Home
                  </span>
                  <svg className="w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
                
                <Link
                  href="/services"
                  onClick={closeMenu}
                  className="group flex items-center justify-between py-5 text-white/90 hover:text-amber-400 transition-all duration-300 border-b border-white/5 hover:border-amber-400/30"
                >
                  <span className="text-2xl font-light tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                    Services
                  </span>
                  <svg className="w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
                
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="group flex items-center justify-between py-5 text-white/90 hover:text-amber-400 transition-all duration-300 border-b border-white/5 hover:border-amber-400/30"
                >
                  <span className="text-2xl font-light tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                    Contact
                  </span>
                  <svg className="w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
              </div>

              {/* Mobile CTA Button */}
              <div className="flex-shrink-0 px-6 py-6 border-t border-white/10">
                <Link
                  href="/booking"
                  onClick={closeMenu}
                  className="group relative flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 text-sm tracking-[0.2em] uppercase font-bold overflow-hidden transition-all duration-300 shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 hover:shadow-xl"
                >
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  </span>
                  
                  <span className="relative z-10">Book Now</span>
                  <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
              </div>

              {/* Contact Info Section */}
              <div className="flex-shrink-0 px-6 py-8 space-y-6 bg-black/40 backdrop-blur-sm border-t border-white/10">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-amber-400/80 mb-2 font-light">Location</p>
                    <p className="text-base text-white/90 font-light">Guntur, Andhra Pradesh</p>
                  </div>
                  
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-amber-400/80 mb-2 font-light">Email</p>
                    <a href="mailto:info@automotivecarcare.com" className="text-base text-white/90 font-light hover:text-amber-400 transition-colors break-all">
                      info@automotivecarcare.com
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-amber-400/80 mb-2 font-light">Phone</p>
                    <a href="tel:+911234567890" className="text-base text-white/90 font-light hover:text-amber-400 transition-colors">
                      +91 12345 67890
                    </a>
                  </div>
                </div>
                
                {/* Social Icons */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs tracking-[0.25em] uppercase text-amber-400/80 mb-4 font-light">Connect</p>
                  <div className="flex gap-3">
                    <a href="#" className="group w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-amber-400 border border-white/10 hover:border-amber-400 text-white hover:text-gray-900 transition-all duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="group w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-amber-400 border border-white/10 hover:border-amber-400 text-white hover:text-gray-900 transition-all duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="#" className="group w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-amber-400 border border-white/10 hover:border-amber-400 text-white hover:text-gray-900 transition-all duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
