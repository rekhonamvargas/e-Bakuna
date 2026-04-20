import React, { useState, useEffect } from 'react';
import { EBakunaService } from '../services/EBakunaService.js';
import BookingModal from './BookingModal.jsx';
import './CitizenDashboard.css';

export default function CitizenDashboard({ user, onLogout }) {
  const [stats, setStats] = useState({
    activeClinics: 0,
    citizensBooked: 0,
    vaccinesGiven: 0,
    remindersSent: 0
  });
  const [appointments, setAppointments] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const ebakunaService = new EBakunaService();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const [statsData, appointmentsData, schedulesData] = await Promise.all([
        ebakunaService.getStats(),
        ebakunaService.getAppointments({ 
          sysparm_query: `citizen=${user.sys_id}`,
          sysparm_fields: 'reference_number,schedule,dose_number,status,sys_created_on'
        }),
        ebakunaService.getSchedules({
          sysparm_query: 'status=Open^start_date_timeGREATERTHAN' + new Date().toISOString(),
          sysparm_fields: 'clinic,vaccine_brand,start_date_time,max_capacity,remaining_slots'
        })
      ]);

      setStats(statsData);
      setAppointments(appointmentsData);
      setSchedules(schedulesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (schedule) => {
    setSelectedSchedule(schedule);
    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingModal(false);
    setSelectedSchedule(null);
    loadData(); // Refresh data
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Confirmed': return 'status-confirmed';
      case 'Completed': return 'status-completed';
      case 'No-show': return 'status-no-show';
      case 'Cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const extractValue = (field) => {
    return typeof field === 'object' ? field.display_value : field;
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="citizen-dashboard">
      <div className="container">
        {/* Hero Banner */}
        <div className="hero-banner">
          <div className="hero-background"></div>
          <div className="hero-circles"></div>
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <div className="pulse-dot"></div>
                <span>🏥 Cebu City Health Office — E-Bakuna Portal</span>
              </div>
              <h1 className="hero-title">
                Professional Vaccination
                <br />
                <span className="hero-highlight">Appointment System</span>
              </h1>
              <p className="hero-subtitle">
                Schedule your free barangay pop-up clinic vaccination. Safe, professional 
                healthcare available for all Cebu City residents with qualified medical staff.
              </p>
              <div className="hero-buttons">
                <button className="btn-hero-primary">📅 Browse Schedules</button>
                <button className="btn-hero-secondary">🔍 My Appointments</button>
              </div>
            </div>
            <div className="hero-stats">
              <div className="hero-stat-label">Active Clinics Today</div>
              <div className="hero-stat-value">{stats.activeClinics}</div>
              <div className="hero-stat-subtitle">Across Cebu City districts</div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat-label">Available Slots</div>
              <div className="hero-stat-value-small">184</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏥</div>
            <div className="stat-value">{stats.activeClinics}</div>
            <div className="stat-label">Active Clinics</div>
            <div className="stat-change">↗ +3 opened this week</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-value">{stats.citizensBooked.toLocaleString()}</div>
            <div className="stat-label">Citizens Booked</div>
            <div className="stat-change">↗ +67 booked today</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">💉</div>
            <div className="stat-value">{stats.vaccinesGiven.toLocaleString()}</div>
            <div className="stat-label">Vaccines Given</div>
            <div className="stat-change">↗ +156 this week</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📱</div>
            <div className="stat-value">{stats.remindersSent}</div>
            <div className="stat-label">SMS Reminders</div>
            <div className="stat-change">Sent automatically</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* My Appointments Panel */}
          <div className="appointments-panel">
            <div className="card">
              <div className="section-header">
                <h2>📋 My Appointments</h2>
                <p>Track your vaccination appointments and status</p>
              </div>
              
              <div className="appointments-list">
                {appointments.length === 0 ? (
                  <div className="empty-state">
                    <p>No appointments found. Book your first vaccination schedule!</p>
                  </div>
                ) : (
                  appointments.map(appointment => (
                    <div key={appointment.sys_id} className="appointment-item">
                      <div className="appointment-ref">
                        {extractValue(appointment.reference_number)}
                      </div>
                      <div className="appointment-details">
                        <div className="appointment-clinic">
                          {extractValue(appointment.schedule?.clinic?.name) || 'N/A'}
                        </div>
                        <div className="appointment-info">
                          Dose {extractValue(appointment.dose_number)} • 
                          {formatDate(extractValue(appointment.schedule?.start_date_time))}
                        </div>
                      </div>
                      <div className={`status-badge ${getStatusBadgeClass(extractValue(appointment.status))}`}>
                        {extractValue(appointment.status)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Browse Schedules Panel */}
          <div className="schedules-panel">
            <div className="card">
              <div className="section-header">
                <div>
                  <h2>📍 Browse Schedules</h2>
                  <p>Click any schedule below to book your appointment slot</p>
                </div>
                <span className="available-badge">{schedules.length} Available</span>
              </div>
              
              <div className="schedules-list">
                {schedules.length === 0 ? (
                  <div className="empty-state">
                    <p>No schedules available. Please check back later.</p>
                  </div>
                ) : (
                  schedules.map(schedule => {
                    const scheduleDate = new Date(extractValue(schedule.start_date_time));
                    const remaining = extractValue(schedule.remaining_slots) || 0;
                    const maxCapacity = extractValue(schedule.max_capacity) || 1;
                    const filled = maxCapacity - remaining;
                    const fillPercentage = (filled / maxCapacity) * 100;

                    return (
                      <div 
                        key={schedule.sys_id} 
                        className="schedule-item"
                        onClick={() => handleBookNow(schedule)}
                      >
                        <div className="schedule-date">
                          <span className="schedule-month">
                            {scheduleDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                          </span>
                          <span className="schedule-day">
                            {scheduleDate.getDate()}
                          </span>
                        </div>
                        
                        <div className="schedule-details">
                          <div className="schedule-title">
                            {extractValue(schedule.clinic?.name)} — {extractValue(schedule.vaccine_brand)}
                          </div>
                          <div className="schedule-time">
                            {scheduleDate.toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              hour12: true 
                            })} · {extractValue(schedule.clinic?.barangay)}
                          </div>
                          <div className="schedule-progress">
                            <div 
                              className="schedule-progress-bar"
                              style={{ width: `${fillPercentage}%` }}
                            ></div>
                          </div>
                          <div className="schedule-slots">
                            {filled} / {maxCapacity} slots filled · {remaining} remaining
                          </div>
                        </div>
                        
                        <button className="schedule-book-btn">
                          Book Now →
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedSchedule && (
        <BookingModal 
          schedule={selectedSchedule}
          user={user}
          onClose={() => setShowBookingModal(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}