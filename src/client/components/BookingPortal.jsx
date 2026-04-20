import React, { useState } from 'react';
import './BookingPortal.css';

export default function BookingPortal({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('book'); // 'book' or 'track'
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
      // Generate reference number
      const ref = 'EBK-' + Math.floor(10000 + Math.random() * 90000);
      
      // Save booking to backend
      const params = new URLSearchParams();
      params.append('user_id', user.sys_id);
      params.append('fullName', formData.fullName);
      params.append('contactNo', formData.contactNo);
      params.append('dateOfBirth', formData.dateOfBirth);
      params.append('barangay', formData.barangay);
      params.append('vaccineType', formData.vaccineType);
      params.append('preferredDate', formData.preferredDate);
      params.append('doseNumber', formData.doseNumber);
      params.append('healthUnit', formData.healthUnit);
      params.append('referenceNumber', ref);
      params.append('status', 'pending');

      const response = await fetch(`/api/x_2009786_vaccinat/v1/ebakuna_auth/booking?${params.toString()}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' }
      });

      const data = await response.json();
      if (data.status === 'success') {
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
      } else {
        setErrors({ general: data.error || 'Booking failed' });
      }
    } catch (err) {
      setErrors({ general: err.message || 'Error creating booking' });
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
      const response = await fetch(`/api/x_2009786_vaccinat/v1/ebakuna_auth/track?ref=${referenceNumber}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      const data = await response.json();
      if (data.status === 'success') {
        setBookingStatus(data.booking);
      } else {
        setErrors({ referenceNumber: data.error || 'Booking not found' });
      }
    } catch (err) {
      setErrors({ referenceNumber: err.message || 'Error tracking booking' });
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
          <button onClick={onLogout} className="btn-logout">Logout</button>
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
