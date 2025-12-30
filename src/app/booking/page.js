"use client";

import { useState, useEffect } from "react";

export default function BookingPage() {
  const [services, setServices] = useState([]);
  const [vehicleBrands, setVehicleBrands] = useState([]);
  const [availableModels, setAvailableModels] = useState([]);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    service: "",
    vehicleBrand: "",
    vehicleModel: "",
    bookingDate: "",
    bookingTime: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Country codes
  const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "USA", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+86", country: "China", flag: "🇨🇳" },
  ];

  useEffect(() => {
    fetchData();
    
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedService = urlParams.get('service');
    if (preSelectedService) {
      setFormData(prev => ({ ...prev, service: preSelectedService }));
    }
  }, []);

  const fetchData = async () => {
    try {
      console.log("Fetching services and vehicle brands...");
      
      const [servicesRes, brandsRes] = await Promise.all([
        fetch("/api/services"),
        fetch("/api/vehicle-brands"),
      ]);

      console.log("Services response status:", servicesRes.status);
      console.log("Brands response status:", brandsRes.status);

      if (!servicesRes.ok) {
        console.error("Services API failed:", servicesRes.status);
        return;
      }
      
      if (!brandsRes.ok) {
        console.error("Vehicle brands API failed:", brandsRes.status);
        return;
      }

      const servicesData = await servicesRes.json();
      const brandsData = await brandsRes.json();

      console.log("Services loaded:", servicesData.services?.length || 0);
      console.log("Vehicle brands loaded:", brandsData.brands?.length || 0);

      setServices(servicesData.services || []);
      setVehicleBrands(brandsData.brands || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle brand change - show models for selected brand
  const handleBrandChange = (e) => {
    const selectedBrandSlug = e.target.value;
    setFormData({ 
      ...formData, 
      vehicleBrand: selectedBrandSlug,
      vehicleModel: "" // Reset model when brand changes
    });
    
    // Find selected brand and get its models
    const selectedBrand = vehicleBrands.find(b => b.slug === selectedBrandSlug);
    if (selectedBrand) {
      console.log("Selected brand models:", selectedBrand.models);
      setAvailableModels(selectedBrand.models || []);
    } else {
      setAvailableModels([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "");
    const limitedValue = numericValue.slice(0, 10);
    
    setFormData({ ...formData, phone: limitedValue });
    
    if (limitedValue.length > 0 && limitedValue.length < 10) {
      setPhoneError("Phone number must be 10 digits");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const selectedService = services.find(s => s.slug === formData.service);
      const selectedBrand = vehicleBrands.find(b => b.slug === formData.vehicleBrand);
      
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`,
        service: formData.service,
        serviceName: selectedService?.name || formData.service,
        servicePrice: selectedService?.price || "N/A",
        vehicleBrand: selectedBrand?.name || formData.vehicleBrand,
        vehicleModel: formData.vehicleModel,
        bookingDate: formData.bookingDate,
        bookingTime: formData.bookingTime,
        notes: formData.notes,
      };

      console.log("Submitting booking:", bookingData);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Expected JSON but got:", text.substring(0, 200));
        setMessage("Server error: API route not found or returned invalid response.");
        return;
      }

      const data = await response.json();
      console.log("Booking response data:", data);

      if (response.ok && data.success) {
        setMessage(data.message || "Booking submitted successfully! Check your email for confirmation.");
        setFormData({
          name: "",
          email: "",
          countryCode: "+91",
          phone: "",
          service: "",
          vehicleBrand: "",
          vehicleModel: "",
          bookingDate: "",
          bookingTime: "",
          notes: "",
        });
        setPhoneError("");
        setAvailableModels([]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setMessage(data.error || "Failed to submit booking. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.3),transparent_50%)] animate-pulse"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-6 font-light">
            Reserve Your Spot
          </p>
          <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Book Your <em className="text-amber-400">Service</em>
          </h1>
          <div className="w-20 h-px bg-gray-600 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
            Schedule your appointment in just a few clicks
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Success/Error Message */}
          {message && (
            <div className={`mb-12 p-8 border-l-4 shadow-lg animate-fade-in-up ${
              message.includes("success") || message.includes("email")
                ? "bg-green-50 border-green-500"
                : "bg-red-50 border-red-500"
            }`}>
              <div className="flex items-start">
                <div className={`flex-shrink-0 ${
                  message.includes("success") ? "text-green-600" : "text-red-600"
                }`}>
                  {message.includes("success") ? (
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <p className={`text-lg font-light leading-relaxed ${
                    message.includes("success") ? "text-green-800" : "text-red-800"
                  }`}>
                    {message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Booking Form Card */}
          <div className="bg-gray-900 p-10 md:p-14 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Information */}
              <div>
                <h3 className="text-2xl font-light text-white mb-8 pb-4 border-b border-gray-200" style={{ fontFamily: 'Georgia, serif' }}>
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-light text-white mb-3 tracking-wide uppercase">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border-2 border-gray-300 focus:border-gray-900 bg-white text-xl text-gray-900 transition-all duration-300 font-light focus:outline-none"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-white mb-3 tracking-wide uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border-2 border-gray-300 focus:border-gray-900 bg-white text-xl text-gray-900 transition-all duration-300 font-light focus:outline-none"
                      placeholder="yourmail@gmail.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-light text-white mb-3 tracking-wide uppercase">
                      Phone Number *
                    </label>
                    <div className="flex gap-3">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="w-36 px-4 py-4 border-2 border-gray-300 focus:border-gray-900 bg-white text-xl text-gray-900 transition-all duration-300 font-light focus:outline-none appearance-none cursor-pointer"
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                      <div className="flex-1">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          required
                          maxLength="10"
                          pattern="\d{10}"
                          className={`w-full px-5 py-4 border-2 bg-white text-xl text-gray-900 transition-all duration-300 font-light focus:outline-none ${
                            phoneError
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-gray-900"
                          }`}
                          placeholder="1234567890"
                        />
                        {phoneError && (
                          <p className="text-red-600 text-sm mt-2 flex items-center font-light">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {phoneError}
                          </p>
                        )}
                        {formData.phone && !phoneError && formData.phone.length === 10 && (
                          <p className="text-green-600 text-sm mt-2 flex items-center font-light">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Valid phone number
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 font-light">
                      Enter 10-digit mobile number (numbers only)
                    </p>
                  </div>
                </div>
              </div>

              {/* Service & Vehicle Details */}
              <div>
                <h3 className="text-2xl font-light text-white mb-8 pb-4 border-b border-gray-200" style={{ fontFamily: 'Georgia, serif' }}>
                  Service & Vehicle Details
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Service Selection */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-light text-white mb-3 tracking-wide uppercase">
                      Select Service *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border-2 border-gray-300 focus:border-gray-900 bg-white text-xl text-gray-900 transition-all duration-300 font-light focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Choose a service</option>
                      {services.map((service) => (
                        <option key={service._id} value={service.slug}>
                          {service.name} - ₹{service.price}
                        </option>
                      ))}
                    </select>
                    {services.length === 0 && (
                      <p className="text-sm text-red-400 mt-2 flex items-center font-light">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        ⚠️ No services available. Admin must add services first.
                      </p>
                    )}
                  </div>

                  {/* Vehicle Brand Selection */}
                  <div>
                    <label className="block text-sm font-light text-white mb-3 tracking-wide uppercase">
                      Vehicle Brand *
                    </label>
                    <select
                      name="vehicleBrand"
                      value={formData.vehicleBrand}
                      onChange={handleBrandChange}
                      required
                      className="w-full px-5 py-4 border-2 border-gray-300 focus:border-gray-900 bg-white text-xl text-gray-900 transition-all duration-300 font-light focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Select brand</option>
                      {vehicleBrands.map((brand) => (
                        <option key={brand._id} value={brand.slug}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    {vehicleBrands.length === 0 && (
                      <p className="text-sm text-red-400 mt-2 flex items-center font-light">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        ⚠️ No brands available. Admin must add brands first.
                      </p>
                    )}
                  </div>

                  {/* Vehicle Model Selection */}
                  <div>
                    <label className="block text-sm font-light text-white mb-3 tracking-wide uppercase">
                      Vehicle Model *
                    </label>
                    <select
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      required
                      disabled={!formData.vehicleBrand || availableModels.length === 0}
                      className="w-full px-5 py-4 border-2 border-gray-300 focus:border-gray-900 bg-white text-xl text-gray-900 transition-all duration-300 font-light focus:outline-none appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {!formData.vehicleBrand ? "Select brand first" : "Select model"}
                      </option>
                      {availableModels.map((model, index) => (
                        <option key={index} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                    {formData.vehicleBrand && availableModels.length === 0 && (
                      <p className="text-sm text-amber-400 mt-2 flex items-center font-light">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        ℹ️ No models available for this brand.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Appointment Schedule */}
              <div>
                <h3 className="text-2xl font-light text-white mb-8 pb-4 border-b border-gray-200" style={{ fontFamily: 'Georgia, serif' }}>
                  Appointment Schedule
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-light text-white mb-3 tracking-wide uppercase">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="bookingDate"
                      value={formData.bookingDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-5 py-4 border-2 border-gray-300 focus:border-gray-900 bg-white text-xl text-gray-900 transition-all duration-300 font-light focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-white mb-3 tracking-wide uppercase">
                      Preferred Time *
                    </label>
                    <select
                      name="bookingTime"
                      value={formData.bookingTime}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border-2 border-gray-300 focus:border-gray-900 bg-white text-xl text-gray-900 transition-all duration-300 font-light focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Select time slot</option>
                      <option value="07:00 AM">07:00 AM</option>
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-light text-white mb-3 tracking-wide uppercase">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-5 py-4 border-2 border-gray-300 focus:border-gray-900 bg-white text-xl text-gray-900 transition-all duration-300 resize-none font-light focus:outline-none"
                  placeholder="Any specific requirements or concerns..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading || phoneError || formData.phone.length !== 10 || services.length === 0 || vehicleBrands.length === 0}
                  className="group relative w-full py-6 border-4 border-green-900 text-white text-center text-md tracking-[0.2em] uppercase font-light overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500"
                >
                  <span className="absolute inset-0 bg-gray-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                  <span className="relative group-hover:text-white transition-colors duration-500 flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Your Booking...
                      </>
                    ) : (
                      <>
                        📅 Book Appointment Now
                        <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Info Cards */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 text-center group hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">⏰</div>
              <div className="text-4xl font-light text-amber-400 mb-2" style={{ fontFamily: 'Georgia, serif' }}>24/7</div>
              <div className="text-sm text-gray-300 font-light tracking-wide uppercase">Service Available</div>
            </div>
            
            <div className="bg-gray-900 p-8 text-center group hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">⚡</div>
              <div className="text-4xl font-light text-amber-400 mb-2" style={{ fontFamily: 'Georgia, serif' }}>30 Min</div>
              <div className="text-sm text-gray-300 font-light tracking-wide uppercase">Quick Service</div>
            </div>
            
            <div className="bg-gray-900 p-8 text-center group hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">✅</div>
              <div className="text-4xl font-light text-amber-400 mb-2" style={{ fontFamily: 'Georgia, serif' }}>100%</div>
              <div className="text-sm text-gray-300 font-light tracking-wide uppercase">Satisfaction Guaranteed</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
