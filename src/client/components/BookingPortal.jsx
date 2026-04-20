import React, { useState, useEffect } from 'react';
import './BookingPortal.css';

export default function BookingPortal({ user, onLogout, hideLogout = false }) {
  const [activeTab, setActiveTab] = useState('book'); // 'book' or 'track'
  const [stats, setStats] = useState({
    citizensBooked: 0,
    activeClinics: 0,
    availableSlots: 0
  });
  const [formData, setFormData] = useState({
    fullName: user?.first_name + ' ' + user?.last_name || '',
    contactNo: '',
    dateOfBirth: '',
    barangay: '',
    vaccineType: '',
    preferredDate: '',
    doseNumber: '1st Dose',
    healthUnit: 'RHU'
  });
  const [referenceNumber, setReferenceNumber] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    loadDashboardStats();
    // Load saved reference numbers from localStorage
    const savedRefs = JSON.parse(localStorage.getItem('ebakuna_bookings') || '[]');
    console.log('📋 Loaded bookings:', savedRefs);
  }, []);

  const loadDashboardStats = async () => {
    try {
      const response = await fetch(`/api/x_2009786_vaccinat/v1/ebakuna_auth/stats`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      const data = await response.json();
      if (data.status === 'success') {
        setStats({
          citizensBooked: data.citizensBooked || 0,
          activeClinics: data.activeClinics || 0,
          availableSlots: data.availableSlots || 0
        });
      }
    } catch (err) {
      console.error('Error loading stats:', err);
      // Use default values if API fails
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.contactNo.trim()) newErrors.contactNo = 'Contact number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.barangay) newErrors.barangay = 'Barangay is required';
    if (!formData.vaccineType) newErrors.vaccineType = 'Vaccine type is required';
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/x_2009786_vaccinat/v1/ebakuna_auth/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          userId: user.sys_id,
          fullName: formData.fullName,
          contactNo: formData.contactNo,
          dateOfBirth: formData.dateOfBirth,
          barangay: formData.barangay,
          vaccineType: formData.vaccineType,
          preferredDate: formData.preferredDate,
          doseNumber: formData.doseNumber,
          healthUnit: formData.healthUnit
        })
      });

      const data = await response.json();
      console.log('📅 Booking response:', data);
      
      const ref = data.referenceNumber || data.booking?.referenceNumber || data.booking?.reference_number;
      if (data.status === 'success' && ref) {
        // Store booking reference in localStorage
        const savedRefs = JSON.parse(localStorage.getItem('ebakuna_bookings') || '[]');
        savedRefs.push({
          referenceNumber: ref,
          bookedDate: new Date().toISOString(),
          fullName: formData.fullName,
          vaccineType: formData.vaccineType,
          preferredDate: formData.preferredDate
        });
        localStorage.setItem('ebakuna_bookings', JSON.stringify(savedRefs));
        
        // Use returned reference number from backend
        setReferenceNumber(ref);
        setShowConfirmation(true);
        setFormData({
          fullName: user?.first_name + ' ' + user?.last_name || '',
          contactNo: '',
          dateOfBirth: '',
          barangay: '',
          vaccineType: '',
          preferredDate: '',
          doseNumber: '1st Dose',
          healthUnit: 'RHU'
        });
        console.log('✓ Booking successful:', ref);
      } else {
        setErrors({ general: data.error || 'Booking failed' });
        console.error('❌ Booking error:', data);
      }
    } catch (err) {
      setErrors({ general: err.message || 'Error creating booking' });
      console.error('❌ Booking exception:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackBooking = async (e) => {
    e.preventDefault();
    if (!referenceNumber.trim()) {
      setErrors({ referenceNumber: 'Reference number is required' });
      return;
    }

    setLoading(true);
    try {
      console.log('🔍 Searching for booking:', referenceNumber);
      const response = await fetch(`/api/x_2009786_vaccinat/v1/ebakuna_auth/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ referenceNumber })
      });

      const data = await response.json();
      console.log('🔍 Track response:', data);
      
      if (data.status === 'success' && data.booking) {
        setBookingStatus(data.booking);
        setErrors({});
        console.log('✓ Booking found:', data.booking);
      } else {
        setBookingStatus(null);
        setErrors({ referenceNumber: data.error || 'Booking not found' });
        console.warn('⚠️ Booking not found:', referenceNumber);
      }
    } catch (err) {
      setBookingStatus(null);
      setErrors({ referenceNumber: err.message || 'Error tracking booking' });
      console.error('❌ Tracking exception:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-portal">
      <div className="portal-header">
        <h1>🏥 E-Bakuna Vaccination Portal</h1>
        <div className="user-info">
          <span>Welcome, {user?.first_name}</span>
          {!hideLogout && (
            <button onClick={onLogout} className="btn-logout">Logout</button>
          )}
        </div>
      </div>

      <section className="role-overview citizen-overview">
        <div className="role-overview-copy">
          <span className="role-overview-kicker">Citizen Dashboard</span>
          <h2>Book, track, and confirm your vaccination request</h2>
          <p>
            This is where you submit a request, save your reference number, and check updates from the clinic staff.
          </p>
        </div>
        <div className="role-overview-grid">
          <div className="role-card">
            <strong>1. Book</strong>
            <span>Fill out your details and submit a vaccination request.</span>
          </div>
          <div className="role-card">
            <strong>2. Track</strong>
            <span>Use your reference number to check status updates.</span>
          </div>
          <div className="role-card">
            <strong>3. Wait for review</strong>
            <span>Clinic staff will approve or reject the request.</span>
          </div>
        </div>
      </section>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{stats.citizensBooked}</div>
          <div className="stat-label">Citizens Booked</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏥</div>
          <div className="stat-value">{stats.activeClinics}</div>
          <div className="stat-label">Active Clinics</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{stats.availableSlots}</div>
          <div className="stat-label">Available Slots</div>
        </div>
      </div>

      <div className="portal-tabs">
        <button 
          className={`tab ${activeTab === 'book' ? 'active' : ''}`}
          onClick={() => setActiveTab('book')}
        >
          📅 Book Appointment
        </button>
        <button 
          className={`tab ${activeTab === 'track' ? 'active' : ''}`}
          onClick={() => setActiveTab('track')}
        >
          🔍 Track Booking
        </button>
      </div>

      <div className="portal-content">
        {activeTab === 'book' && (
          <div className="booking-form">
            <h2>Schedule Your Vaccination</h2>
            
            {showConfirmation && (
              <div className="confirmation-modal">
                <div className="confirmation-content">
                  <div className="success-icon">✅</div>
                  <h3>Booking Confirmed!</h3>
                  <p>Your vaccination appointment has been successfully submitted.</p>
                  <div className="ref-box">
                    <div className="ref-label">Reference Number</div>
                    <div className="ref-number">{referenceNumber}</div>
                    <div className="ref-note">Save this number for tracking</div>
                  </div>
                  <p className="confirmation-note">The clinic staff will review your request and contact you soon.</p>
                  <button 
                    onClick={() => setShowConfirmation(false)}
                    className="btn-primary"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleBooking}>
              {errors.general && <div className="error-box">{errors.general}</div>}

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label>Contact No. *</label>
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    placeholder="09XX XXX XXXX"
                    className={errors.contactNo ? 'error' : ''}
                  />
                  {errors.contactNo && <span className="error-text">{errors.contactNo}</span>}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={errors.dateOfBirth ? 'error' : ''}
                  />
                  {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
                </div>

                <div className="form-group">
                  <label>Barangay *</label>
                  <select
                    name="barangay"
                    value={formData.barangay}
                    onChange={handleChange}
                    className={errors.barangay ? 'error' : ''}
                  >
                    <option value="">Select barangay...</option>
                    <option>Mabolo</option><option>Labangon</option><option>Guadalupe</option>
                    <option>Talamban</option><option>Banilad</option><option>Punta Princesa</option>
                  </select>
                  {errors.barangay && <span className="error-text">{errors.barangay}</span>}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Vaccine Type *</label>
                  <select
                    name="vaccineType"
                    value={formData.vaccineType}
                    onChange={handleChange}
                    className={errors.vaccineType ? 'error' : ''}
                  >
                    <option value="">Select vaccine...</option>
                    <option>COVID-19 Booster</option><option>Influenza</option>
                    <option>Hepatitis B</option><option>Pneumococcal</option>
                  </select>
                  {errors.vaccineType && <span className="error-text">{errors.vaccineType}</span>}
                </div>

                <div className="form-group">
                  <label>Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={errors.preferredDate ? 'error' : ''}
                  />
                  {errors.preferredDate && <span className="error-text">{errors.preferredDate}</span>}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Dose Number</label>
                  <select name="doseNumber" value={formData.doseNumber} onChange={handleChange}>
                    <option>1st Dose</option><option>2nd Dose</option><option>Booster</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Health Unit</label>
                  <select name="healthUnit" value={formData.healthUnit} onChange={handleChange}>
                    <option>RHU</option><option>CHO</option><option>LGU Health Center</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-book" disabled={loading}>
                {loading ? 'Submitting...' : '✅ Confirm Appointment'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'track' && (
          <div className="tracking-form">
            <h2>Track Your Booking</h2>
            
            <form onSubmit={handleTrackBooking}>
              {errors.referenceNumber && <div className="error-box">{errors.referenceNumber}</div>}

              <div className="form-group">
                <label>Reference Number *</label>
                <input
                  type="text"
                  placeholder="e.g., EBK-12345"
                  value={referenceNumber}
                  onChange={(e) => {
                    setReferenceNumber(e.target.value);
                    if (errors.referenceNumber) setErrors({});
                  }}
                  className={errors.referenceNumber ? 'error' : ''}
                />
                {errors.referenceNumber && <span className="error-text">{errors.referenceNumber}</span>}
              </div>

              <button type="submit" className="btn-track" disabled={loading}>
                {loading ? 'Searching...' : '🔍 Search'}
              </button>
            </form>

            {bookingStatus && (
              <div className="status-card">
                <h3>Booking Status</h3>
                <div className="status-info">
                  <div><strong>Reference:</strong> {bookingStatus.referenceNumber}</div>
                  <div><strong>Status:</strong> <span className={`status-${bookingStatus.status}`}>{bookingStatus.status.toUpperCase()}</span></div>
                  <div><strong>Vaccine:</strong> {bookingStatus.vaccineType}</div>
                  <div><strong>Date:</strong> {bookingStatus.preferredDate}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
