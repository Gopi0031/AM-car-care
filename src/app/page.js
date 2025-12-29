import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section with Image Slider */}
      <HeroSlider />

      {/* Services Section */}
      <section className="py-16 bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary-700/10 text-primary-700 rounded-full text-sm font-semibold mb-4">
              Our Services
            </span>
            <h2 className="text-4xl font-bold text-primary-700 mb-4">
              Premium Car Care Solutions
            </h2>
            <p className="text-xl text-primary-700/80 max-w-3xl mx-auto">
              From basic wash to complete detailing, we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Car Wash Card */}
            <div className="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition border border-primary-700/20 hover:border-accent-500">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-700 to-primary-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary-700">Car Wash</h3>
              <p className="text-primary-700/80 mb-4">
                Complete exterior and interior washing with premium products
              </p>
              <p className="text-accent-600 font-bold text-xl mb-4">Starting at ₹499</p>
              <Link href="/services">
                <button className="w-full bg-primary-700 text-background py-2 rounded-lg hover:bg-primary-800 transition font-semibold">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Detailing Card */}
            <div className="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition border-2 border-accent-500 transform scale-105">
              <div className="absolute top-0 right-0 bg-accent-500 text-primary-900 px-3 py-1 rounded-bl-lg text-xs font-bold">
                POPULAR
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary-700">Detailing</h3>
              <p className="text-primary-700/80 mb-4">
                Professional detailing to restore your car's showroom shine
              </p>
              <p className="text-accent-600 font-bold text-xl mb-4">Starting at ₹2,999</p>
              <Link href="/services">
                <button className="w-full bg-accent-500 text-primary-900 py-2 rounded-lg hover:bg-accent-600 transition font-semibold">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Maintenance Card */}
            <div className="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition border border-primary-700/20 hover:border-accent-500">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-700 to-primary-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary-700">Maintenance</h3>
              <p className="text-primary-700/80 mb-4">
                Regular maintenance and inspection to keep your car running smoothly
              </p>
              <p className="text-accent-600 font-bold text-xl mb-4">Starting at ₹1,499</p>
              <Link href="/services">
                <button className="w-full bg-primary-700 text-background py-2 rounded-lg hover:bg-primary-800 transition font-semibold">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Book Your Service CTA */}
      <section className="py-16 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-background mb-4">
            Book Your Service Now
          </h2>
          <p className="text-xl text-background-light mb-8">
            Schedule your appointment and get your car looking brand new
          </p>
          <Link href="/booking">
            <button className="bg-background text-primary-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-background-light transition shadow-2xl transform hover:scale-105">
              Book Service
            </button>
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-primary-700 mb-4">
            Have Questions?
          </h2>
          <p className="text-xl text-primary-700/80 mb-8">
            Get in touch with us for any inquiries
          </p>
          <Link href="/contact">
            <button className="bg-primary-700 text-background px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary-800 transition shadow-lg transform hover:scale-105">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
