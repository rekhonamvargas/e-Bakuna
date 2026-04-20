import React, { useEffect, useMemo, useState } from 'react';
import { EBakunaService } from '../services/EBakunaService.js';
import './StaffDashboard.css';

export default function StaffDashboard({ user, onLogout, hideLogout = false, hideHeader = false }) {
  const normalizedRoles = Array.isArray(user?.roles)
    ? user.roles.map((r) => (r || '').toString().toLowerCase())
    : [];
  const normalizedDescription = (user?.description || '').toString().toLowerCase();
  const isStaff = normalizedRoles.some((r) => r.includes('staff') || r.includes('clinic_staff')) || normalizedDescription.includes('staff');

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
    if (field && typeof field === 'object') {
      return field.display_value || field.value || '';
    }
    return field || '';
  };

  const pendingBookings = bookings.filter((booking) => extractValue(booking.booking_status) === 'pending');
  const approvedBookings = bookings.filter((booking) => extractValue(booking.booking_status) === 'confirmed');

  const reviewBooking = async (booking, nextStatus) => {
    try {
      setUpdatingId(booking.sys_id);

      let clinicSchedule = extractValue(booking.clinic_schedule);
      if (nextStatus === 'confirmed' && !clinicSchedule) {
        clinicSchedule = prompt('Enter clinic schedule sys_id for this approval (optional):') || '';
      }

      await ebakunaService.updateBooking(booking.sys_id, {
        booking_status: nextStatus,
        ...(clinicSchedule ? { clinic_schedule: clinicSchedule } : {})
      });

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
      {!hideHeader && (
        <nav className="navbar">
          <div className="container">
            <div className="navbar-content">
              <div className="navbar-brand">E-Bakuna - Clinic Staff Portal</div>
              <div className="navbar-actions">
                <span className="user-name">
                  {user.first_name} {user.last_name}
                </span>
                {!hideLogout && (
                  <button className="btn-logout" onClick={onLogout}>
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}

      <div className="container">
        <section className="role-overview staff-overview">
          <div className="role-overview-copy">
            <span className="role-overview-kicker">Clinic Staff Dashboard</span>
            <h2>Review incoming bookings and decide what happens next</h2>
            <p>
              This screen is for nurses and doctors onsite to review pending requests, approve or reject them,
              and assign the final schedule for approved appointments.
            </p>
          </div>
          <div className="role-overview-grid">
            <div className="role-card">
              <strong>Review</strong>
              <span>Check the citizen details and booking reference.</span>
            </div>
            <div className="role-card">
              <strong>Approve / Reject</strong>
              <span>Mark bookings based on clinic availability and verification.</span>
            </div>
            <div className="role-card">
              <strong>Assign schedule</strong>
              <span>Set the final clinic schedule for approved bookings.</span>
            </div>
          </div>
        </section>

        <div className="summary-section">
          <h2 className="section-title">Pending Bookings</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🕒</div>
              <div className="stat-value">{pendingBookings.length}</div>
              <div className="stat-label">Pending Review</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{approvedBookings.length}</div>
              <div className="stat-label">Approved</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📄</div>
              <div className="stat-value">{bookings.length}</div>
              <div className="stat-label">Total Bookings</div>
            </div>
          </div>
        </div>

        <div className="appointments-section">
          <div className="card">
            <div className="section-header">
              <h2>Review Requests</h2>
              <p>Verify booking details, approve or reject, and assign schedules for approved requests.</p>
            </div>

            <div className="table-container">
              {bookings.length === 0 ? (
                <div className="empty-state">
                  <p>No bookings available right now.</p>
                </div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Reference #</th>
                      <th>Citizen</th>
                      <th>Contact</th>
                      <th>Barangay</th>
                      <th>Vaccine</th>
                      <th>Dose</th>
                      <th>Status</th>
                      <th>Schedule</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.sys_id}>
                        <td className="reference-cell">{extractValue(booking.booking_reference)}</td>
                        <td>{extractValue(booking.citizen_name)}</td>
                        <td>{extractValue(booking.contact_number)}</td>
                        <td>{extractValue(booking.barangay)}</td>
                        <td>{extractValue(booking.vaccine_type) || 'N/A'}</td>
                        <td>{extractValue(booking.dose_number) || 'N/A'}</td>
                        <td>
                          <span className={`status-badge status-${extractValue(booking.booking_status)?.toLowerCase()}`}>
                            {extractValue(booking.booking_status)}
                          </span>
                        </td>
                        <td>{extractValue(booking.clinic_schedule) || 'Unassigned'}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}