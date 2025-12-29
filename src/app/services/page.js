"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./services.css";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null); // Changed to null
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [services]);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      const data = await response.json();
      setServices(data.services || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const allCarServices = [
    {
      category: "Washing & Cleaning",
      icon: "🧼",
      services: [
        { name: "Basic Car Wash", desc: "Exterior wash with soap and water", icon: "🚿" },
        { name: "Premium Wash", desc: "Complete exterior and interior cleaning", icon: "✨" },
        { name: "Interior Cleaning", desc: "Vacuum, seats, dashboard, and carpet cleaning", icon: "🧹" },
        { name: "Engine Bay Cleaning", desc: "Deep clean of engine compartment", icon: "🔧" },
        { name: "Underbody Wash", desc: "High-pressure cleaning of car underside", icon: "💦" },
      ]
    },
    {
      category: "Detailing Services",
      icon: "💎",
      services: [
        { name: "Full Detailing", desc: "Complete interior and exterior restoration", icon: "✨" },
        { name: "Paint Correction", desc: "Remove scratches and swirl marks", icon: "🎨" },
        { name: "Ceramic Coating", desc: "Long-lasting paint protection", icon: "🛡️" },
        { name: "Waxing & Polishing", desc: "Premium wax application for shine", icon: "💫" },
        { name: "Headlight Restoration", desc: "Clear foggy headlights", icon: "💡" },
        { name: "Tar & Bug Removal", desc: "Remove stubborn contaminants", icon: "🪲" },
      ]
    },
    {
      category: "Interior Services",
      icon: "🪑",
      services: [
        { name: "Seat Shampooing", desc: "Deep clean fabric or leather seats", icon: "🧴" },
        { name: "Leather Treatment", desc: "Conditioning and protection", icon: "🧤" },
        { name: "Dashboard Polishing", desc: "Clean and shine dashboard", icon: "✨" },
        { name: "Odor Removal", desc: "Eliminate unpleasant smells", icon: "🌸" },
        { name: "AC Vent Cleaning", desc: "Deep clean air vents", icon: "❄️" },
        { name: "Carpet Shampooing", desc: "Deep clean floor mats and carpets", icon: "🧽" },
      ]
    },
    {
      category: "Maintenance Services",
      icon: "🔧",
      services: [
        { name: "Oil Change", desc: "Engine oil and filter replacement", icon: "🛢️" },
        { name: "Battery Check", desc: "Testing and replacement", icon: "🔋" },
        { name: "Tire Rotation", desc: "Balance and align tires", icon: "⚙️" },
        { name: "Brake Inspection", desc: "Check pads, rotors, and fluid", icon: "🛑" },
        { name: "Air Filter Replacement", desc: "Cabin and engine air filters", icon: "💨" },
        { name: "Coolant Flush", desc: "Replace engine coolant", icon: "🌡️" },
        { name: "Wheel Alignment", desc: "Precision alignment service", icon: "🎯" },
        { name: "Suspension Check", desc: "Inspect shocks and struts", icon: "🔩" },
      ]
    },
    {
      category: "Protection Services",
      icon: "🛡️",
      services: [
        { name: "PPF Installation", desc: "Paint Protection Film application", icon: "📋" },
        { name: "Underbody Coating", desc: "Rust protection for underside", icon: "🔒" },
        { name: "Teflon Coating", desc: "Water-repellent paint coating", icon: "💧" },
        { name: "Window Tinting", desc: "UV protection and privacy", icon: "🪟" },
        { name: "Rust Prevention", desc: "Anti-rust treatment", icon: "🛡️" },
      ]
    },
    {
      category: "Specialized Services",
      icon: "⭐",
      services: [
        { name: "Sanitization", desc: "Complete vehicle disinfection", icon: "🧪" },
        { name: "Steam Cleaning", desc: "Chemical-free deep cleaning", icon: "♨️" },
        { name: "Scratch Removal", desc: "Minor scratch repair", icon: "🩹" },
        { name: "Dent Repair", desc: "Paintless dent removal", icon: "🔨" },
        { name: "Glass Treatment", desc: "Rain-repellent coating", icon: "☔" },
        { name: "Pre-Sale Detailing", desc: "Prepare car for sale", icon: "💰" },
      ]
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-900 mb-4"></div>
          <p className="text-gray-900 text-xl font-light animate-pulse">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-32 md:py-40 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6 font-light animate-slide-down">
              Premium Services
            </p>
            <h1 className="text-5xl uppercase md:text-7xl lg:text-7xl font-light mb-8 leading-tight animate-fade-in-up delay-100" style={{ fontFamily: 'Georgia, serif' }}>
              Automotive Car Care
              <br />
              <em className="text-amber-400">Services</em>
            </h1>
            <div className="w-20 h-px bg-gray-600 mx-auto mb-10 animate-scale-in delay-200"></div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up delay-300">
              Professional automotive care solutions tailored to keep your vehicle in perfect condition
            </p>
          </div>
        </div>
      </section>

      {/* Available Services from Database */}
      {services.length > 0 && (
        <section className="py-24 md:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-20" data-animate id="featured-header">
              <p className="text-sm tracking-[0.3em] uppercase text-gray-500 mb-4 font-light animate-slide-down">
                Book Online Now
              </p>
              <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 animate-fade-in-up delay-100" style={{ fontFamily: 'Georgia, serif' }}>
                Featured Services
              </h2>
              <div className="w-20 h-px bg-gray-400 mx-auto mb-8 animate-scale-in delay-200"></div>
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed animate-fade-in-up delay-300">
                Book these services instantly online
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service, index) => (
                <div
                  key={service._id}
                  data-animate
                  id={`service-${index}`}
                  className={`group bg-white overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 animate-fade-in-up ${
                    index % 3 === 0 ? 'stagger-delay-1' : 
                    index % 3 === 1 ? 'stagger-delay-2' : 
                    'stagger-delay-3'
                  }`}
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-700"></div>
                    <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/10 transition-all duration-700"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white transform group-hover:scale-105 transition-transform duration-700">
                      <div className="text-7xl mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                        {index % 6 === 0 && '🚗'}
                        {index % 6 === 1 && '✨'}
                        {index % 6 === 2 && '🔧'}
                        {index % 6 === 3 && '💎'}
                        {index % 6 === 4 && '🛠️'}
                        {index % 6 === 5 && '🧼'}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-light mb-6 px-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                        {service.name}
                      </h3>
                      <div className="bg-amber-400 text-gray-900 px-8 py-3 font-light text-2xl transform group-hover:scale-110 group-hover:bg-white transition-all duration-500">
                        ₹{service.price}
                      </div>
                    </div>
                  </div>

                  <div className="p-10">
                    <p className="text-gray-600 mb-8 leading-relaxed font-light text-lg">
                      {service.description}
                    </p>

                    {service.features && (
                      <div className="mb-8">
                        <h4 className="text-xs font-medium text-gray-900 mb-5 tracking-[0.2em] uppercase">
                          What's Included:
                        </h4>
                        <ul className="space-y-3">
                          {service.features.split(',').map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start text-sm text-gray-600 font-light transform hover:translate-x-2 transition-transform duration-300"
                            >
                              <svg className="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>{feature.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link
                      href={`/booking?service=${service.slug}`}
                      className="group/btn relative block w-full py-4 border-2 border-gray-900 text-gray-900 text-center text-sm tracking-[0.2em] uppercase font-light overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gray-900 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></span>
                      <span className="relative inline-flex items-center gap-3 group-hover/btn:text-white transition-colors duration-500">
                        Book This Service
                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Car Services Section - INITIAL VIEW WITH CATEGORY OPTIONS */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20" data-animate id="all-services-header">
            <p className="text-sm tracking-[0.3em] uppercase text-gray-500 mb-4 font-light animate-slide-down">
              Complete Service List
            </p>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 animate-fade-in-up delay-100" style={{ fontFamily: 'Georgia, serif' }}>
              All Car <em className="text-gray-700">Services</em>
            </h2>
            <div className="w-20 h-px bg-gray-400 mx-auto mb-8 animate-scale-in delay-200"></div>
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed animate-fade-in-up delay-300">
              Select a category to view all available services
            </p>
          </div>

          {/* Category Grid - Initial View */}
          {!activeCategory && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
              {allCarServices.map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(category.category)}
                  className="group bg-white p-10 border-2 border-gray-200 hover:border-amber-400 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-left"
                >
                  <div className="flex items-start mb-6">
                    <div className="text-6xl mr-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300" style={{ fontFamily: 'Georgia, serif' }}>
                        {category.category}
                      </h3>
                      <p className="text-sm text-gray-500 font-light tracking-wide mb-4">
                        {category.services.length} SERVICES
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                    <span className="text-sm tracking-wide uppercase font-light mr-2">View Services</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Services Detail View - When Category Selected */}
          {activeCategory && (
            <div className="animate-fade-in-up">
              {/* Back Button */}
              <button
                onClick={() => setActiveCategory(null)}
                className="mb-8 inline-flex items-center text-gray-900 hover:text-amber-600 transition-colors duration-300 group"
              >
                <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                </svg>
                <span className="text-sm tracking-wide uppercase font-light">Back to Categories</span>
              </button>

              {allCarServices
                .filter(cat => cat.category === activeCategory)
                .map((category, catIndex) => (
                <div key={catIndex}>
                  {/* Category Header */}
                  <div className="bg-gray-800 border-l-4 border-amber-400 p-10 mb-8 shadow-xl">
                    <div className="flex items-center">
                      <div className="text-7xl mr-6 transform hover:scale-110 hover:rotate-6 transition-all duration-500">
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-4xl md:text-5xl font-light text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                          {category.category}
                        </h3>
                        <p className="text-sm text-gray-300 font-light tracking-wide">
                          {category.services.length} SERVICES AVAILABLE
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Services List */}
                  <div className="space-y-4">
                    {category.services.map((service, idx) => (
                      <div
                        key={idx}
                        className="group bg-gray-900 backdrop-blur-md p-8 border-2 border-gray-700 hover:border-amber-400 hover:shadow-2xl transition-all duration-500 transform hover:translate-x-2"
                      >
                        <div className="flex items-center">
                          <div className="text-5xl mr-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 flex-shrink-0">
                            {service.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-medium text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                              {service.name}
                            </h4>
                            <p className="text-base text-gray-300 font-light leading-relaxed mb-4">
                              {service.desc}
                            </p>
                            <Link
                              href="/contact"
                              className="inline-flex items-center text-sm text-amber-400 font-light hover:text-amber-300 transition-all duration-300 group/link tracking-wide uppercase"
                            >
                              Inquire Now
                              <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20" data-animate id="why-choose-header">
            <p className="text-sm tracking-[0.3em] uppercase text-gray-500 mb-4 font-light animate-slide-down">
              Why Choose Us
            </p>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 animate-fade-in-up delay-100" style={{ fontFamily: 'Georgia, serif' }}>
              Why Choose Automotive Car Care?
            </h2>
            <div className="w-20 h-px bg-gray-400 mx-auto mb-8 animate-scale-in delay-200"></div>
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed animate-fade-in-up delay-300">
              Professional service with attention to detail
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: '👨‍🔧', title: 'Expert Technicians', desc: 'Certified professionals with years of experience', delay: '200' },
              { icon: '⚡', title: 'Quick Service', desc: 'Most services completed in-time only', delay: '200' },
              { icon: '💯', title: 'Quality Guaranteed', desc: '100% satisfaction or your money back', delay: '200' },
              { icon: '💰', title: 'Best Prices', desc: 'Competitive rates without compromising quality', delay: '200' },
            ].map((item, index) => (
              <div 
                key={index}
                className={`text-center p-10 bg-white hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 group animate-fade-in-up delay-${item.delay}`}
                style={{ opacity: 0 }}
              >
                <div className="text-7xl mb-8 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-medium text-gray-900 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed text-lg">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 p-16 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.3),transparent_70%)] animate-pulse"></div>
            </div>
            <div className="relative">
              <p className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-6 font-light animate-slide-down">
                Get Started Today
              </p>
              <h2 className="text-4xl md:text-6xl font-light text-white mb-8 animate-fade-in-up delay-100" style={{ fontFamily: 'Georgia, serif' }}>
                Ready to Get Started?
              </h2>
              <div className="w-20 h-px bg-gray-600 mx-auto mb-10 animate-scale-in delay-200"></div>
              <p className="text-2xl text-gray-300 mb-16 font-light animate-fade-in-up delay-300">
                Book your service today and experience the difference
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/booking"
                  className="group relative inline-flex items-center justify-center gap-3 bg-amber-400 text-gray-900 px-12 py-5 text-sm tracking-[0.2em] uppercase font-light overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                  <span className="relative">📅 Book Now</span>
                </Link>
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-12 py-5 text-sm tracking-[0.2em] uppercase font-light overflow-hidden"
                >
                  <span className="absolute inset-0 bg-amber-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                  <span className="relative">💬 Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
