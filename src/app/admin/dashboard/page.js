"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./styles.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [vehicleBrands, setVehicleBrands] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showBrandForm, setShowBrandForm] = useState(false);
  const router = useRouter();

  const [serviceForm, setServiceForm] = useState({
    name: "", description: "", features: "", order: 0,
  });

  const [brandForm, setBrandForm] = useState({ name: "", models: "" });

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
      const [bookingsRes, imagesRes, servicesRes, brandsRes] = await Promise.all([
        fetch("/api/bookings").catch(() => ({ ok: false })),
        fetch("/api/cloudinary-images").catch(() => ({ ok: false })),
        fetch("/api/services").catch(() => ({ ok: false })),
        fetch("/api/vehicle-brands").catch(() => ({ ok: false })),
      ]);

      if (bookingsRes.ok) setBookings((await bookingsRes.json()).bookings || []);
      if (imagesRes.ok) setHeroImages((await imagesRes.json()).images || []);
      if (servicesRes.ok) setServices((await servicesRes.json()).services || []);
      if (brandsRes.ok) setVehicleBrands((await brandsRes.json()).brands || []);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.file.files[0];
    if (!file) return setMessage("Please select a file");

    setUploading(true);
    setMessage("");

    try {
      const signatureRes = await fetch(`/api/upload-signature?folder=automotive-carcare/hero-images`);
      const signatureData = await signatureRes.json();

      if (signatureData.error) throw new Error(signatureData.error);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("timestamp", signatureData.timestamp);
      formData.append("signature", signatureData.signature);
      formData.append("api_key", signatureData.apiKey);
      formData.append("folder", signatureData.folder);

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
        { method: "POST", body: formData }
      );

      const result = await cloudinaryRes.json();
      if (result.error) throw new Error(result.error.message);

      setMessage("Image uploaded successfully!");
      setPreview(null);
      e.target.reset();
      fetchData();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to upload image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (publicId) => {
    if (!confirm("Delete this image?")) return;

    try {
      const response = await fetch("/api/cloudinary-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Image deleted successfully!");
        fetchData();
        setTimeout(() => setMessage(""), 3000);
      } else {
        throw new Error(data.error || "Failed to delete image");
      }
    } catch (error) {
      setMessage("Failed to delete image: " + error.message);
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const slug = serviceForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const method = editingService ? "PUT" : "POST";
      const body = editingService ? { ...serviceForm, slug, _id: editingService._id } : { ...serviceForm, slug };

      const response = await fetch("/api/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.success) {
        setMessage(editingService ? "Service updated!" : "Service added!");
        setShowServiceForm(false);
        setEditingService(null);
        setServiceForm({ name: "", description: "", features: "", order: 0 });
        await fetchData();
        setTimeout(() => setMessage(""), 3000);
      } else {
        throw new Error(data.error || "Failed to save service");
      }
    } catch (error) {
      setMessage("Failed to save service: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (!confirm("Delete this service?")) return;
    try {
      const response = await fetch(`/api/services?id=${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        setMessage("Service deleted!");
        await fetchData();
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setMessage("Failed to delete service: " + error.message);
    }
  };

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const modelsArray = brandForm.models.split(",").map((m) => m.trim()).filter((m) => m.length > 0);
      const method = editingBrand ? "PUT" : "POST";
      const body = editingBrand
        ? { ...brandForm, models: modelsArray, _id: editingBrand._id }
        : { ...brandForm, models: modelsArray };

      const response = await fetch("/api/vehicle-brands", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.success) {
        setMessage(editingBrand ? "Brand updated!" : "Brand added!");
        setShowBrandForm(false);
        setEditingBrand(null);
        setBrandForm({ name: "", models: "" });
        await fetchData();
        setTimeout(() => setMessage(""), 3000);
      } else {
        throw new Error(data.error || "Failed to save brand");
      }
    } catch (error) {
      setMessage("Failed to save brand: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBrand = async (id) => {
    if (!confirm("Delete this brand?")) return;
    try {
      const response = await fetch(`/api/vehicle-brands?id=${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        setMessage("Brand deleted!");
        await fetchData();
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setMessage("Failed to delete brand: " + error.message);
    }
  };

  const handleAcceptBooking = async (booking) => {
    if (!confirm(`Accept booking from ${booking.name}?`)) return;

    try {
      setMessage("");
      let bookingId = typeof booking._id === 'object' 
        ? (booking._id.$oid || booking._id.toString()) 
        : booking._id;

      const response = await fetch("/api/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: bookingId, status: "confirmed" }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("✅ Booking accepted!");
        await fetchData();
        setTimeout(() => setMessage(""), 3000);
      } else {
        throw new Error(data.error || "Failed to accept booking");
      }
    } catch (error) {
      setMessage("❌ Failed to accept booking: " + error.message);
    }
  };

  const handleDeleteBooking = async (booking) => {
    if (!confirm(`Delete booking from ${booking.name}?`)) return;

    try {
      setMessage("");
      const bookingId = typeof booking._id === 'object' ? booking._id.toString() : booking._id;
      const response = await fetch(`/api/bookings?id=${bookingId}`, { method: "DELETE" });
      const data = await response.json();

      if (data.success) {
        setMessage("✅ Booking deleted!");
        await fetchData();
        setTimeout(() => setMessage(""), 3000);
      } else {
        throw new Error(data.error || "Failed to delete booking");
      }
    } catch (error) {
      setMessage("❌ Failed to delete booking: " + error.message);
    }
  };

  const groupBookingsByDate = () => {
    const grouped = {};
    bookings.forEach((booking) => {
      if (!grouped[booking.bookingDate]) grouped[booking.bookingDate] = [];
      grouped[booking.bookingDate].push(booking);
    });
    return grouped;
  };

  if (loading && !["services", "vehicle-brands"].includes(activeTab)) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner"></div>
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    );
  }

  const SVG = ({ path, className = "icon-md" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
  );

  const tabs = [
    { id: "bookings", label: "Bookings", count: bookings.length },
    { id: "services", label: "Services", count: services.length },
    { id: "vehicle-brands", label: "Vehicle Brands", count: vehicleBrands.length },
    { id: "hero-images", label: "Hero Images", count: heroImages.length },
  ];

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1 className="admin-title">Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            <SVG path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="nav-tabs">
        <div className="nav-tabs-content">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      <main className="main-content">
        {message && (
          <div className={`message-box ${message.includes("✅") || message.includes("success") ? "success" : "error"}`}>
            <SVG
              path={message.includes("✅") || message.includes("success")
                ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"}
              className="message-icon"
            />
            <span>{message}</span>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === "bookings" && (
          <div>
            <div className="section-header">
              <div>
                <h2 className="section-title">Bookings</h2>
                <p className="section-subtitle">Manage customer bookings</p>
              </div>
            </div>

            {bookings.length === 0 ? (
              <div className="empty-state">
                <SVG path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" className="empty-icon" />
                <p className="empty-text">No bookings yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(groupBookingsByDate())
                  .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
                  .map(([date, dateBookings]) => (
                    <div key={date} className="date-group">
                      <div className="date-header">
                        <SVG path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" className="date-icon" />
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        <span className="date-count">{dateBookings.length} booking{dateBookings.length > 1 ? "s" : ""}</span>
                      </div>
                      <div className="space-y-4">
                        {dateBookings.map((booking) => (
                          <div key={booking._id} className="booking-card">
                            <div className="booking-grid">
                              <div>
                                <p className="booking-label">Customer</p>
                                <p className="booking-value">{booking.name}</p>
                                <p className="text-gray text-sm mt-2">{booking.email}</p>
                                <p className="text-gray text-sm">{booking.phone}</p>
                              </div>
                              <div>
                                <p className="booking-label">Service Details</p>
                                <p className="booking-value">{booking.serviceName || booking.service}</p>
                                {/* {booking.servicePrice && <p className="text-sm" style={{color: 'rgb(96, 165, 250)'}}>₹{booking.servicePrice}</p>} */}
                                <p className="text-sm text-gray mt-2">Brand: {booking.vehicleBrand || "N/A"}</p>
                                <p className="text-sm text-gray">Model: {booking.vehicleModel || "N/A"}</p>
                                <p className="text-sm text-gray">Time: {booking.bookingTime}</p>
                              </div>
                              <div>
                                <p className="booking-label">Status</p>
                                <span className={`status-badge ${booking.status === 'confirmed' ? 'status-confirmed' : 'status-pending'}`}>
                                  {booking.status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending'}
                                </span>
                                <div className="space-y-2 mt-4">
                                  {booking.status === 'pending' && (
                                    <button onClick={() => handleAcceptBooking(booking)} className="btn-accept">
                                      <SVG path="M5 13l4 4L19 7" className="icon-sm" />
                                      Accept
                                    </button>
                                  )}
                                  <button onClick={() => handleDeleteBooking(booking)} className="btn-delete" style={{width: '100%'}}>
                                    <SVG path="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" className="icon-sm" />
                                    Delete
                                  </button>
                                </div>
                                {booking.notes && (
                                  <div className="mt-2">
                                    <p className="text-xs text-gray">Notes:</p>
                                    <p className="text-sm text-gray">{booking.notes}</p>
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
            <div className="section-header">
              <div>
                <h2 className="section-title">Services</h2>
                <p className="section-subtitle">Manage car care services</p>
              </div>
              <button onClick={() => {
                setShowServiceForm(true);
                setEditingService(null);
                setServiceForm({ name: "", description: "", features: "", order: services.length });
              }} className="btn-primary">
                <SVG path="M12 4v16m8-8H4" className="icon-sm" />
                Add Service
              </button>
            </div>

            {showServiceForm && (
              <div className="form-card">
                <h3 className="form-title">{editingService ? "Edit Service" : "Add Service"}</h3>
                <form onSubmit={handleServiceSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Service Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={serviceForm.name}
                        onChange={(e) => setServiceForm({ ...serviceForm, [e.target.name]: e.target.value })}
                        required
                        placeholder="Premium Car Wash"
                        className="form-input"
                      />
                    </div>
                    {/* <div className="form-group">
                      <label className="form-label">Price (₹) *</label>
                      <input
                        type="number"
                        name="price"
                        value={serviceForm.price}
                        onChange={(e) => setServiceForm({ ...serviceForm, [e.target.name]: e.target.value })}
                        required
                        placeholder="499"
                        min="0"
                        className="form-input"
                      />
                    </div> */}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description *</label>
                    <textarea
                      name="description"
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, [e.target.name]: e.target.value })}
                      required
                      rows={3}
                      placeholder="Brief description"
                      className="form-textarea"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Features (comma-separated)</label>
                    <textarea
                      name="features"
                      value={serviceForm.features}
                      onChange={(e) => setServiceForm({ ...serviceForm, [e.target.name]: e.target.value })}
                      rows={2}
                      placeholder="Exterior wash, Interior vacuum"
                      className="form-textarea"
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" disabled={loading} className="btn-primary" style={{flex: 1}}>
                      {loading ? "Saving..." : (editingService ? "Update" : "Add")}
                    </button>
                    <button type="button" onClick={() => { setShowServiceForm(false); setEditingService(null); }} className="btn-cancel">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {services.length === 0 ? (
              <div className="empty-state">
                <SVG path="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" className="empty-icon" />
                <p className="empty-text">No services added</p>
              </div>
            ) : (
              <div className="card-grid">
                {services.map((service) => (
                  <div key={service._id} className="card">
                    <div className="card-header">
                      <h3 className="card-title">{service.name}</h3>
                      {/* <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'rgb(59, 130, 246)'}}>₹{service.price}</span> */}
                    </div>
                    <p className="card-subtitle">Slug: {service.slug}</p>
                    <p className="text-gray text-sm mb-4">{service.description}</p>
                    {service.features && (
                      <div className="mb-4">
                        <p className="text-xs text-gray mb-2">Features:</p>
                        <div className="badge-grid">
                          {service.features.split(',').map((feature, idx) => (
                            <span key={idx} className="badge" style={{backgroundColor: 'rgb(63, 63, 70)'}}>{feature.trim()}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="card-actions">
                      <button onClick={() => { setEditingService(service); setServiceForm(service); setShowServiceForm(true); }} className="btn-edit">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteService(service._id)} className="btn-delete">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VEHICLE BRANDS TAB */}
        {activeTab === "vehicle-brands" && (
          <div>
            <div className="section-header">
              <div>
                <h2 className="section-title">Vehicle Brands & Models</h2>
                <p className="section-subtitle">Manage brands and models for booking form</p>
              </div>
              <button onClick={() => { setShowBrandForm(true); setEditingBrand(null); setBrandForm({ name: "", models: "" }); }} className="btn-primary">
                <SVG path="M12 4v16m8-8H4" className="icon-sm" />
                Add Brand
              </button>
            </div>

            {showBrandForm && (
              <div className="form-card">
                <h3 className="form-title">{editingBrand ? "Edit Brand" : "Add Brand"}</h3>
                <form onSubmit={handleBrandSubmit}>
                  <div className="form-group">
                    <label className="form-label">Brand Name * <span className="text-xs text-gray">(e.g., Mahindra)</span></label>
                    <input
                      type="text"
                      name="name"
                      value={brandForm.name}
                      onChange={(e) => setBrandForm({ ...brandForm, [e.target.name]: e.target.value })}
                      required
                      placeholder="Mahindra"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Models * <span className="text-xs text-gray">(comma-separated)</span></label>
                    <textarea
                      name="models"
                      value={brandForm.models}
                      onChange={(e) => setBrandForm({ ...brandForm, [e.target.name]: e.target.value })}
                      required
                      rows={3}
                      placeholder="Thar, Scorpio, XUV700"
                      className="form-textarea"
                    />
                    <p className="text-xs text-gray mt-2">💡 Separate models with commas</p>
                  </div>
                  <div className="form-actions">
                    <button type="submit" disabled={loading} className="btn-primary" style={{flex: 1}}>
                      {loading ? "Saving..." : (editingBrand ? "Update" : "Add")}
                    </button>
                    <button type="button" onClick={() => { setShowBrandForm(false); setEditingBrand(null); }} className="btn-cancel">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {vehicleBrands.length === 0 ? (
              <div className="empty-state">
                <SVG path="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" className="empty-icon" />
                <p className="empty-text">No brands added</p>
              </div>
            ) : (
              <div className="card-grid">
                {vehicleBrands.map((brand) => (
                  <div key={brand._id} className="card">
                    <h3 className="card-title">
                      <span className="card-icon">🏢</span>
                      {brand.name}
                    </h3>
                    <p className="card-subtitle">Slug: {brand.slug}</p>
                    <div className="mb-4">
                      <p className="text-xs text-gray mb-2">Models ({brand.models?.length || 0}):</p>
                      {!brand.models || brand.models.length === 0 ? (
                        <p className="text-xs" style={{color: 'rgb(248, 113, 113)'}}>⚠️ No models</p>
                      ) : (
                        <div className="badge-grid">
                          {brand.models.map((model, idx) => (
                            <span key={idx} className="badge">{model}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="card-actions">
                      <button onClick={() => { setEditingBrand(brand); setBrandForm({ name: brand.name, models: brand.models.join(", ") }); setShowBrandForm(true); }} className="btn-edit">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteBrand(brand._id)} className="btn-delete">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HERO IMAGES TAB */}
        {activeTab === "hero-images" && (
          <div>
            <div className="section-header">
              <div>
                <h2 className="section-title">Hero Images</h2>
                <p className="section-subtitle">Upload and manage hero section images</p>
              </div>
            </div>

            <div className="form-card">
              <h3 className="form-title">Upload New Image</h3>
              <form onSubmit={handleImageUpload}>
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="form-input mb-4"
                  style={{padding: '0.5rem'}}
                />
                {preview && (
                  <img src={preview} alt="Preview" style={{width: '16rem', height: '10rem', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem'}} />
                )}
                <button type="submit" disabled={uploading} className="btn-primary">
                  {uploading ? "Uploading..." : "Upload Image"}
                </button>
              </form>
            </div>

            {heroImages.length === 0 ? (
              <div className="empty-state">
                <SVG path="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" className="empty-icon" />
                <p className="empty-text">No images uploaded</p>
              </div>
            ) : (
              <div className="card-grid">
                {heroImages.map((image) => (
                  <div key={image.public_id} className="card">
                    <img src={image.url} alt="Hero" style={{width: '100%', height: '12rem', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem'}} />
                    <button onClick={() => handleDeleteImage(image.public_id)} className="btn-delete" style={{width: '100%'}}>
                      Delete
                    </button>
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
