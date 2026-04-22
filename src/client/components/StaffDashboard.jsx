import React, { useState, useEffect, useMemo } from 'react';
import { EBakunaService } from '../services/EBakunaService.js';
import './StaffDashboard.css';

export default function StaffDashboard({ user, onLogout }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignedDates, setAssignedDates] = useState({});
  const [updatingId, setUpdatingId] = useState(null);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [filter, setFilter] = useState('all');

  const ebakunaService = useMemo(() => new EBakunaService(), []);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await ebakunaService.getBookings({ sysparm_limit: '100' });
      setBookings(data);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const extractValue = (field) => {
    if (field && typeof field === 'object') {
      return field.display_value || field.value || '';
    }
    return field || '';
  };

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

  const getInitials = (name) => {
    if (!name || name === 'Unknown Citizen') return 'UC';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAssignDate = (booking) => {
    const bookingId = extractValue(booking.sys_id);
    const assigned = assignedDates[bookingId];
    if (assigned) return assigned;

    const preferred = extractValue(booking.preferred_date) || extractValue(booking.first_dose_date);
    if (preferred) {
      const date = new Date(preferred);
      return date.toISOString().split('T')[0];
    }
    return '';
  };

  const reviewBooking = async (booking, status) => {
    const bookingId = extractValue(booking.sys_id);
    if (!bookingId) {
      const idError = 'Cannot update booking: missing booking id.';
      setActionError(idError);
      window.alert(idError);
      return;
    }

    setUpdatingId(bookingId);
    setActionError('');
    setActionSuccess('');

    try {
      const assignDate = status === 'confirmed' ? assignedDates[bookingId] : '';
      await ebakunaService.reviewBooking(bookingId, status, assignDate);
      setActionSuccess(`Booking ${status === 'confirmed' ? 'approved' : 'rejected'} successfully.`);
      window.alert(`Booking ${status === 'confirmed' ? 'approved' : 'rejected'} successfully.`);
      await loadBookings(); // Refresh the list
    } catch (error) {
      const shouldFallback = !error || !error.status || error.status === 404 || error.status === 405;
      if (!shouldFallback) {
        const message = error.message || 'Failed to update booking status. Please try again.';
        console.error('Error updating booking:', error);
        setActionError(message);
        window.alert(message);
        return;
      }

      // Fallback: attempt direct table update in case scripted API route is unavailable.
      try {
        const assignDate = status === 'confirmed' ? assignedDates[bookingId] : '';
        const updatePayload = {
          booking_status: status,
        };

        if (assignDate) {
          updatePayload.first_dose_date = assignDate;
        }

        await ebakunaService.updateBooking(bookingId, updatePayload);
        setActionSuccess(`Booking ${status === 'confirmed' ? 'approved' : 'rejected'} successfully.`);
        window.alert(`Booking ${status === 'confirmed' ? 'approved' : 'rejected'} successfully.`);
        await loadBookings();
      } catch (fallbackError) {
        console.error('Error updating booking:', fallbackError);
        const message = fallbackError.message || error.message || 'Failed to update booking status. Please try again.';
        setActionError(message);
        window.alert(message);
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const VACCINE_FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'covid-19-booster', label: 'COVID-19 Booster' },
    { key: 'flu-vaccine', label: 'Flu Vaccine' },
    { key: 'hepatitis-b', label: 'Hepatitis B' },
    { key: 'pneumococcal', label: 'Pneumococcal' },
    { key: 'mmr', label: 'MMR' },
    { key: 'varicella', label: 'Varicella' },
    { key: 'tetanus-td', label: 'Tetanus (Td)' },
  ];

  const filteredPendingBookings = bookings.filter(booking => {
    const status = extractValue(booking.booking_status).toLowerCase();
    if (!status.includes('pending') && !status.includes('review')) return false;

    if (filter === 'all') return true;

    const vaccine = extractValue(booking.vaccine_type).toLowerCase();
    switch (filter) {
      case 'covid-19-booster': return vaccine.includes('covid-19') || vaccine.includes('booster');
      case 'flu-vaccine': return vaccine.includes('flu');
      case 'hepatitis-b': return vaccine.includes('hepatitis');
      case 'pneumococcal': return vaccine.includes('pneumococcal');
      case 'mmr': return vaccine.includes('mmr');
      case 'varicella': return vaccine.includes('varicella');
      case 'tetanus-td': return vaccine.includes('tetanus') || vaccine.includes('td');
      default: return true;
    }
  });

  const filterCounts = VACCINE_FILTERS.reduce((acc, vaccineFilter) => {
    if (vaccineFilter.key === 'all') {
      acc.all = bookings.filter(b => {
        const status = extractValue(b.booking_status).toLowerCase();
        return status.includes('pending') || status.includes('review');
      }).length;
    } else {
      acc[vaccineFilter.key] = bookings.filter(b => {
        const status = extractValue(b.booking_status).toLowerCase();
        const vaccine = extractValue(b.vaccine_type).toLowerCase();
        if (!(status.includes('pending') || status.includes('review'))) return false;

        switch (vaccineFilter.key) {
          case 'covid-19-booster': return vaccine.includes('covid-19') || vaccine.includes('booster');
          case 'flu-vaccine': return vaccine.includes('flu');
          case 'hepatitis-b': return vaccine.includes('hepatitis');
          case 'pneumococcal': return vaccine.includes('pneumococcal');
          case 'mmr': return vaccine.includes('mmr');
          case 'varicella': return vaccine.includes('varicella');
          case 'tetanus-td': return vaccine.includes('tetanus') || vaccine.includes('td');
          default: return false;
        }
      }).length;
    }
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="staff-dashboard">
        <div className="loading">Loading staff dashboard...</div>
      </div>
    );
  }

  return (
    <div className="staff-dashboard">
      <div className="staff-topbar">
        <h1>Staff Dashboard</h1>
        <button onClick={onLogout}>Logout</button>
      </div>

      <div className="container">
        <div className="staff-pending-panel">
          <div className="staff-panel-header">
            <h2>Pending Booking Requests</h2>
          </div>

          {actionError && (
            <div className="error-alert" role="alert">
              {actionError}
            </div>
          )}

          {actionSuccess && (
            <div className="success-alert" role="status">
              {actionSuccess}
            </div>
          )}

          <div className="staff-filter-chips">
            {VACCINE_FILTERS.map(vaccineFilter => (
              <button
                key={vaccineFilter.key}
                className={filter === vaccineFilter.key ? 'active' : ''}
                onClick={() => setFilter(vaccineFilter.key)}
              >
                {vaccineFilter.label} ({filterCounts[vaccineFilter.key] || 0})
              </button>
            ))}
          </div>

          {/* ✅ SCROLL AREA ONLY */}
          <div className="pending-scroll-wrapper">
            <div className="pending-card-list">
              {filteredPendingBookings.length === 0 ? (
                <div className="empty-state">No pending bookings for this filter.</div>
              ) : (
                filteredPendingBookings.map((booking) => {
                  const citizenName = extractValue(booking.citizen_name) || 'Unknown Citizen';
                  const vaccine = extractValue(booking.vaccine_type) || 'N/A';
                  const preferredDate = formatDate(
                    extractValue(booking.first_dose_date) ||
                    extractValue(booking.preferred_date)
                  );
                  const reference = extractValue(booking.booking_reference) || '--';
                  const dob = formatDate(extractValue(booking.date_of_birth));
                  const contact = extractValue(booking.contact_number) || '--';
                  const note = extractValue(booking.special_requirements) || 'No allergies declared';
                  const dateValue = getAssignDate(booking);
                  const bookingId = extractValue(booking.sys_id);
                  const rowKey = bookingId || reference || `${citizenName}-${preferredDate}`;
                  const actionsDisabled = !bookingId;

                  return (
                    <article key={rowKey} className="pending-card">
                      <div className="pending-left">
                        <span className="pending-avatar">
                          {getInitials(citizenName)}
                        </span>

                        <div>
                          <h3>{citizenName}</h3>
                          <p>{vaccine} · Preferred: {preferredDate} · Ref: {reference}</p>
                          <p>DOB: {dob} · {contact} · {note}</p>
                        </div>
                      </div>

                      <div className="pending-actions">
                        <div>
                          <label>Assign date</label>
                          <input
                            type="date"
                            value={dateValue}
                            onChange={(e) => {
                              const value = e.target.value;
                              setAssignedDates((prev) => ({
                                ...prev,
                                [bookingId]: value
                              }));
                            }}
                          />
                        </div>

                        <div className="action-buttons">
                          <button
                            className="btn-primary"
                            onClick={() => reviewBooking(booking, 'confirmed')}
                            disabled={actionsDisabled || updatingId === bookingId}
                          >
                            Approve
                          </button>

                          <button
                            className="btn-secondary"
                            onClick={() => reviewBooking(booking, 'cancelled')}
                            disabled={actionsDisabled || updatingId === bookingId}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="staff-bottom-grid">
          <div className="bottom-panel">
            <h3>Quick Stats</h3>
            <p>Total Pending: {filterCounts.all}</p>
            <p>Approved Today: 0</p>
            <p>Rejected Today: 0</p>
          </div>
          <div className="bottom-panel">
            <h3>Recent Activity</h3>
            <p>No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
}