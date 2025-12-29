"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const router = useRouter();

  const [serviceForm, setServiceForm] = useState({
    name: "",
    price: "",
    description: "",
    features: "",
    order: 0,
  });

  const [vehicleForm, setVehicleForm] = useState({
    name: "",
    order: 0,
  });

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin-login");
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    
    try {
      // Fetch bookings
      let bookingsData = { bookings: [] };
      try {
        const bookingsRes = await fetch("/api/bookings");
        if (bookingsRes.ok) {
          bookingsData = await bookingsRes.json();
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }

      // Fetch images
      let imagesData = { images: [] };
      try {
        const imagesRes = await fetch("/api/cloudinary-images");
        if (imagesRes.ok) {
          imagesData = await imagesRes.json();
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }

      // Fetch services
      let servicesData = { services: [] };
      try {
        const servicesRes = await fetch("/api/services");
        if (servicesRes.ok) {
          servicesData = await servicesRes.json();
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }

      // Fetch vehicle types
      let vehiclesData = { vehicleTypes: [] };
      try {
        const vehiclesRes = await fetch("/api/vehicle-types");
        if (vehiclesRes.ok) {
          vehiclesData = await vehiclesRes.json();
        }
      } catch (error) {
        console.error("Error fetching vehicle types:", error);
      }

      setBookings(bookingsData.bookings || []);
      setHeroImages(imagesData.images || []);
      setServices(servicesData.services || []);
      setVehicleTypes(vehiclesData.vehicleTypes || []);
      
    } catch (error) {
      console.error("Error in fetchData:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin-login");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.file.files[0];
    
    if (!file) {
      setUploadMessage("Please select a file");
      return;
    }

    setUploading(true);
    setUploadMessage("");

    try {
      const signatureRes = await fetch(
        `/api/upload-signature?folder=automotive-carcare/hero-images`
      );
      const signatureData = await signatureRes.json();

      if (signatureData.error) {
        throw new Error(signatureData.error);
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("timestamp", signatureData.timestamp);
      formData.append("signature", signatureData.signature);
      formData.append("api_key", signatureData.apiKey);
      formData.append("folder", signatureData.folder);

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await cloudinaryRes.json();

      if (result.error) {
        throw new Error(result.error.message);
      }

      setUploadMessage("Image uploaded successfully!");
      setPreview(null);
      e.target.reset();
      fetchData();
      setTimeout(() => setUploadMessage(""), 3000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadMessage("Failed to upload image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (publicId) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await fetch("/api/cloudinary-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      const data = await response.json();

      if (data.success) {
        setUploadMessage("Image deleted successfully!");
        fetchData();
        setTimeout(() => setUploadMessage(""), 3000);
      } else {
        throw new Error(data.error || "Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      setUploadMessage("Failed to delete image: " + error.message);
    }
  };

  const handleServiceFormChange = (e) => {
    const { name, value } = e.target;
    setServiceForm({ ...serviceForm, [name]: value });
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setUploadMessage("");
    setLoading(true);

    try {
      const slug = serviceForm.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const url = "/api/services";
      const method = editingService ? "PUT" : "POST";
      const body = editingService 
        ? { ...serviceForm, slug, _id: editingService._id }
        : { ...serviceForm, slug };

      console.log("Submitting service:", body);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data.success) {
        setUploadMessage(
          editingService 
            ? "Service updated successfully!" 
            : "Service added successfully!"
        );
        setShowServiceForm(false);
        setEditingService(null);
        setServiceForm({
          name: "",
          price: "",
          description: "",
          features: "",
          order: 0,
        });
        await fetchData();
        setTimeout(() => setUploadMessage(""), 3000);
      } else {
        throw new Error(data.error || "Failed to save service");
      }
    } catch (error) {
      console.error("Service error:", error);
      setUploadMessage("Failed to save service: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      price: service.price,
      description: service.description,
      features: service.features || "",
      order: service.order || 0,
    });
    setShowServiceForm(true);
  };

  const handleDeleteService = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`/api/services?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setUploadMessage("Service deleted successfully!");
        await fetchData();
        setTimeout(() => setUploadMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      setUploadMessage("Failed to delete service: " + error.message);
    }
  };

  const handleVehicleFormChange = (e) => {
    const { name, value } = e.target;
    setVehicleForm({ ...vehicleForm, [name]: value });
  };

  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    setUploadMessage("");
    setLoading(true);

    try {
      const slug = vehicleForm.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const body = { ...vehicleForm, slug };
      console.log("Submitting vehicle type:", body);

      const response = await fetch("/api/vehicle-types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data.success) {
        setUploadMessage("Vehicle type added successfully!");
        setShowVehicleForm(false);
        setVehicleForm({ name: "", order: 0 });
        await fetchData();
        setTimeout(() => setUploadMessage(""), 3000);
      } else {
        throw new Error(data.error || "Failed to save vehicle type");
      }
    } catch (error) {
      console.error("Vehicle type error:", error);
      setUploadMessage("Failed to save vehicle type: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVehicle = async (id) => {
    if (!confirm("Are you sure you want to delete this vehicle type?")) return;

    try {
      const response = await fetch(`/api/vehicle-types?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setUploadMessage("Vehicle type deleted successfully!");
        await fetchData();
        setTimeout(() => setUploadMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting vehicle type:", error);
      setUploadMessage("Failed to delete vehicle type: " + error.message);
    }
  };

  // NEW: Accept booking function
 const handleAcceptBooking = async (booking) => {
  if (!confirm(`Accept booking from ${booking.name} and send confirmation email?`)) return;

  try {
    setUploadMessage("");
    
    console.log("=== ACCEPT BOOKING DEBUG ===");
    console.log("Full booking object:", booking);
    console.log("booking._id:", booking._id);
    console.log("booking._id type:", typeof booking._id);
    
    // Handle different ObjectId formats
    let bookingId;
    
    if (typeof booking._id === 'object') {
      // If it's an ObjectId object with $oid property
      if (booking._id.$oid) {
        bookingId = booking._id.$oid;
      } else if (booking._id.toString) {
        bookingId = booking._id.toString();
      } else {
        bookingId = String(booking._id);
      }
    } else {
      // If it's already a string
      bookingId = booking._id;
    }
    
    console.log("Converted bookingId:", bookingId);
    console.log("bookingId type:", typeof bookingId);
    console.log("bookingId length:", bookingId.length);

    const requestBody = { 
      _id: bookingId, 
      status: "confirmed" 
    };
    
    console.log("Request body:", JSON.stringify(requestBody));

    const response = await fetch("/api/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    const data = await response.json();
    console.log("Response data:", data);

    if (data.success) {
      setUploadMessage("✅ Booking accepted! Confirmation email sent to customer.");
      await fetchData();
      setTimeout(() => setUploadMessage(""), 5000);
    } else {
      throw new Error(data.error || "Failed to accept booking");
    }
  } catch (error) {
    console.error("Error accepting booking:", error);
    setUploadMessage("❌ Failed to accept booking: " + error.message);
  }
};

// Add this function after handleAcceptBooking
const handleDeleteBooking = async (booking) => {
  if (!confirm(`Are you sure you want to delete booking from ${booking.name}? This action cannot be undone.`)) return;

  try {
    setUploadMessage("");
    
    console.log("Deleting booking:", booking);
    
    // Convert ObjectId to string
    const bookingId = typeof booking._id === 'object' 
      ? booking._id.toString() 
      : booking._id;
    
    console.log("Booking ID to delete:", bookingId);

    const response = await fetch(`/api/bookings?id=${bookingId}`, {
      method: "DELETE",
    });

    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Response data:", data);

    if (data.success) {
      setUploadMessage("✅ Booking deleted successfully!");
      await fetchData();
      setTimeout(() => setUploadMessage(""), 3000);
    } else {
      throw new Error(data.error || "Failed to delete booking");
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    setUploadMessage("❌ Failed to delete booking: " + error.message);
  }
};

  const groupBookingsByDate = () => {
    const grouped = {};
    bookings.forEach((booking) => {
      const date = booking.bookingDate;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(booking);
    });
    return grouped;
  };

  if (loading && activeTab !== "services" && activeTab !== "vehicle-types") {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Header */}
      <header className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`py-4 px-1 border-b-2 font-medium transition ${
                activeTab === "bookings"
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`py-4 px-1 border-b-2 font-medium transition ${
                activeTab === "services"
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Services ({services.length})
            </button>
            <button
              onClick={() => setActiveTab("vehicle-types")}
              className={`py-4 px-1 border-b-2 font-medium transition ${
                activeTab === "vehicle-types"
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Vehicle Types ({vehicleTypes.length})
            </button>
            <button
              onClick={() => setActiveTab("hero-images")}
              className={`py-4 px-1 border-b-2 font-medium transition ${
                activeTab === "hero-images"
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Hero Images ({heroImages.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {uploadMessage && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center ${
              uploadMessage.includes("success") || uploadMessage.includes("✅")
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {uploadMessage.includes("success") || uploadMessage.includes("✅") ? (
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            {uploadMessage}
          </div>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === "bookings" && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Bookings</h2>
              <p className="text-gray-400">Manage customer bookings by date</p>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-zinc-800 rounded-lg p-8 text-center">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400 text-lg">No bookings yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupBookingsByDate())
                  .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
                  .map(([date, dateBookings]) => (
                    <div key={date} className="bg-zinc-800 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        <span className="ml-3 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                          {dateBookings.length} booking{dateBookings.length > 1 ? "s" : ""}
                        </span>
                      </h3>
                      <div className="space-y-4">
                        {dateBookings.map((booking) => (
                          <div
                            key={booking._id}
                            className="bg-zinc-900 rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition"
                          >
                            <div className="grid md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-gray-400 mb-1">Customer</p>
                                <p className="text-white font-semibold">{booking.name}</p>
                                <p className="text-gray-300 text-sm flex items-center mt-1">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  {booking.email}
                                </p>
                                <p className="text-gray-300 text-sm flex items-center mt-1">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  {booking.phone}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400 mb-1">Service Details</p>
                                <p className="text-white font-semibold capitalize">
                                  {booking.serviceName || booking.service.replace("-", " ")}
                                </p>
                                {booking.servicePrice && (
                                  <p className="text-blue-400 font-bold text-sm mt-1">
                                    ₹{booking.servicePrice}
                                  </p>
                                )}
                                <p className="text-gray-300 text-sm mt-1">
                                  Vehicle: <span className="font-medium capitalize">{booking.vehicleType}</span>
                                </p>
                                <p className="text-gray-300 text-sm flex items-center mt-1">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {booking.bookingTime}
                                </p>
                              </div>
                              <div>
  <p className="text-sm text-gray-400 mb-1">Status</p>
  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${
    booking.status === 'confirmed' 
      ? 'bg-green-600 text-white' 
      : 'bg-yellow-600 text-white'
  }`}>
    {booking.status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending'}
  </span>
  
  {/* Action Buttons */}
  <div className="mt-3 space-y-2">
    {/* Accept Button - Only show for pending bookings */}
    {booking.status === 'pending' && (
      <button
        onClick={() => handleAcceptBooking(booking)}
        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-semibold flex items-center justify-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Accept Booking
      </button>
    )}
    
    {/* Delete Button - Always show */}
    <button
      onClick={() => handleDeleteBooking(booking)}
      className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold flex items-center justify-center"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      Delete Booking
    </button>
  </div>
  
  {booking.notes && (
    <div className="mt-2">
      <p className="text-sm text-gray-400">Notes:</p>
      <p className="text-gray-300 text-sm mt-1">{booking.notes}</p>
    </div>
  )}
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
        )}

        {/* SERVICES TAB */}
        {activeTab === "services" && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Services Management</h2>
                <p className="text-gray-400">Add and manage your car care services</p>
              </div>
              <button
                onClick={() => {
                  setShowServiceForm(true);
                  setEditingService(null);
                  setServiceForm({
                    name: "",
                    price: "",
                    description: "",
                    features: "",
                    order: services.length,
                  });
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Service
              </button>
            </div>

            {/* Service Form */}
            {showServiceForm && (
              <div className="bg-zinc-800 rounded-lg p-6 mb-8 border-2 border-blue-500">
                <h3 className="text-xl font-bold text-white mb-4">
                  {editingService ? "Edit Service" : "Add New Service"}
                </h3>
                <form onSubmit={handleServiceSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Service Name * <span className="text-xs text-gray-500">(Slug auto-generated)</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={serviceForm.name}
                        onChange={handleServiceFormChange}
                        required
                        placeholder="e.g., Premium Car Wash"
                        className="w-full px-4 py-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                   
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={serviceForm.price}
                        onChange={handleServiceFormChange}
                        required
                        placeholder="499"
                        min="0"
                        className="w-full px-4 py-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={serviceForm.description}
                      onChange={handleServiceFormChange}
                      required
                      rows={3}
                      placeholder="Brief description of the service"
                      className="w-full px-4 py-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Features (comma-separated)
                    </label>
                    <textarea
                      name="features"
                      value={serviceForm.features}
                      onChange={handleServiceFormChange}
                      rows={2}
                      placeholder="Exterior wash, Interior vacuum, Tire shine"
                      className="w-full px-4 py-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={serviceForm.order}
                      onChange={handleServiceFormChange}
                      placeholder="0"
                      min="0"
                      className="w-full px-4 py-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Saving..." : (editingService ? "Update Service" : "Add Service")}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowServiceForm(false);
                        setEditingService(null);
                      }}
                      className="px-6 bg-zinc-700 text-white py-3 rounded-lg font-semibold hover:bg-zinc-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Services List */}
            {services.length === 0 ? (
              <div className="bg-zinc-800 rounded-lg p-8 text-center">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-gray-400 text-lg">No services added yet</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="bg-zinc-800 rounded-lg p-6 hover:ring-2 hover:ring-blue-500 transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white">{service.name}</h3>
                      <span className="text-2xl font-bold text-blue-500">₹{service.price}</span>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-2">Slug: {service.slug}</p>
                    <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                    
                    {service.features && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">Features:</p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.split(',').map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-zinc-700 text-gray-300 px-2 py-1 rounded"
                            >
                              {feature.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEditService(service)}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(service._id)}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VEHICLE TYPES TAB */}
        {activeTab === "vehicle-types" && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Vehicle Types Management</h2>
                <p className="text-gray-400">Add and manage vehicle types for bookings</p>
              </div>
              <button
                onClick={() => {
                  setShowVehicleForm(true);
                  setVehicleForm({ name: "", order: vehicleTypes.length });
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Vehicle Type
              </button>
            </div>

            {/* Vehicle Form */}
            {showVehicleForm && (
              <div className="bg-zinc-800 rounded-lg p-6 mb-8 border-2 border-blue-500">
                <h3 className="text-xl font-bold text-white mb-4">Add New Vehicle Type</h3>
                <form onSubmit={handleVehicleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Vehicle Name * <span className="text-xs text-gray-500">(Slug auto-generated)</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={vehicleForm.name}
                        onChange={handleVehicleFormChange}
                        required
                        placeholder="e.g., Sedan"
                        className="w-full px-4 py-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                   
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Display Order
                      </label>
                      <input
                        type="number"
                        name="order"
                        value={vehicleForm.order}
                        onChange={handleVehicleFormChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-4 py-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Saving..." : "Add Vehicle Type"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowVehicleForm(false)}
                      className="px-6 bg-zinc-700 text-white py-3 rounded-lg font-semibold hover:bg-zinc-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Vehicle Types List */}
            {vehicleTypes.length === 0 ? (
              <div className="bg-zinc-800 rounded-lg p-8 text-center">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-gray-400 text-lg">No vehicle types added yet</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
                {vehicleTypes.map((vehicle) => (
                  <div
                    key={vehicle._id}
                    className="bg-zinc-800 rounded-lg p-6 hover:ring-2 hover:ring-blue-500 transition text-center"
                  >
                    <div className="text-5xl mb-3">🚗</div>
                    <h3 className="text-lg font-bold text-white mb-2">{vehicle.name}</h3>
                    <p className="text-xs text-gray-500 mb-4">Slug: {vehicle.slug}</p>
                    
                    <button
                      onClick={() => handleDeleteVehicle(vehicle._id)}
                      className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HERO IMAGES TAB */}
        {activeTab === "hero-images" && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Hero Images</h2>
              <p className="text-gray-400">Manage homepage hero section images</p>
            </div>

            {/* Upload Form */}
            <div className="bg-zinc-800 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Upload New Image</h3>
              <form onSubmit={handleImageUpload} className="space-y-4">
                <div>
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-400
                      file:mr-4 file:py-3 file:px-6
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-600 file:text-white
                      hover:file:bg-blue-700 file:cursor-pointer"
                  />
                </div>

                {preview && (
                  <div className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden border-2 border-blue-500">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      Preview
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={uploading || !preview}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "Uploading..." : "Upload to Cloudinary"}
                </button>
              </form>
            </div>

            {/* Images Grid */}
            {heroImages.length === 0 ? (
              <div className="bg-zinc-800 rounded-lg p-8 text-center">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400 text-lg">No hero images uploaded yet</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {heroImages.map((image, index) => (
                  <div key={image.public_id} className="bg-zinc-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition">
                    <div className="aspect-video relative bg-zinc-900">
                      <img
                        src={image.secure_url}
                        alt={`Hero Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        Image {index + 1}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-white text-sm mb-3 truncate" title={image.public_id}>
                        {image.public_id}
                      </p>
                      <button
                        onClick={() => handleDeleteImage(image.public_id)}
                        className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
