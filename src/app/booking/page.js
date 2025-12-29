"use client";

import { useState, useEffect } from "react";

export default function BookingPage() {
  const [services, setServices] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    service: "",
    vehicleType: "",
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
    
    // Check if service is pre-selected from URL
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedService = urlParams.get('service');
    if (preSelectedService) {
      setFormData(prev => ({ ...prev, service: preSelectedService }));
    }
  }, []);

  const fetchData = async () => {
    try {
      console.log("Fetching services and vehicle types...");
      
      const [servicesRes, vehiclesRes] = await Promise.all([
        fetch("/api/services"),
        fetch("/api/vehicle-types"),
      ]);

      console.log("Services response status:", servicesRes.status);
      console.log("Vehicles response status:", vehiclesRes.status);

      // Check if responses are OK
      if (!servicesRes.ok) {
        console.error("Services API failed:", servicesRes.status);
        const text = await servicesRes.text();
        console.error("Services response:", text.substring(0, 200));
        return;
      }
      
      if (!vehiclesRes.ok) {
        console.error("Vehicle types API failed:", vehiclesRes.status);
        const text = await vehiclesRes.text();
        console.error("Vehicles response:", text.substring(0, 200));
        return;
      }

      const servicesData = await servicesRes.json();
      const vehiclesData = await vehiclesRes.json();

      console.log("Services loaded:", servicesData.services?.length || 0);
      console.log("Vehicle types loaded:", vehiclesData.vehicleTypes?.length || 0);

      setServices(servicesData.services || []);
      setVehicleTypes(vehiclesData.vehicleTypes || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, "");
    
    // Limit to 10 digits
    const limitedValue = numericValue.slice(0, 10);
    
    setFormData({ ...formData, phone: limitedValue });
    
    // Validate phone number
    if (limitedValue.length > 0 && limitedValue.length < 10) {
      setPhoneError("Phone number must be 10 digits");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final phone validation
    if (formData.phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Get selected service name and price for email
      const selectedService = services.find(s => s.slug === formData.service);
      
      // Combine country code with phone number
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`,
        service: formData.service,
        serviceName: selectedService?.name || formData.service,
        servicePrice: selectedService?.price || "N/A",
        vehicleType: formData.vehicleType,
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

      console.log("Booking response status:", response.status);
      console.log("Response content-type:", response.headers.get("content-type"));

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Expected JSON but got:", text.substring(0, 200));
        setMessage("Server error: API route not found or returned invalid response. Please check console.");
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
          vehicleType: "",
          bookingDate: "",
          bookingTime: "",
          notes: "",
        });
        setPhoneError("");
        
        // Scroll to message
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
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success/Error Message */}
        {message && (
          <div className={`mb-8 p-6 rounded-lg border-2 ${
            message.includes("success") || message.includes("email")
              ? "bg-green-500/20 text-green-800 border-green-500"
              : "bg-red-500/20 text-red-800 border-red-500"
          }`}>
            <div className="flex items-start">
              <svg className={`w-6 h-6 mr-3 flex-shrink-0 ${
                message.includes("success") ? "text-green-600" : "text-red-600"
              }`} fill="currentColor" viewBox="0 0 20 20">
                {message.includes("success") ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                )}
              </svg>
              <div>
                <p className="font-semibold">{message}</p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary-700/10 text-primary-700 rounded-full text-sm font-semibold mb-4">
            Reserve Your Spot
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-4">
            Book Your Service
          </h1>
          <p className="text-xl text-primary-700/80 max-w-2xl mx-auto">
            Schedule your appointment in just a few clicks
          </p>
        </div>

        <div className="bg-background-light rounded-lg shadow-xl p-8 border border-primary-700/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-primary-700/20 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-background text-primary-700 transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-primary-700/20 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-background text-primary-700 transition"
                  placeholder="john@example.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Phone Number *
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-32 px-3 py-3 border-2 border-primary-700/20 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-background text-primary-700 transition"
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
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-accent-500 bg-background text-primary-700 transition ${
                        phoneError
                          ? "border-red-500 focus:border-red-500"
                          : "border-primary-700/20 focus:border-accent-500"
                      }`}
                      placeholder="9876543210"
                    />
                    {phoneError && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {phoneError}
                      </p>
                    )}
                    {formData.phone && !phoneError && formData.phone.length === 10 && (
                      <p className="text-green-600 text-sm mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Valid phone number
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-xs text-primary-700/60 mt-1">
                  Enter 10-digit mobile number (numbers only)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Service *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-primary-700/20 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-background text-primary-700 transition"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service._id} value={service.slug}>
                      {service.name} - ₹{service.price}
                    </option>
                  ))}
                </select>
                {services.length === 0 && (
                  <p className="text-sm text-red-600 mt-1 font-medium">
                    ⚠️ No services available. Admin must add services first.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Vehicle Type *
                </label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-primary-700/20 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-background text-primary-700 transition"
                >
                  <option value="">Select vehicle type</option>
                  {vehicleTypes.map((vehicle) => (
                    <option key={vehicle._id} value={vehicle.slug}>
                      {vehicle.name}
                    </option>
                  ))}
                </select>
                {vehicleTypes.length === 0 && (
                  <p className="text-sm text-red-600 mt-1 font-medium">
                    ⚠️ No vehicle types available. Admin must add vehicle types first.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border-2 border-primary-700/20 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-background text-primary-700 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  name="bookingTime"
                  value={formData.bookingTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-primary-700/20 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-background text-primary-700 transition"
                >
                  <option value="">Select time</option>
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

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-primary-700/20 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-background text-primary-700 transition resize-none"
                placeholder="Any specific requirements or concerns..."
              />
            </div>

            <button
              type="submit"
              disabled={loading || phoneError || formData.phone.length !== 10 || services.length === 0 || vehicleTypes.length === 0}
              className="w-full bg-primary-700 text-background py-4 rounded-lg font-semibold hover:bg-primary-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105 duration-300 text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-background" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Book Now"
              )}
            </button>
          </form>
        </div>

        {/* Quick Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-background-light p-4 rounded-lg border border-primary-700/20 text-center">
            <div className="text-2xl font-bold text-accent-500 mb-1">24/7</div>
            <div className="text-sm text-primary-700/80">Available</div>
          </div>
          <div className="bg-background-light p-4 rounded-lg border border-primary-700/20 text-center">
            <div className="text-2xl font-bold text-accent-500 mb-1">30 Min</div>
            <div className="text-sm text-primary-700/80">Quick Service</div>
          </div>
          <div className="bg-background-light p-4 rounded-lg border border-primary-700/20 text-center">
            <div className="text-2xl font-bold text-accent-500 mb-1">100%</div>
            <div className="text-sm text-primary-700/80">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}
