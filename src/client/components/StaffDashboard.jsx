import React, { useEffect, useMemo, useState } from 'react';
import { EBakunaService } from '../services/EBakunaService.js';
import './StaffDashboard.css';

export default function StaffDashboard({ user, onLogout, hideLogout = false }) {
  const normalizedRoles = Array.isArray(user?.roles)
    ? user.roles.map((r) => (r || '').toString().toLowerCase())
    : [];
  const normalizedDescription = (user?.description || '').toString().toLowerCase();
  const isStaff =
    normalizedRoles.some((r) => r.includes('staff') || r.includes('clinic_staff')) ||
    normalizedDescription.includes('staff');

  if (user && !isStaff) {
    return (
      <div className="staff-dashboard" style={{ padding: '40px' }}>
        <div className="error-box">Access denied: Clinic Staff dashboard only.</div>
      </div>
    );
  }

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [assignedDates, setAssignedDates] = useState({});
  const ebakunaService = useMemo(() => new EBakunaService(), []);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const records = await ebakunaService.getBookings({
        sysparm_query: 'booking_status=pending^ORbooking_status=confirmed^ORbooking_status=cancelled',
        sysparm_limit: '100'
      });
      setBookings(records);
    } catch (error) {
      console.error('Error loading bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const extractValue = (field) => {
    if (field === null || field === undefined) return '';

    if (Array.isArray(field)) {
      return field.map(extractValue).filter(Boolean).join(', ');
    }

    if (typeof field === 'object') {
      if (field.display_value) return field.display_value;
      if (field.value && typeof field.value !== 'object') return field.value;
      if (field.name) return field.name;
      return '';
    }

    const value = String(field);
    if (value.indexOf('org.mozilla.javascript.') === 0) return '';
    return value;
  };

  const normalizeStatus = (status) => {
    const raw = (status || '').toString().toLowerCase();
    if (raw.includes('confirm') || raw.includes('approve')) return 'confirmed';
    if (raw.includes('cancel') || raw.includes('reject')) return 'cancelled';
    return 'pending';
  };

  const formatDate = (raw) => {
    if (!raw) return '--';
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return raw;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getBookingVaccine = (booking) => {
    return (extractValue(booking.vaccine_type) || '').toString();
  };

  const getAssignDate = (booking) => {
    const override = assignedDates[booking.sys_id];
    if (override) return override;
    return (
      extractValue(booking.first_dose_date) ||
      extractValue(booking.preferred_date) ||
      extractValue(booking.assigned_date) ||
      ''
    );
  };

  const getInitials = (name) => {
    const value = (name || '').toString().trim();
    if (!value) return 'PT';
    const parts = value.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0] || ''}${parts[1][0] || ''}`.toUpperCase();
  };

  const pendingBookings = bookings.filter(
    (booking) => normalizeStatus(extractValue(booking.booking_status)) === 'pending'
  );
  const approvedBookings = bookings.filter(
    (booking) => normalizeStatus(extractValue(booking.booking_status)) === 'confirmed'
  );
  const rejectedBookings = bookings.filter(
    (booking) => normalizeStatus(extractValue(booking.booking_status)) === 'cancelled'
  );

  const pendingCovid = pendingBookings.filter((booking) =>
    getBookingVaccine(booking).toLowerCase().includes('covid')
  );
  const pendingFlu = pendingBookings.filter((booking) =>
    getBookingVaccine(booking).toLowerCase().includes('flu')
  );
  const pendingOther = pendingBookings.filter((booking) => {
    const vaccine = getBookingVaccine(booking).toLowerCase();
    return !vaccine.includes('covid') && !vaccine.includes('flu');
  });

  const filteredPendingBookings = (() => {
    if (activeFilter === 'covid') return pendingCovid;
    if (activeFilter === 'flu') return pendingFlu;
    if (activeFilter === 'other') return pendingOther;
    return pendingBookings;
  })();

  const reviewBooking = async (booking, nextStatus) => {
    try {
      setUpdatingId(booking.sys_id);

      const assignDate = getAssignDate(booking);

      const response = await fetch('/api/x_2009786_vaccinat/v1/ebakuna_auth/review-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          bookingSysId: booking.sys_id,
          status: nextStatus,
          assignedDate: nextStatus === 'confirmed' ? assignDate : ''
        })
      });

      const payload = await response.json();
      if (!response.ok || payload.status !== 'success') {
        throw new Error(payload.error || 'Failed to update booking');
      }

      await loadBookings();
    } catch (error) {
      console.error('Error updating booking review:', error);
      alert(error.message || 'Failed to update booking');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading staff dashboard...</p>
      </div>
    );
  }

  return (
    <div className="staff-dashboard">
      <header className="staff-topbar">
        <div className="staff-identity">
          <span className="staff-avatar">{getInitials(`${user?.first_name || ''} ${user?.last_name || ''}`)}</span>
          <div>
            <h1>{`${user?.first_name || 'Clinic'} ${user?.last_name || 'Staff'} · CHO Cebu`}</h1>
            <p>Clinic Staff Dashboard · Booking Review & Approval</p>
          </div>
        </div>
        <div className="staff-topbar-actions">
          <span className="staff-chip">Staff · On Duty</span>
          {!hideLogout && <button className="staff-logout" onClick={onLogout}>Logout</button>}
        </div>
      </header>

      <section className="staff-kpi-grid">
        <article className="staff-kpi-card">
          <strong>{pendingBookings.length}</strong>
          <span>Pending Review</span>
          <em>Action needed</em>
        </article>
        <article className="staff-kpi-card">
          <strong>{approvedBookings.length}</strong>
          <span>Approved Today</span>
          <em>+{Math.max(1, Math.ceil(approvedBookings.length / 4))} this hour</em>
        </article>
        <article className="staff-kpi-card">
          <strong>{rejectedBookings.length}</strong>
          <span>Rejected Today</span>
          <em>
            {bookings.length
              ? `${((rejectedBookings.length / bookings.length) * 100).toFixed(1)}% reject rate`
              : '0% reject rate'}
          </em>
        </article>
        <article className="staff-kpi-card">
          <strong>{approvedBookings.length}</strong>
          <span>Scheduled Today</span>
          <em>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</em>
        </article>
      </section>

      <div className="container">
        <section className="staff-pending-panel">
          <div className="staff-panel-header">
            <h2>Pending Booking Requests</h2>
            <button className="staff-filter-btn" type="button">Filter</button>
          </div>

          <div className="staff-filter-chips">
            <button
              type="button"
              className={`chip ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All ({pendingBookings.length})
            </button>
            <button
              type="button"
              className={`chip ${activeFilter === 'covid' ? 'active' : ''}`}
              onClick={() => setActiveFilter('covid')}
            >
              COVID-19 ({pendingCovid.length})
            </button>
            <button
              type="button"
              className={`chip ${activeFilter === 'flu' ? 'active' : ''}`}
              onClick={() => setActiveFilter('flu')}
            >
              Flu ({pendingFlu.length})
            </button>
            <button
              type="button"
              className={`chip ${activeFilter === 'other' ? 'active' : ''}`}
              onClick={() => setActiveFilter('other')}
            >
              Others ({pendingOther.length})
            </button>
          </div>

          <div className="pending-card-list">
            {filteredPendingBookings.length === 0 ? (
              <div className="empty-state">No pending bookings for this filter.</div>
            ) : (
              filteredPendingBookings.map((booking) => {
                const citizenName = extractValue(booking.citizen_name) || 'Unknown Citizen';
                const vaccine = extractValue(booking.vaccine_type) || 'N/A';
                const preferredDate = formatDate(
                  extractValue(booking.first_dose_date) || extractValue(booking.preferred_date)
                );
                const reference = extractValue(booking.booking_reference) || '--';
                const dob = formatDate(extractValue(booking.date_of_birth));
                const contact = extractValue(booking.contact_number) || '--';
                const note = extractValue(booking.special_requirements) || 'No allergies declared';
                const dateValue = getAssignDate(booking);

                return (
                  <article key={booking.sys_id} className="pending-card">
                    <div className="pending-left">
                      <span className="pending-avatar">{getInitials(citizenName)}</span>
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
                            setAssignedDates((prev) => ({ ...prev, [booking.sys_id]: value }));
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
        </section>

        <section className="staff-bottom-grid">
          <div className="bottom-panel">
            <h2>Recently Processed</h2>
            <table className="processed-table">
              <thead>
                <tr>
                  <th>Citizen</th>
                  <th>Vaccine</th>
                  <th>Assigned</th>
                  <th>Decision</th>
                </tr>
              </thead>
              <tbody>
                {bookings
                  .filter((booking) => normalizeStatus(extractValue(booking.booking_status)) !== 'pending')
                  .slice(0, 5)
                  .map((booking) => {
                    const status = normalizeStatus(extractValue(booking.booking_status));
                    return (
                      <tr key={booking.sys_id}>
                        <td>{extractValue(booking.citizen_name) || '--'}</td>
                        <td>{extractValue(booking.vaccine_type) || '--'}</td>
                        <td>{formatDate(extractValue(booking.first_dose_date) || extractValue(booking.assigned_date))}</td>
                        <td>
                          <span className={`status-badge status-${status}`}>
                            {status === 'confirmed' ? 'Approved' : 'Rejected'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className="bottom-panel">
            <h2>Today's Schedule</h2>
            <div className="today-schedule-list">
              {approvedBookings.slice(0, 5).map((booking, index) => {
                const hour = 9 + index;
                const hourLabel = `${hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
                const citizenName = extractValue(booking.citizen_name) || 'Citizen';
                const vaccine = extractValue(booking.vaccine_type) || 'Vaccine';
                return (
                  <div key={booking.sys_id} className="schedule-row">
                    <span className="schedule-time">{hourLabel}</span>
                    <div>
                      <strong>{citizenName}</strong>
                      <p>{vaccine}</p>
                    </div>
                  </div>
                );
              })}

              {approvedBookings.length === 0 && (
                <div className="empty-state">No approved bookings scheduled yet.</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
