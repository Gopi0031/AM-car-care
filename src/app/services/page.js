"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchServices();
  }, []);

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

  // Comprehensive list of all car services
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-700 mx-auto mb-4"></div>
          <p className="text-primary-700 text-xl font-semibold">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-accent-500 text-primary-900 rounded-full text-sm font-semibold mb-4">
            Premium Services
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Car Care Services
          </h1>
          <p className="text-xl md:text-2xl text-background-light max-w-3xl mx-auto">
            Professional automotive care solutions tailored to keep your vehicle in perfect condition
          </p>
        </div>
      </section>

      {/* Available Services from Database */}
      {services.length > 0 && (
        <section className="py-16 bg-background-light border-b border-primary-700/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-accent-500/20 text-accent-600 rounded-full text-sm font-semibold mb-4">
                Book Online Now
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
                Our Featured Services
              </h2>
              <p className="text-xl text-primary-700/80 max-w-2xl mx-auto">
                Book these services instantly online
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={service._id}
                  className="bg-background rounded-xl shadow-lg border border-primary-700/20 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                >
                  {/* Service Header */}
                  <div className="bg-gradient-to-br from-primary-700 to-primary-900 p-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent-500/10 transform -skew-y-6"></div>
                    <div className="relative">
                      <div className="text-5xl mb-3">
                        {index % 6 === 0 && '🚗'}
                        {index % 6 === 1 && '✨'}
                        {index % 6 === 2 && '🔧'}
                        {index % 6 === 3 && '💎'}
                        {index % 6 === 4 && '🛠️'}
                        {index % 6 === 5 && '🧼'}
                      </div>
                      <h3 className="text-2xl font-bold text-background mb-2">
                        {service.name}
                      </h3>
                      <div className="inline-block bg-accent-500 text-primary-900 px-6 py-2 rounded-full font-bold text-xl">
                        ₹{service.price}
                      </div>
                    </div>
                  </div>

                  {/* Service Body */}
                  <div className="p-6">
                    <p className="text-primary-700/80 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    {service.features && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-primary-700 mb-3 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          What's Included:
                        </h4>
                        <ul className="space-y-2">
                          {service.features.split(',').map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start text-sm text-primary-700/70"
                            >
                              <span className="text-accent-500 mr-2">✓</span>
                              <span>{feature.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Book Button */}
                    <Link
                      href={`/booking?service=${service.slug}`}
                      className="block w-full bg-primary-700 text-background text-center py-3 rounded-lg hover:bg-primary-800 transition font-semibold shadow-lg group-hover:shadow-xl"
                    >
                      Book This Service →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Car Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-700/10 text-primary-700 rounded-full text-sm font-semibold mb-4">
              Complete Service List
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-700 mb-4">
              All Car <span className="text-accent-500">Services</span>
            </h2>
            <p className="text-xl text-primary-700/80 max-w-3xl mx-auto">
              Comprehensive list of all automotive care services we provide
            </p>
          </div>

          <div className="space-y-12">
            {allCarServices.map((category, catIndex) => (
              <div key={catIndex} className="bg-background-light rounded-2xl p-8 border border-primary-700/20 shadow-lg">
                <div className="flex items-center mb-8 pb-4 border-b-2 border-primary-700/20">
                  <div className="text-5xl mr-4">{category.icon}</div>
                  <h3 className="text-3xl font-bold text-primary-700">{category.category}</h3>
                  <span className="ml-auto bg-accent-500 text-primary-900 px-4 py-1 rounded-full text-sm font-bold">
                    {category.services.length} Services
                  </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, idx) => (
                    <div
                      key={idx}
                      className="bg-background p-6 rounded-xl border border-primary-700/20 hover:border-accent-500 hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="flex items-start mb-3">
                        <div className="text-4xl mr-3 group-hover:scale-110 transition-transform">
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-primary-700 mb-2 group-hover:text-accent-500 transition">
                            {service.name}
                          </h4>
                          <p className="text-sm text-primary-700/70">
                            {service.desc}
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/contact"
                        className="inline-block mt-3 text-sm text-accent-500 font-semibold hover:text-accent-600 transition"
                      >
                        Inquire Now →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 bg-background-light border-y border-primary-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-700 mb-4">
              Service <span className="text-accent-500">Packages</span>
            </h2>
            <p className="text-xl text-primary-700/80">
              Save more with our bundled packages
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <div className="bg-background rounded-2xl p-8 border-2 border-primary-700/20 hover:border-accent-500 transition-all hover:shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🥉</div>
                <h3 className="text-2xl font-bold text-primary-700 mb-2">Basic Care</h3>
                <div className="text-4xl font-bold text-accent-500 mb-2">₹999</div>
                <p className="text-sm text-primary-700/70">Perfect for monthly maintenance</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-primary-700">
                  <span className="text-accent-500 mr-2">✓</span>
                  Exterior Wash
                </li>
                <li className="flex items-center text-primary-700">
                  <span className="text-accent-500 mr-2">✓</span>
                  Interior Vacuum
                </li>
                <li className="flex items-center text-primary-700">
                  <span className="text-accent-500 mr-2">✓</span>
                  Tire Shine
                </li>
                <li className="flex items-center text-primary-700">
                  <span className="text-accent-500 mr-2">✓</span>
                  Dashboard Wipe
                </li>
              </ul>
              <Link href="/booking">
                <button className="w-full bg-primary-700 text-background py-3 rounded-lg hover:bg-primary-800 transition font-semibold">
                  Choose Plan
                </button>
              </Link>
            </div>

            {/* Premium Package */}
            <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-8 border-2 border-accent-500 transform scale-105 shadow-2xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent-500 text-primary-900 px-6 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🥈</div>
                <h3 className="text-2xl font-bold text-background mb-2">Premium Care</h3>
                <div className="text-4xl font-bold text-accent-500 mb-2">₹2,499</div>
                <p className="text-sm text-background-light">Complete care package</p>
              </div>
              <ul className="space-y-3 mb-8 text-background">
                <li className="flex items-center">
                  <span className="text-accent-500 mr-2">✓</span>
                  Everything in Basic
                </li>
                <li className="flex items-center">
                  <span className="text-accent-500 mr-2">✓</span>
                  Interior Deep Clean
                </li>
                <li className="flex items-center">
                  <span className="text-accent-500 mr-2">✓</span>
                  Waxing & Polishing
                </li>
                <li className="flex items-center">
                  <span className="text-accent-500 mr-2">✓</span>
                  Engine Bay Clean
                </li>
                <li className="flex items-center">
                  <span className="text-accent-500 mr-2">✓</span>
                  Underbody Wash
                </li>
              </ul>
              <Link href="/booking">
                <button className="w-full bg-accent-500 text-primary-900 py-3 rounded-lg hover:bg-accent-600 transition font-bold">
                  Choose Plan
                </button>
              </Link>
            </div>

            {/* Deluxe Package */}
            <div className="bg-background rounded-2xl p-8 border-2 border-primary-700/20 hover:border-accent-500 transition-all hover:shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🥇</div>
                <h3 className="text-2xl font-bold text-primary-700 mb-2">Deluxe Care</h3>
                <div className="text-4xl font-bold text-accent-500 mb-2">₹4,999</div>
                <p className="text-sm text-primary-700/70">Ultimate protection</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-primary-700">
                  <span className="text-accent-500 mr-2">✓</span>
                  Everything in Premium
                </li>
                <li className="flex items-center text-primary-700">
                  <span className="text-accent-500 mr-2">✓</span>
                  Ceramic Coating
                </li>
                <li className="flex items-center text-primary-700">
                  <span className="text-accent-500 mr-2">✓</span>
                  Paint Correction
                </li>
                <li className="flex items-center text-primary-700">
                  <span className="text-accent-500 mr-2">✓</span>
                  Full Detailing
                </li>
                <li className="flex items-center text-primary-700">
                  <span className="text-accent-500 mr-2">✓</span>
                  6-Month Warranty
                </li>
              </ul>
              <Link href="/booking">
                <button className="w-full bg-primary-700 text-background py-3 rounded-lg hover:bg-primary-800 transition font-semibold">
                  Choose Plan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Why Choose Automotive Car Care?
            </h2>
            <p className="text-xl text-primary-700/80 max-w-2xl mx-auto">
              Professional service with attention to detail
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-background-light rounded-xl border border-primary-700/20 hover:border-accent-500 transition">
              <div className="text-5xl mb-4">👨‍🔧</div>
              <h3 className="text-xl font-bold text-primary-700 mb-2">Expert Technicians</h3>
              <p className="text-primary-700/70">Certified professionals with years of experience</p>
            </div>

            <div className="text-center p-6 bg-background-light rounded-xl border border-primary-700/20 hover:border-accent-500 transition">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-primary-700 mb-2">Quick Service</h3>
              <p className="text-primary-700/70">Most services completed within 30-60 minutes</p>
            </div>

            <div className="text-center p-6 bg-background-light rounded-xl border border-primary-700/20 hover:border-accent-500 transition">
              <div className="text-5xl mb-4">💯</div>
              <h3 className="text-xl font-bold text-primary-700 mb-2">Quality Guaranteed</h3>
              <p className="text-primary-700/70">100% satisfaction or your money back</p>
            </div>

            <div className="text-center p-6 bg-background-light rounded-xl border border-primary-700/20 hover:border-accent-500 transition">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-primary-700 mb-2">Best Prices</h3>
              <p className="text-primary-700/70">Competitive rates without compromising quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-background-light mb-8">
              Book your service today and experience the difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="inline-block bg-accent-500 text-primary-900 px-8 py-4 rounded-lg hover:bg-accent-600 transition font-bold shadow-lg text-lg"
              >
                📅 Book Now
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-background text-primary-700 px-8 py-4 rounded-lg hover:bg-background-light transition font-bold shadow-lg text-lg"
              >
                💬 Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-background py-16 border-t border-primary-700/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <details className="bg-background-light rounded-lg p-6 border border-primary-700/20 group">
              <summary className="font-semibold text-primary-700 cursor-pointer flex items-center justify-between">
                <span>How long does a typical service take?</span>
                <span className="text-accent-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-primary-700/70">
                Most services are completed within 30-60 minutes. More comprehensive services may take 2-3 hours. We'll give you an accurate time estimate when you book.
              </p>
            </details>

            <details className="bg-background-light rounded-lg p-6 border border-primary-700/20 group">
              <summary className="font-semibold text-primary-700 cursor-pointer flex items-center justify-between">
                <span>Do I need to book in advance?</span>
                <span className="text-accent-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-primary-700/70">
                We recommend booking in advance to ensure your preferred time slot. However, we do accept walk-ins based on availability.
              </p>
            </details>

            <details className="bg-background-light rounded-lg p-6 border border-primary-700/20 group">
              <summary className="font-semibold text-primary-700 cursor-pointer flex items-center justify-between">
                <span>What payment methods do you accept?</span>
                <span className="text-accent-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-primary-700/70">
                We accept cash, credit/debit cards, UPI, and digital wallets. Payment is collected after service completion.
              </p>
            </details>

            <details className="bg-background-light rounded-lg p-6 border border-primary-700/20 group">
              <summary className="font-semibold text-primary-700 cursor-pointer flex items-center justify-between">
                <span>Do you offer any warranties?</span>
                <span className="text-accent-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-primary-700/70">
                Yes! All our services come with a 100% satisfaction guarantee. If you're not happy with the service, we'll make it right or provide a full refund.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
