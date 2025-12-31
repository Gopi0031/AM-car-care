"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

const carBrandsData = [
  { 
    id: 1, 
    name: "Toyota", 
    logo: "/logos/old-car.jpg", // Add your logo images to public/logos/
    modelCount: 3,
    models: ["Camry", "Fortuner", "Innova"],
    color: "from-red-50 to-red-100"
  },
  { 
    id: 2, 
    name: "Honda", 
    logo: "/logos/honda.png",
    modelCount: 2,
    models: ["City", "Civic"],
    color: "from-blue-50 to-blue-100"
  },
  { 
    id: 3, 
    name: "Hyundai", 
    logo: "/logos/hyundai.png",
    modelCount: 2,
    models: ["Creta", "Verna"],
    color: "from-indigo-50 to-indigo-100"
  },
  { 
    id: 4, 
    name: "Maruti Suzuki", 
    logo: "/logos/maruti.png",
    modelCount: 2,
    models: ["Swift", "Brezza"],
    color: "from-orange-50 to-orange-100"
  },
  { 
    id: 5, 
    name: "Tata", 
    logo: "/logos/tata.png",
    modelCount: 2,
    models: ["Nexon", "Harrier"],
    color: "from-purple-50 to-purple-100"
  },
  { 
    id: 6, 
    name: "Mahindra", 
    logo: "/logos/mahindra.png",
    modelCount: 2,
    models: ["Thar", "Scorpio"],
    color: "from-green-50 to-green-100"
  },
  { 
    id: 7, 
    name: "Kia", 
    logo: "/logos/kia.png",
    modelCount: 2,
    models: ["Seltos", "Sonet"],
    color: "from-pink-50 to-pink-100"
  },
  { 
    id: 8, 
    name: "Volkswagen", 
    logo: "/logos/volkswagen.png",
    modelCount: 2,
    models: ["Polo", "Taigun"],
    color: "from-cyan-50 to-cyan-100"
  },
];

export default function CarBrandsPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleBrandClick = (brand) => {
    router.push(`/car-brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const filteredBrands = carBrandsData.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white shadow-2xl z-20 border-b-4 border-amber-400">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={() => router.back()} 
                className="bg-amber-500 hover:bg-amber-600 p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg touch-manipulation flex-shrink-0"
                aria-label="Back"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">
                  All Car Brands
                </h1>
                <p className="text-xs sm:text-sm text-gray-300 mt-0.5 sm:mt-1 truncate">
                  {carBrandsData.length} premium brands available
                </p>
              </div>
              
              <button 
                onClick={() => router.push('/')} 
                className="bg-red-500 hover:bg-red-600 p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg touch-manipulation flex-shrink-0"
                aria-label="Home"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative py-8 sm:py-10 md:py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.3),transparent_70%)]"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
              <p className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gray-500 mb-2 sm:mb-3 font-light">
                PREMIUM SELECTION
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-3 sm:mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Choose Your <em className="text-amber-600">Car Brand</em>
              </h2>
              <div className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-3 sm:mb-4"></div>
              <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed px-4">
                Select your vehicle brand to explore available models and services
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search car brands..."
                  className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all text-sm sm:text-base shadow-lg bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-manipulation"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Brands Grid with Logo + Models */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16">
          {filteredBrands.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {filteredBrands.map((brand, index) => (
                <button
                  key={brand.id}
                  onClick={() => handleBrandClick(brand)}
                  className={`group bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:border-amber-400 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 active:scale-95 touch-manipulation text-left ${
                    isVisible ? 'animate-slideUp' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Logo Container */}
                  <div className={`relative w-full aspect-video bg-gradient-to-br ${brand.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 overflow-hidden group-hover:from-amber-50 group-hover:to-amber-100 transition-all duration-500`}>
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          // Fallback to SVG icon if image fails to load
                          e.target.style.display = 'none';
                        }}
                      />
                      {/* Fallback SVG Icon */}
                      <svg className="w-full h-full text-gray-400 p-4 group-hover:text-gray-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                      </svg>
                    </div>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                  
                  {/* Brand Info */}
                  <div className="space-y-3">
                    {/* Brand Name */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 mb-1">
                        {brand.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {brand.modelCount} model{brand.modelCount !== 1 ? 's' : ''} available
                      </p>
                    </div>
                    
                    {/* Models List */}
                    <div className="flex flex-wrap gap-2">
                      {brand.models.map((model, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 group-hover:bg-amber-100 text-xs font-medium text-gray-700 group-hover:text-amber-800 transition-colors duration-300"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="mt-4 pt-4 border-t border-gray-100 group-hover:border-amber-200 transition-colors">
                    <div className="flex items-center justify-between text-gray-500 group-hover:text-amber-600 transition-colors">
                      <span className="text-xs font-medium">View Models</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 md:py-20">
              <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 opacity-50">🔍</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-900 mb-3 sm:mb-4">No brands found</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Try searching for a different brand name</p>
              <button
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-amber-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 font-medium text-sm sm:text-base touch-manipulation"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
          opacity: 0;
        }
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </>
  );
}
