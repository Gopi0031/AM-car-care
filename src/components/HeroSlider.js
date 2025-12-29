"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroSlider() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (images.length > 0 && isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images, isAutoPlaying]);

  const fetchHeroImages = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch("/api/cloudinary-images", {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.images && data.images.length > 0) {
          setImages(data.images);
          setLoading(false);
          return;
        }
      }
      
      throw new Error("No images from API");
      
    } catch (error) {
      setImages([

      ]);
      setLoading(false);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (loading) {
    return (
      <section className="relative h-[600px] md:h-[700px] bg-gradient-to-br from-blue-100 via-blue-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
          <p className="text-white text-xl">Loading Premium Experience...</p>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="relative bg-gradient-to-br from-blue-100 via-blue-100 to-blue-100 text-white py-20 min-h-[700px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Premium Car Care Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Professional automotive care for your vehicle
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-black">
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={image.public_id || index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentIndex ? "opacity-100 scale-110" : "opacity-0 scale-100"
          }`}
        >
          <img
            src={image.secure_url}
            alt={`Premium Car Service ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Premium Badge */}
           

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
              Automotive Car Care
              <span className="block text-blue-400">Services</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed animate-slide-up animation-delay-200">
              Professional automotive care with cutting-edge technology and expert technicians
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3 mb-8 animate-slide-up animation-delay-300">
              {['Expert Technicians', 'Premium Products', 'Quick Service', 'Best Price'].map((tag, i) => (
                <span
                  key={i}
                  className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-white/20 text-sm font-medium hover:bg-white/20 transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-400">
              <Link href="/booking">
                <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Book Service Now</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
              
              <Link href="/services">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-xl font-bold text-lg border-2 border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
                  View Services
                </button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-white/80 animate-slide-up animation-delay-500">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="font-medium">+91 12345 67890</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Open 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-black/30 backdrop-blur-md px-6 py-3 rounded-full flex items-center space-x-3 border border-white/20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex 
                    ? "bg-blue-500 w-10 h-3 shadow-lg shadow-blue-500/50" 
                    : "bg-white/50 hover:bg-white/75 w-3 h-3"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
            
            {/* Play/Pause */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="ml-3 p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-all"
              aria-label={isAutoPlaying ? "Pause" : "Play"}
            >
              {isAutoPlaying ? (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Arrow Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 group bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 group bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
