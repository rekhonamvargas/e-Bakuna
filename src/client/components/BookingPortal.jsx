import React, { useState, useEffect } from 'react';
import './BookingPortal.css';

export default function BookingPortal({ user, onLogout, hideLogout = false, hideHeader = false }) {
  const timeLabels = {
    t_0900_am: '09:00 AM',
    t_1000_am: '10:00 AM',
    t_1100_am: '11:00 AM',
    t_1200_pm: '12:00 PM',
    t_0100_pm: '01:00 PM',
    t_0200_pm: '02:00 PM',
    t_0300_pm: '03:00 PM'
  };

  const formatTime = (timeValue) => {
    const value = (timeValue || '').toString();
    return timeLabels[value] || value || '--';
  };

  const normalizedRoles = Array.isArray(user?.roles)
    ? user.roles.map((r) => (r || '').toString().toLowerCase())
    : [];
  const normalizedDescription = (user?.description || '').toString().toLowerCase();
  const isCitizen = normalizedRoles.some((r) => r.includes('citizen')) || normalizedDescription.includes('citizen');

  if (user && !isCitizen) {
    return (
      <div className="booking-portal" style={{ padding: '40px' }}>
        <div className="error-box">Access denied: Citizen dashboard only.</div>
      </div>
    );
  }

  const defaultName = [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim();
  const [formData, setFormData] = useState({
    fullName: defaultName,
    contactNo: '',
    dateOfBirth: '',
    barangay: 'Mabolo',
    vaccineType: 'COVID-19 Booster',
    preferredDate: '',
    preferredTime: 't_0900_am',
    doseNumber: '1st Dose',
    healthUnit: 'Cebu City Health Office (CHO)'
  });
  const [referenceNumber, setReferenceNumber] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);
  const [latestReference, setLatestReference] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const savedRefs = JSON.parse(localStorage.getItem('ebakuna_bookings') || '[]');
    if (savedRefs.length > 0) {
      const latest = savedRefs[savedRefs.length - 1];
      setLatestReference(latest.referenceNumber || '');
      setReferenceNumber(latest.referenceNumber || '');
    }
  }, []);

  const formatDate = (dateValue) => {
    if (!dateValue) return '--';
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return dateValue;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const normalizeBooking = (raw = {}) => {
    const status = (raw.booking_status || raw.status || 'pending').toString().toLowerCase();
    return {
      reference: raw.reference_number || raw.referenceNumber || raw.booking_reference || latestReference || '--',
      status,
      vaccine: raw.vaccine_type || raw.vaccineType || formData.vaccineType || '--',
      date: raw.first_dose_date || raw.preferredDate || formData.preferredDate || '--',
      time: formatTime(raw.preferred_time || raw.preferredTime || formData.preferredTime),
      provider: raw.provider || raw.health_unit || formData.healthUnit || 'Cebu City Health Office (CHO)',
      assigned: raw.assigned_date || raw.clinic_schedule || ''
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice('');
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
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time is required';
    
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
          preferredTime: formData.preferredTime,
          doseNumber: formData.doseNumber,
          healthUnit: formData.healthUnit
        })
      });

      const data = await response.json();
      
      const ref = data.referenceNumber || data.booking?.referenceNumber || data.booking?.reference_number;
      if (data.status === 'success' && ref) {
        const savedRefs = JSON.parse(localStorage.getItem('ebakuna_bookings') || '[]');
        savedRefs.push({
          referenceNumber: ref,
          bookedDate: new Date().toISOString(),
          fullName: formData.fullName,
          vaccineType: formData.vaccineType,
          preferredDate: formData.preferredDate
        });
        localStorage.setItem('ebakuna_bookings', JSON.stringify(savedRefs));
        
        setLatestReference(ref);
        setReferenceNumber(ref);
        setBookingStatus(
          normalizeBooking({
            reference_number: ref,
            booking_status: 'pending',
            vaccine_type: formData.vaccineType,
            first_dose_date: formData.preferredDate,
            preferred_time: formData.preferredTime,
            provider: formData.healthUnit
          })
        );
        setNotice('Booking submitted successfully. Status details are shown on the right panel.');
        setFormData({
          fullName: defaultName,
          contactNo: '',
          dateOfBirth: '',
          barangay: 'Mabolo',
          vaccineType: 'COVID-19 Booster',
          preferredDate: '',
          preferredTime: 't_0900_am',
          doseNumber: '1st Dose',
          healthUnit: 'Cebu City Health Office (CHO)'
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
      const response = await fetch(`/api/x_2009786_vaccinat/v1/ebakuna_auth/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ referenceNumber })
      });

      const data = await response.json();

      if (data.status === 'success' && data.booking) {
        setBookingStatus(normalizeBooking(data.booking));
        setLatestReference(data.booking.reference_number || referenceNumber);
        setNotice('Booking record found. Status panel has been updated.');
        setErrors((prev) => ({ ...prev, referenceNumber: '' }));
      } else {
        setBookingStatus(null);
        setErrors((prev) => ({ ...prev, referenceNumber: data.error || 'Booking not found' }));
      }
    } catch (err) {
      setBookingStatus(null);
      setErrors((prev) => ({ ...prev, referenceNumber: err.message || 'Error tracking booking' }));
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      fullName: defaultName,
      contactNo: '',
      dateOfBirth: '',
      barangay: 'Mabolo',
      vaccineType: 'COVID-19 Booster',
      preferredDate: '',
      preferredTime: 't_0900_am',
      doseNumber: '1st Dose',
      healthUnit: 'Cebu City Health Office (CHO)'
    });
    setErrors({});
    setNotice('');
  };

  const effectiveBooking = bookingStatus || normalizeBooking({ reference_number: latestReference });
  const statusSteps = [
    { id: 1, title: 'Booking Submitted', caption: 'Your request has been received and saved.' },
    { id: 2, title: 'Under Review', caption: 'Clinic staff is verifying your details.' },
    { id: 3, title: 'Approved', caption: `Assigned: ${formatDate(effectiveBooking.date)} at ${effectiveBooking.time || '--'}` },
    { id: 4, title: 'Vaccination Done', caption: 'Pending' }
  ];

  const statusStage = (() => {
    const status = effectiveBooking.status;
    if (status.includes('complete') || status.includes('done') || status.includes('vaccinated')) return 4;
    if (status.includes('approved') || status.includes('confirm')) return 3;
    if (status.includes('review') || status.includes('pending')) return 2;
    if (effectiveBooking.reference && effectiveBooking.reference !== '--') return 1;
    return 0;
  })();

  const userInitials = `${(user?.first_name || 'C').charAt(0)}${(user?.last_name || 'Z').charAt(0)}`.toUpperCase();

  return (
    <div className="booking-portal">
      <header className="citizen-topbar">
        <div className="citizen-identity">
          <span className="citizen-avatar">{userInitials}</span>
          <div>
            <h1>{`${defaultName || 'Citizen User'} · CHO Cebu`}</h1>
            <p>Citizen Dashboard · Vaccination Booking & Tracking</p>
          </div>
        </div>
        <div className="citizen-topbar-actions">
          <span className="citizen-chip">Citizen · Active</span>
          {!hideLogout && (
            <button className="citizen-logout" onClick={onLogout}>Logout</button>
          )}
        </div>
      </header>

      <section className="citizen-main-grid">
        <div className="citizen-panel citizen-form-panel">
          <h2>Book an Appointment</h2>
          <form onSubmit={handleBooking}>
            {errors.general && <div className="error-box">{errors.general}</div>}
            {notice && <div className="success-box">{notice}</div>}

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
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
              <label>Contact Number</label>
              <input
                type="tel"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                className={errors.contactNo ? 'error' : ''}
              />
              {errors.contactNo && <span className="error-text">{errors.contactNo}</span>}
            </div>

            <div className="form-group">
              <label>Vaccine Type</label>
              <select
                name="vaccineType"
                value={formData.vaccineType}
                onChange={handleChange}
                className={errors.vaccineType ? 'error' : ''}
              >
                <option>COVID-19 Booster</option>
                <option>Flu Vaccine</option>
                <option>Hepatitis B</option>
                <option>Pneumococcal</option>
                <option>MMR</option>
              </select>
              {errors.vaccineType && <span className="error-text">{errors.vaccineType}</span>}
            </div>

            <div className="form-group">
              <label>Preferred Date</label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className={errors.preferredDate ? 'error' : ''}
              />
              {errors.preferredDate && <span className="error-text">{errors.preferredDate}</span>}
            </div>

            <div className="form-group">
              <label>Preferred Time</label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className={errors.preferredTime ? 'error' : ''}
              >
                <option value="t_0900_am">09:00 AM</option>
                <option value="t_1000_am">10:00 AM</option>
                <option value="t_1100_am">11:00 AM</option>
                <option value="t_1200_pm">12:00 PM</option>
                <option value="t_0100_pm">01:00 PM</option>
                <option value="t_0200_pm">02:00 PM</option>
                <option value="t_0300_pm">03:00 PM</option>
              </select>
              {errors.preferredTime && <span className="error-text">{errors.preferredTime}</span>}
            </div>

            <div className="form-group">
              <label>Provider / Clinic</label>
              <select name="healthUnit" value={formData.healthUnit} onChange={handleChange}>
                <option>Cebu City Health Office (CHO)</option>
                <option>RHU Mabolo</option>
                <option>RHU Guadalupe</option>
                <option>RHU Labangon</option>
              </select>
            </div>

            <div className="citizen-form-actions">
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Booking'}
              </button>
              <button type="button" className="btn-clear" onClick={clearForm} disabled={loading}>
                Clear
              </button>
            </div>
          </form>

          <div className="citizen-inline-track">
            <h3>Track Booking</h3>
            <form className="track-inline" onSubmit={handleTrackBooking}>
              <input
                type="text"
                placeholder="Enter reference number"
                value={referenceNumber}
                onChange={(e) => {
                  setReferenceNumber(e.target.value);
                  if (errors.referenceNumber) {
                    setErrors((prev) => ({ ...prev, referenceNumber: '' }));
                  }
                }}
                className={errors.referenceNumber ? 'error' : ''}
              />
              <button type="submit" className="btn-track" disabled={loading}>
                {loading ? 'Searching...' : 'Track'}
              </button>
            </form>
            {errors.referenceNumber && <span className="error-text">{errors.referenceNumber}</span>}
          </div>
        </div>

        <div className="citizen-panel citizen-status-panel">
          <h2>Your Booking Status</h2>
          <div className="reference-box">
            <span>Reference Number</span>
            <strong>{effectiveBooking.reference || '--'}</strong>
            <p>Use this number to track your appointment</p>
          </div>

          <ol className="status-timeline">
            {statusSteps.map((step) => {
              const stepClass = step.id < statusStage ? 'done' : step.id === statusStage ? 'current' : 'pending';
              return (
                <li key={step.id} className={`timeline-step ${stepClass}`}>
                  <span className="timeline-dot">{step.id < statusStage ? '✓' : step.id}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.caption}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="appointment-details-box">
            <h3>Appointment Details</h3>
            <div className="appointment-grid">
              <div>
                <span>Vaccine</span>
                <strong>{effectiveBooking.vaccine}</strong>
              </div>
              <div>
                <span>Provider</span>
                <strong>{effectiveBooking.provider}</strong>
              </div>
              <div>
                <span>Date</span>
                <strong>{formatDate(effectiveBooking.date)}</strong>
              </div>
              <div>
                <span>Time</span>
                <strong>{effectiveBooking.time || '--'}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
