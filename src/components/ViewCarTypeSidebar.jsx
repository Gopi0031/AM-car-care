"use client";

import { useState } from "react";
import Image from "next/image";

// Car brands data with models and services
const carBrandsData = [
  {
    id: 1,
    name: "Toyota",
    logo: "/logos/toyota.png", // Add your logo images to public/logos/
    models: [
      {
        name: "Camry",
        image: "/cars/toyota-camry.jpg",
        services: ["Car Wash", "Detailing", "Maintenance", "Interior Cleaning"],
      },
      {
        name: "Fortuner",
        image: "/cars/toyota-fortuner.jpg",
        services: ["Car Wash", "Detailing", "Maintenance"],
      },
      {
        name: "Innova",
        image: "/cars/toyota-innova.jpg",
        services: ["Car Wash", "Interior Cleaning", "Maintenance"],
      },
    ],
  },
  {
    id: 2,
    name: "Honda",
    logo: "/logos/honda.png",
    models: [
      {
        name: "City",
        image: "/cars/honda-city.jpg",
        services: ["Car Wash", "Detailing", "Interior Cleaning"],
      },
      {
        name: "Civic",
        image: "/cars/honda-civic.jpg",
        services: ["Car Wash", "Detailing", "Maintenance"],
      },
    ],
  },
  {
    id: 3,
    name: "Hyundai",
    logo: "/logos/hyundai.png",
    models: [
      {
        name: "Creta",
        image: "/cars/hyundai-creta.jpg",
        services: ["Car Wash", "Detailing", "Maintenance", "Interior Cleaning"],
      },
      {
        name: "Verna",
        image: "/cars/hyundai-verna.jpg",
        services: ["Car Wash", "Interior Cleaning"],
      },
    ],
  },
  {
    id: 4,
    name: "Maruti Suzuki",
    logo: "/logos/maruti.png",
    models: [
      {
        name: "Swift",
        image: "/cars/maruti-swift.jpg",
        services: ["Car Wash", "Detailing", "Interior Cleaning"],
      },
      {
        name: "Brezza",
        image: "/cars/maruti-brezza.jpg",
        services: ["Car Wash", "Maintenance"],
      },
    ],
  },
  {
    id: 5,
    name: "Tata",
    logo: "/logos/tata.png",
    models: [
      {
        name: "Nexon",
        image: "/cars/tata-nexon.jpg",
        services: ["Car Wash", "Detailing", "Maintenance"],
      },
      {
        name: "Harrier",
        image: "/cars/tata-harrier.jpg",
        services: ["Car Wash", "Detailing", "Interior Cleaning"],
      },
    ],
  },
];

export default function ViewCarTypeSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  const handleBack = () => {
    setSelectedBrand(null);
  };

  return (
    <>
      {/* Floating Button - Fixed at bottom left */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 group bg-gray-900 hover:bg-amber-400 text-white hover:text-gray-900 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
        aria-label="View Car Types"
      >
        <svg
          className="w-15 h-15"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          View Car Types
        </span>
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => {
              setIsOpen(false);
              setSelectedBrand(null);
            }}
          />

          {/* Sidebar */}
          <div className="fixed left-0 top-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gray-900 text-white p-6 flex items-center justify-between">
              {selectedBrand && (
                <button
                  onClick={handleBack}
                  className="mr-3 hover:text-amber-400 transition-colors"
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}
              <h2 className="text-2xl font-light flex-1">
                {selectedBrand ? selectedBrand.name : "Select Your Car Brand"}
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSelectedBrand(null);
                }}
                className="text-white hover:text-amber-400 transition-colors"
              >
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
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {!selectedBrand ? (
                /* Brand List */
                <div className="space-y-3">
                  {carBrandsData.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => handleBrandClick(brand)}
                      className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400 transition-colors">
                        {/* Replace with actual logo */}
                        <svg
                          className="w-8 h-8 text-gray-600 group-hover:text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-amber-400 transition-colors">
                          {brand.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {brand.models.length} models available
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              ) : (
                /* Models List */
                <div className="space-y-6">
                  {selectedBrand.models.map((model, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      {/* Model Image */}
                      <div className="relative h-48 bg-gray-200">
                        {/* Replace with actual car images */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-24 h-24 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                          </svg>
                        </div>
                      </div>

                      {/* Model Details */}
                      <div className="p-4">
                        <h4 className="text-xl font-medium text-gray-900 mb-3">
                          {model.name}
                        </h4>

                        <p className="text-sm text-gray-600 mb-3 font-medium">
                          Available Services:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {model.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
  