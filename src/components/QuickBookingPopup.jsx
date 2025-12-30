"use client";

import { useState } from "react";

export default function QuickBookingPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format WhatsApp message
    const message = `*New Booking Request*%0A%0AName: ${encodeURIComponent(formData.name)}%0APhone: ${encodeURIComponent(formData.number)}%0ADescription: ${encodeURIComponent(formData.description)}`;
    
    // Replace with your WhatsApp business number (with country code, no + or spaces)
    const whatsappNumber = "7995157753"; // Example: 911234567890 for India
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappURL, "_blank");
    
    // Reset form and close popup
    setFormData({ name: "", number: "", description: "" });
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Floating Button - Fixed at bottom right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group bg-amber-400 hover:bg-gray-900 text-gray-900 hover:text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
        aria-label="Quick Booking"
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Quick Booking
        </span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-white rounded-lg max-w-md w-full p-8 relative transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
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

            {/* Header */}
            <div className="mb-6">
              <h3
                className="text-3xl font-light text-gray-900 mb-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Quick Booking
              </h3>
              <div className="w-12 h-px bg-amber-400"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-900 transition-colors resize-none"
                  placeholder="Describe your service requirements"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 font-medium tracking-wide"
              >
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
