import React, { useEffect, useMemo, useState } from 'react';
import { EBakunaService } from '../services/EBakunaService.js';
import './StaffDashboard.css';

export default function ProviderDashboard({ user, onLogout, hideLogout = false }) {
  const [clinics, setClinics] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const ebakunaService = useMemo(() => new EBakunaService(), []);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [clinicsData, schedulesData, bookingsData] = await Promise.all([
        ebakunaService.getClinics({ sysparm_limit: '100' }),
        ebakunaService.getSchedules({ sysparm_limit: '100' }),
        ebakunaService.getBookings({ sysparm_limit: '100' })
      ]);

      setClinics(clinicsData);
      setSchedules(schedulesData);
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error loading provider data:', error);
      setClinics([]);
      setSchedules([]);
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

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading provider dashboard...</p>
      </div>
    );
  }

  return (
    <div className="staff-dashboard">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <div className="navbar-brand">E-Bakuna - Provider Portal</div>
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

      <div className="container">
        <section className="role-overview provider-overview">
          <div className="role-overview-copy">
            <span className="role-overview-kicker">Provider Dashboard</span>
            <h2>Oversee the whole vaccination operation</h2>
            <p>
              Hospitals, RHUs, CHOs, and private clinics use this view to manage clinics, set schedules, and monitor
              booking records across the system.
            </p>
          </div>
          <div className="role-overview-grid">
            <div className="role-card">
              <strong>Manage clinics</strong>
              <span>Keep locations, contact details, and operating hours up to date.</span>
            </div>
            <div className="role-card">
              <strong>Set schedules</strong>
              <span>Create and maintain vaccination availability for each clinic.</span>
            </div>
            <div className="role-card">
              <strong>Oversee bookings</strong>
              <span>Review booking volume and track approved or pending requests.</span>
            </div>
          </div>
        </section>

        <div className="summary-section">
          <h2 className="section-title">Provider Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🏥</div>
              <div className="stat-value">{clinics.length}</div>
              <div className="stat-label">Clinics</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-value">{schedules.length}</div>
              <div className="stat-label">Schedules</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-value">{bookings.length}</div>
              <div className="stat-label">Booking Records</div>
            </div>
          </div>
        </div>

        <div className="appointments-section">
          <div className="card">
            <div className="section-header">
              <h2>Booking Records</h2>
              <p>Provider oversight for all pending, approved, and cancelled bookings.</p>
            </div>
            <div className="table-container">
              {bookings.length === 0 ? (
                <div className="empty-state">
                  <p>No booking records found.</p>
                </div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Reference #</th>
                      <th>Citizen</th>
                      <th>Barangay</th>
                      <th>Vaccine</th>
                      <th>Status</th>
                      <th>Schedule</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.sys_id}>
                        <td className="reference-cell">{extractValue(booking.booking_reference)}</td>
                        <td>{extractValue(booking.citizen_name)}</td>
                        <td>{extractValue(booking.barangay)}</td>
                        <td>{extractValue(booking.vaccine_type) || 'N/A'}</td>
                        <td>{extractValue(booking.booking_status)}</td>
                        <td>{extractValue(booking.clinic_schedule) || 'Unassigned'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <div className="appointments-section">
          <div className="card">
            <div className="section-header">
              <h2>Clinics and Schedules</h2>
              <p>Manage facilities, operating hours, and vaccination schedules.</p>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Clinic</th>
                    <th>Barangay</th>
                    <th>Schedules</th>
                  </tr>
                </thead>
                <tbody>
                  {clinics.map((clinic) => (
                    <tr key={clinic.sys_id}>
                      <td>{extractValue(clinic.name)}</td>
                      <td>{extractValue(clinic.barangay)}</td>
                      <td>{schedules.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}