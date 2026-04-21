import React, { useState, useEffect, useMemo } from 'react';
import { EBakunaService } from '../services/EBakunaService.js';
import './StaffDashboard.css';

export default function StaffDashboard({ user, onLogout }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignedDates, setAssignedDates] = useState({});
  const [updatingId, setUpdatingId] = useState(null);
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
    const assigned = assignedDates[booking.sys_id];
    if (assigned) return assigned;

    const preferred = extractValue(booking.preferred_date) || extractValue(booking.first_dose_date);
    if (preferred) {
      const date = new Date(preferred);
      return date.toISOString().split('T')[0];
    }
    return '';
  };

  const reviewBooking = async (booking, status) => {
    setUpdatingId(booking.sys_id);
    try {
      const assignDate = assignedDates[booking.sys_id];
      await ebakunaService.updateBooking(booking.sys_id, {
        booking_status: status,
        assigned_date: assignDate || null
      });
      await loadBookings(); // Refresh the list
    } catch (error) {
      console.error('Error updating booking:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredPendingBookings = bookings.filter(booking => {
    const status = extractValue(booking.booking_status).toLowerCase();
    if (!status.includes('pending') && !status.includes('review')) return false;

    if (filter === 'all') return true;
    if (filter === 'covid') return extractValue(booking.vaccine_type).toLowerCase().includes('covid');
    if (filter === 'flu') return extractValue(booking.vaccine_type).toLowerCase().includes('flu');
    if (filter === 'others') {
      const vaccine = extractValue(booking.vaccine_type).toLowerCase();
      return !vaccine.includes('covid') && !vaccine.includes('flu');
    }
    return true;
  });

  const filterCounts = {
    all: bookings.filter(b => {
      const status = extractValue(b.booking_status).toLowerCase();
      return status.includes('pending') || status.includes('review');
    }).length,
    covid: bookings.filter(b => {
      const status = extractValue(b.booking_status).toLowerCase();
      const vaccine = extractValue(b.vaccine_type).toLowerCase();
      return (status.includes('pending') || status.includes('review')) && vaccine.includes('covid');
    }).length,
    flu: bookings.filter(b => {
      const status = extractValue(b.booking_status).toLowerCase();
      const vaccine = extractValue(b.vaccine_type).toLowerCase();
      return (status.includes('pending') || status.includes('review')) && vaccine.includes('flu');
    }).length,
    others: bookings.filter(b => {
      const status = extractValue(b.booking_status).toLowerCase();
      const vaccine = extractValue(b.vaccine_type).toLowerCase();
      return (status.includes('pending') || status.includes('review')) &&
             !vaccine.includes('covid') && !vaccine.includes('flu');
    }).length
  };

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

          <div className="staff-filter-chips">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All ({filterCounts.all})
            </button>
            <button
              className={filter === 'covid' ? 'active' : ''}
              onClick={() => setFilter('covid')}
            >
              COVID-19 ({filterCounts.covid})
            </button>
            <button
              className={filter === 'flu' ? 'active' : ''}
              onClick={() => setFilter('flu')}
            >
              Flu ({filterCounts.flu})
            </button>
            <button
              className={filter === 'others' ? 'active' : ''}
              onClick={() => setFilter('others')}
            >
              Others ({filterCounts.others})
            </button>
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

                  return (
                    <article key={booking.sys_id} className="pending-card">
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
                                [booking.sys_id]: value
                              }));
                            }}
                          />
                        </div>

                        <div className="action-buttons">
                          <button
                            className="btn-primary"
                            onClick={() => reviewBooking(booking, 'confirmed')}
                            disabled={updatingId === booking.sys_id}
                          >
                            Approve
                          </button>

                          <button
                            className="btn-secondary"
                            onClick={() => reviewBooking(booking, 'cancelled')}
                            disabled={updatingId === booking.sys_id}
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