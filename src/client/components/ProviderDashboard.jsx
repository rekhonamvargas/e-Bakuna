import React, { useEffect, useMemo, useState } from 'react';
import { EBakunaService } from '../services/EBakunaService.js';
import './ProviderDashboard.css';

export default function ProviderDashboard({ user, onLogout, hideLogout = false, hideHeader = false }) {
  const normalizedRoles = Array.isArray(user?.roles)
    ? user.roles.map((r) => (r || '').toString().toLowerCase())
    : [];
  const normalizedDescription = (user?.description || '').toString().toLowerCase();
  const isProvider = normalizedRoles.some((r) => r.includes('provider')) || normalizedDescription.includes('provider');

  if (user && !isProvider) {
    return (
      <div className="provider-dashboard" style={{ padding: '40px' }}>
        <div className="error-box">Access denied: Provider dashboard only.</div>
      </div>
    );
  }

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

  const extractDate = (record) => {
    return (
      extractValue(record.preferred_date) ||
      extractValue(record.appointment_date) ||
      extractValue(record.clinic_schedule_date) ||
      ''
    );
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

  const dayLabel = (date) =>
    date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();

  const vaccineTotals = ['COVID-19', 'Flu', 'Hepatitis B', 'Pneumo', 'MMR'].map((name) => {
    const count = bookings.filter((booking) => {
      const vaccine = extractValue(booking.vaccine_type).toString().toLowerCase();
      return vaccine.includes(name.toLowerCase());
    }).length;
    return { name, count };
  });

  const totalBookings = bookings.length;
  const vaccinated = bookings.filter((booking) => {
    const status = extractValue(booking.booking_status).toString().toLowerCase();
    return status.includes('approved') || status.includes('completed') || status.includes('vaccinated');
  }).length;
  const pendingReview = bookings.filter((booking) => {
    const status = extractValue(booking.booking_status).toString().toLowerCase();
    return status.includes('pending') || status.includes('review');
  }).length;

  const next7DayOffsets = Array.from({ length: 7 }, (_, index) => index);

  const buildDateFromOffset = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date;
  };

  const slotsByDate = schedules.reduce((acc, schedule) => {
    const raw =
      extractValue(schedule.schedule_date) ||
      extractValue(schedule.date) ||
      extractValue(schedule.clinic_date) ||
      extractValue(schedule.available_date);
    if (!raw) return acc;
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return acc;
    const key = date.toISOString().slice(0, 10);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const maxVaccineCount = Math.max(...vaccineTotals.map((item) => item.count), 1);

  const bookingRows = bookings.slice(0, 6);

  const providerName = [user?.first_name, user?.last_name].filter(Boolean).join(' ') || 'Provider';

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading provider dashboard...</p>
      </div>
    );
  }

  return (
    <div className="provider-dashboard">
      <header className="provider-topbar">
        <div className="provider-brand">
          <span className="provider-logo">+</span>
          <div>
            <h1>Cebu City Health Office</h1>
            <p>Provider Dashboard · Vaccination Management System</p>
          </div>
        </div>
        <div className="provider-topbar-actions">
          <span className="provider-chip">CHO · Cebu</span>
          {!hideLogout && (
            <button className="provider-logout" onClick={onLogout}>Logout</button>
          )}
        </div>
      </header>

      <section className="provider-kpi-grid">
        <article className="provider-kpi-card">
          <strong>{totalBookings.toLocaleString()}</strong>
          <span>Total Bookings</span>
        </article>
        <article className="provider-kpi-card">
          <strong>{vaccinated.toLocaleString()}</strong>
          <span>Vaccinated</span>
        </article>
        <article className="provider-kpi-card">
          <strong>{pendingReview.toLocaleString()}</strong>
          <span>Pending Review</span>
        </article>
        <article className="provider-kpi-card">
          <strong>{schedules.length.toLocaleString()}</strong>
          <span>Active Schedules</span>
        </article>
      </section>

      <section className="provider-main-grid">
        <div className="provider-panel">
          <div className="provider-panel-title-row">
            <h2>Schedule Management</h2>
            {!hideHeader && <span className="provider-user-name">{providerName}</span>}
          </div>
          <div className="provider-days-grid">
            {next7DayOffsets.map((offset) => {
              const date = buildDateFromOffset(offset);
              const key = date.toISOString().slice(0, 10);
              const slots = slotsByDate[key] || 0;
              return (
                <div key={key} className={`provider-day-card ${slots > 0 ? 'active' : ''}`}>
                  <small>{dayLabel(date)}</small>
                  <strong>{date.getDate()}</strong>
                  <span>{slots > 0 ? `${slots} slots` : 'Closed'}</span>
                </div>
              );
            })}
          </div>
          <div className="provider-tags-row">
            {vaccineTotals.map((item) => (
              <span key={item.name} className="provider-tag">{item.name}</span>
            ))}
          </div>
        </div>

        <div className="provider-panel">
          <h2>Bookings by Vaccine</h2>
          <div className="provider-vaccine-list">
            {vaccineTotals.map((item) => (
              <div key={item.name} className="provider-vaccine-row">
                <span>{item.name}</span>
                <div className="provider-vaccine-bar-track">
                  <div
                    className="provider-vaccine-bar-fill"
                    style={{ width: `${(item.count / maxVaccineCount) * 100}%` }}
                  />
                </div>
                <strong>{item.count}</strong>
              </div>
            ))}
          </div>

          <h3>Notifications</h3>
          <ul className="provider-notifications">
            <li>{pendingReview} pending bookings require staff review.</li>
            <li>{clinics.length} clinics are currently active in this account.</li>
            <li>{schedules.length} schedules are visible in the next service window.</li>
          </ul>
        </div>
      </section>

      <section className="provider-table-panel">
        <div className="provider-panel-title-row">
          <h2>All Booking Records</h2>
        </div>
        <div className="provider-table-wrap">
          {bookingRows.length === 0 ? (
            <p className="provider-empty">No booking records found.</p>
          ) : (
            <table className="provider-table">
              <thead>
                <tr>
                  <th>Reference No.</th>
                  <th>Citizen</th>
                  <th>Vaccine</th>
                  <th>Preferred Date</th>
                  <th>Assigned Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookingRows.map((booking) => {
                  const status = extractValue(booking.booking_status) || 'Pending';
                  return (
                    <tr key={booking.sys_id}>
                      <td className="reference-cell">{extractValue(booking.booking_reference) || '--'}</td>
                      <td>{extractValue(booking.citizen_name) || '--'}</td>
                      <td>{extractValue(booking.vaccine_type) || 'N/A'}</td>
                      <td>{formatDate(extractDate(booking))}</td>
                      <td>{formatDate(extractValue(booking.assigned_date) || extractValue(booking.clinic_schedule))}</td>
                      <td>
                        <span className={`provider-status ${status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}