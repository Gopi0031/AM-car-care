import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section with Image Slider */}
      <HeroSlider />
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-gray-500 mb-6 font-light">
            About Us
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Automotive Car Care
          </h2>
          <div className="w-16 h-px bg-gray-400 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto mb-6">
            Welcome to Automotive Car Care, your trusted partner in premium automotive services. We specialize in providing top-quality car wash, detailing, and maintenance services that keep your vehicle looking pristine and performing at its best.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
            With expert technicians, state-of-the-art equipment, and a commitment to excellence, we ensure every vehicle receives the care it deserves. Located in Guntur, Andhra Pradesh, we're here to serve you 24/7.
          </p>
        </div>
      </section>

      {/* Services Section with 4 Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-gray-500 mb-4 font-light">
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Our Services
            </h2>
            <div className="w-16 h-px bg-gray-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Professional automotive care services tailored to your needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {/* Service Card 1 - Car Wash */}
            <div className="group bg-white p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-900">
              <div className="w-14 h-14 bg-gray-900 group-hover:bg-amber-400 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                <svg className="w-7 h-7 text-white group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Car Wash</h3>
              <p className="text-gray-600 font-light mb-4 leading-relaxed">
                Complete exterior and interior washing with premium products
              </p>
              <p className="text-gray-900 font-light">
                <span className="text-sm text-gray-500">FROM</span>
                <span className="text-2xl font-normal ml-2">₹499</span>
              </p>
            </div>

            {/* Service Card 2 - Detailing */}
            <div className="group bg-white p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-900">
              <div className="w-14 h-14 bg-gray-900 group-hover:bg-amber-400 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                <svg className="w-7 h-7 text-white group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Car Detailing</h3>
              <p className="text-gray-600 font-light mb-4 leading-relaxed">
                Professional detailing to restore showroom shine
              </p>
              <p className="text-gray-900 font-light">
                <span className="text-sm text-gray-500">FROM</span>
                <span className="text-2xl font-normal ml-2">₹2,999</span>
              </p>
            </div>

            {/* Service Card 3 - Maintenance */}
            <div className="group bg-white p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-900">
              <div className="w-14 h-14 bg-gray-900 group-hover:bg-amber-400 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                <svg className="w-7 h-7 text-white group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Maintenance</h3>
              <p className="text-gray-600 font-light mb-4 leading-relaxed">
                Regular inspection to keep your car running smoothly
              </p>
              <p className="text-gray-900 font-light">
                <span className="text-sm text-gray-500">FROM</span>
                <span className="text-2xl font-normal ml-2">₹1,499</span>
              </p>
            </div>

            {/* Service Card 4 - Interior Cleaning */}
            <div className="group bg-white p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-900">
              <div className="w-14 h-14 bg-gray-900 group-hover:bg-amber-400 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                <svg className="w-7 h-7 text-white group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Interior Cleaning</h3>
              <p className="text-gray-600 font-light mb-4 leading-relaxed">
                Deep cleaning of seats, carpets, and dashboard
              </p>
              <p className="text-gray-900 font-light">
                <span className="text-sm text-gray-500">FROM</span>
                <span className="text-2xl font-normal ml-2">₹799</span>
              </p>
            </div>
          </div>

          {/* View More Button */}
          <div className="text-center">
            <Link href="/services">
              <button className="group inline-flex items-center gap-3 px-10 py-4 border-2 border-gray-900 text-gray-900 text-sm tracking-[0.2em] uppercase font-light hover:bg-gray-900 hover:text-white transition-all duration-300">
                View All Services
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Book Now Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-gray-500 mb-6 font-light">
            Easy Booking
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Book Your Service
          </h2>
          <div className="w-16 h-px bg-gray-400 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto mb-6">
            Schedule your car service appointment online in just a few clicks. Choose your preferred service, select a convenient date and time, and we'll take care of the rest.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto mb-12">
            Our online booking system makes it easy to manage your appointments, and you can reschedule or cancel anytime. Get your car the premium care it deserves with our hassle-free booking process.
          </p>
          
          {/* Book Now Button */}
          <Link href="/booking">
            <button className="group inline-flex items-center gap-4 px-12 py-5 bg-gray-900 text-white text-sm tracking-[0.2em] uppercase font-light hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105">
              Book Appointment Now
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </Link>

          {/* Quick Info */}
          <div className="grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 pt-12 border-t border-gray-200">
            <div>
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-900 font-medium">Quick Service</p>
              <p className="text-sm text-gray-600 font-light mt-1">1-2 hours</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-900 font-medium">Expert Team</p>
              <p className="text-sm text-gray-600 font-light mt-1">Certified technicians</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-900 font-medium">Best Price</p>
              <p className="text-sm text-gray-600 font-light mt-1">No hidden charges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Card */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="grid md:grid-cols-2">
              {/* Left Side - Contact Info */}
              <div className="bg-gray-900 p-12 md:p-16 text-white">
                <p className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-6 font-light">
                  Get In Touch
                </p>
                <h2 className="text-3xl md:text-4xl font-light mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                  Contact Us
                </h2>
                <div className="w-12 h-px bg-gray-600 mb-10"></div>

                <div className="space-y-8">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1 font-light">Call Us</p>
                      <a href="tel:+911234567890" className="text-lg hover:text-amber-400 transition-colors">
                        +91 12345 67890
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1 font-light">Email</p>
                      <a href="mailto:info@automotivecarcare.com" className="text-lg hover:text-amber-400 transition-colors break-all">
                        info@automotivecarcare.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1 font-light">Location</p>
                      <p className="text-lg">Guntur, Andhra Pradesh</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1 font-light">Working Hours</p>
                      <p className="text-lg">Open 24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - CTA */}
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                  Have Questions?
                </h3>
                <p className="text-gray-600 leading-relaxed font-light mb-8">
                  We're here to help! Whether you have questions about our services, need assistance with booking, or want to learn more about our premium car care solutions, our team is ready to assist you.
                </p>
                <Link href="/contact">
                  <button className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-900 text-gray-900 text-sm tracking-[0.2em] uppercase font-light hover:bg-gray-900 hover:text-white transition-all duration-300 w-full sm:w-auto justify-center">
                    Contact Us
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

