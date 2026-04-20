import React, { useState, useEffect } from 'react';
import { EBakunaService } from '../services/EBakunaService.js';
import './StaffDashboard.css';

export default function StaffDashboard({ user, onLogout }) {
  const [todayStats, setTodayStats] = useState({
    todayAppointments: 0,
    completed: 0,
    noShows: 0
  });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingAppointment, setUpdatingAppointment] = useState(null);

  const ebakunaService = new EBakunaService();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Get staff's assigned clinic (assuming it's stored in user data)
      const staffClinicId = user.assigned_clinic; // You may need to adjust this based on your user model
      
      const [statsData, appointmentsData] = await Promise.all([
        ebakunaService.getTodayStats(staffClinicId),
        getTodayAppointments(staffClinicId)
      ]);

      setTodayStats(statsData);
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTodayAppointments = async (clinicId) => {
    const today = new Date().toISOString().split('T')[0];
    let query = `schedule.start_date_timeSTARTSWITH${today}`;
    
    if (clinicId) {
      query += `^schedule.clinic=${clinicId}`;
    }

    return await ebakunaService.getAppointments({
      sysparm_query: query,
      sysparm_display_value: 'all',
      sysparm_fields: 'reference_number,citizen.first_name,citizen.last_name,schedule.vaccine_brand,dose_number,schedule.start_date_time,check_in_time,status,sys_id'
    });
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      setUpdatingAppointment(appointmentId);
      
      await ebakunaService.updateAppointment(appointmentId, {
        status: newStatus,
        check_in_time: newStatus === 'Confirmed' ? new Date().toISOString() : undefined
      });

      // If completed, show medical record form
      if (newStatus === 'Completed') {
        showMedicalRecordForm(appointmentId);
      }

      // Refresh data
      await loadData();
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update appointment status');
    } finally {
      setUpdatingAppointment(null);
    }
  };

  const showMedicalRecordForm = (appointmentId) => {
    // Simple prompt for medical record data
    const symptoms = prompt('Post-vaccination symptoms (optional):') || '';
    const adverseReaction = confirm('Any adverse reactions?');
    const batchNumber = prompt('Vaccine batch number:') || '';
    const vaccinationSite = prompt('Vaccination site (Left Arm/Right Arm):') || 'Left Arm';
    const followUpDate = prompt('Follow-up date (YYYY-MM-DD):') || '';

    if (batchNumber) {
      ebakunaService.updateMedicalRecord(appointmentId, {
        post_vaccination_symptoms: symptoms,
        adverse_reaction: adverseReaction,
        vaccine_batch_number: batchNumber,
        vaccination_site: vaccinationSite,
        follow_up_date: followUpDate
      }).catch(error => {
        console.error('Error updating medical record:', error);
      });
    }
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

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const extractValue = (field) => {
    return typeof field === 'object' ? field.display_value : field;
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
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <div className="navbar-brand">E-Bakuna — Staff Portal</div>
            <div className="navbar-actions">
              <span className="user-name">
                {user.first_name} {user.last_name}
              </span>
              <button className="btn-logout" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        {/* Today's Summary */}
        <div className="summary-section">
          <h2 className="section-title">Today's Summary</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-value">{todayStats.todayAppointments}</div>
              <div className="stat-label">Today's Appointments</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{todayStats.completed}</div>
              <div className="stat-label">Completed</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">❌</div>
              <div className="stat-value">{todayStats.noShows}</div>
              <div className="stat-label">No-shows</div>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="appointments-section">
          <div className="card">
            <div className="section-header">
              <h2>Today's Appointments</h2>
              <p>Manage appointment statuses and check-ins</p>
            </div>
            
            <div className="table-container">
              {appointments.length === 0 ? (
                <div className="empty-state">
                  <p>No appointments scheduled for today.</p>
                </div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Reference #</th>
                      <th>Citizen Name</th>
                      <th>Vaccine</th>
                      <th>Dose</th>
                      <th>Schedule Time</th>
                      <th>Check-in Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(appointment => (
                      <tr key={appointment.sys_id}>
                        <td className="reference-cell">
                          {extractValue(appointment.reference_number)}
                        </td>
                        <td>
                          {extractValue(appointment.citizen?.first_name)} {extractValue(appointment.citizen?.last_name)}
                        </td>
                        <td>
                          {extractValue(appointment.schedule?.vaccine_brand)}
                        </td>
                        <td>
                          {extractValue(appointment.dose_number)}
                        </td>
                        <td>
                          {formatTime(extractValue(appointment.schedule?.start_date_time))}
                        </td>
                        <td>
                          {formatTime(extractValue(appointment.check_in_time))}
                        </td>
                        <td>
                          <span className={`status-badge ${getStatusBadgeClass(extractValue(appointment.status))}`}>
                            {extractValue(appointment.status)}
                          </span>
                        </td>
                        <td>
                          <select
                            className="status-select"
                            value={extractValue(appointment.status)}
                            onChange={(e) => updateAppointmentStatus(appointment.sys_id, e.target.value)}
                            disabled={updatingAppointment === appointment.sys_id}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="No-show">No-show</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
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