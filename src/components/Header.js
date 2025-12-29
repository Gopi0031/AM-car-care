"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-background-light border-b border-primary-700/20 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group z-50"
            onClick={closeMenu}
          >
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-700 group-hover:text-accent-600 transition">
              <span>Automotive Car Care</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-primary-700 hover:text-accent-600 transition font-medium shadow-lg"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-primary-700 hover:text-accent-600 transition font-medium shadow-lg"
            >
              Services
            </Link>
                        <Link
              href="/booking"
              className="inline-block bg-primary-700 text-background px-6 py-2 rounded-lg hover:bg-primary-800 transition font-semibold shadow-lg"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="text-primary-700 bg-primary-700 text-background px-6 py-2 rounded-lg hover:text-accent-600 transition font-medium shadow-lg"
            >
              Contact
            </Link>

          </nav>

          {/* Mobile/Tablet Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden z-50 p-2 rounded-lg text-primary-700 hover:bg-primary-700/10 transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              // Close Icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile/Tablet Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMenu}
        />
        
        <nav
          className={`lg:hidden fixed top-20 right-0 w-64 sm:w-80 h-[calc(100vh-5rem)] bg-background-light border-l border-primary-700/20 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-6 space-y-6">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={closeMenu}
                className="text-primary-700 hover:text-accent-600 transition font-medium text-lg py-2 px-4 rounded-lg hover:bg-primary-700/10"
              >
                🏠 Home
              </Link>
              <Link
                href="/services"
                onClick={closeMenu}
                className="text-primary-700 hover:text-accent-600 transition font-medium text-lg py-2 px-4 rounded-lg hover:bg-primary-700/10"
              >
                🔧 Services
              </Link>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="text-primary-700 hover:text-accent-600 transition font-medium text-lg py-2 px-4 rounded-lg hover:bg-primary-700/10"
              >
                📞 Contact
              </Link>
            </div>

            {/* Mobile CTA Button */}
            <div className="pt-4 border-t border-primary-700/20">
              <Link
                href="/booking"
                onClick={closeMenu}
                className="block w-full bg-primary-700 text-background text-center px-6 py-3 rounded-lg hover:bg-primary-800 transition font-semibold shadow-lg"
              >
                📅 Book Now
              </Link>
            </div>

            {/* Additional Mobile Info */}
            <div className="flex-1 flex flex-col justify-end space-y-3 text-sm text-primary-700/70">
              <div className="p-4 bg-accent-500/10 rounded-lg border border-accent-500/20">
                <p className="font-semibold text-primary-700 mb-2">📍 Location</p>
                <p>Guntur, Andhra Pradesh</p>
              </div>
              <div className="p-4 bg-accent-500/10 rounded-lg border border-accent-500/20">
                <p className="font-semibold text-primary-700 mb-2">📧 Email</p>
                <p>info@automotivecarcare.com</p>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
