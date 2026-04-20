import React, { useState, useEffect } from 'react';
import { EBakunaService } from '../services/EBakunaService.js';

export default function ProviderDashboard({ user, onLogout }) {
  const [clinics, setClinics] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showClinicModal, setShowClinicModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [expandedSchedule, setExpandedSchedule] = useState(null);

  const ebakunaService = new EBakunaService();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const [clinicsData, schedulesData] = await Promise.all([
        ebakunaService.getClinics({
          sysparm_query: `provider=${user.sys_id}`,
          sysparm_display_value: 'all'
        }),
        ebakunaService.getSchedules({
          sysparm_query: `clinic.provider=${user.sys_id}^start_date_timeGREATERTHAN${new Date().toISOString()}`,
          sysparm_display_value: 'all'
        })
      ]);

      setClinics(clinicsData);
      setSchedules(schedulesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const extractValue = (field) => {
    return typeof field === 'object' ? field.display_value : field;
  };

  const getSysId = (field) => {
    return typeof field === 'object' ? field.value : field;
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
    <div className="provider-dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <div className="navbar-brand">E-Bakuna — Provider Portal</div>
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
        <div className="two-column">
          {/* My Clinics Panel */}
          <div className="clinics-panel">
            <div className="card">
              <div className="section-header">
                <h2>🏥 My Clinics</h2>
                <p>Manage your clinic locations and settings</p>
              </div>
              
              <div className="clinics-list">
                {clinics.length === 0 ? (
                  <div className="empty-state">
                    <p>No clinics found. Add your first clinic!</p>
                  </div>
                ) : (
                  clinics.map(clinic => (
                    <div key={clinic.sys_id} className="clinic-card">
                      <div className="clinic-info">
                        <h3 className="clinic-name">{extractValue(clinic.name)}</h3>
                        <div className="clinic-details">
                          <div className="clinic-detail">
                            <span className="label">Barangay:</span>
                            <span className="value">{extractValue(clinic.barangay)}</span>
                          </div>
                          <div className="clinic-detail">
                            <span className="label">Type:</span>
                            <span className="value">{extractValue(clinic.clinic_type)}</span>
                          </div>
                          <div className="clinic-detail">
                            <span className="label">Contact:</span>
                            <span className="value">{extractValue(clinic.contact_number)}</span>
                          </div>
                          <div className="clinic-detail">
                            <span className="label">Hours:</span>
                            <span className="value">{extractValue(clinic.operating_hours)}</span>
                          </div>
                        </div>
                        <span className={`status-badge status-${extractValue(clinic.status)?.toLowerCase()}`}>
                          {extractValue(clinic.status)}
                        </span>
                      </div>
                      
                      <div className="clinic-actions">
                        <button 
                          className="btn-secondary"
                          onClick={() => {
                            setSelectedClinic(clinic);
                            setShowClinicModal(true);
                          }}
                        >
                          Edit Clinic
                        </button>
                        <button 
                          className="btn-primary"
                          onClick={() => {
                            setSelectedClinic(clinic);
                            setShowScheduleModal(true);
                          }}
                        >
                          Add Schedule
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Upcoming Schedules Panel */}
          <div className="schedules-panel">
            <div className="card">
              <div className="section-header">
                <h2>📅 Upcoming Schedules</h2>
                <p>View and manage your vaccination schedules</p>
              </div>
              
              <div className="schedules-list">
                {schedules.length === 0 ? (
                  <div className="empty-state">
                    <p>No upcoming schedules. Create your first schedule!</p>
                  </div>
                ) : (
                  schedules.map(schedule => (
                    <div key={schedule.sys_id} className="schedule-item">
                      <div 
                        className="schedule-header"
                        onClick={() => setExpandedSchedule(
                          expandedSchedule === schedule.sys_id ? null : schedule.sys_id
                        )}
                      >
                        <div className="schedule-info">
                          <div className="schedule-title">
                            {extractValue(schedule.clinic?.name)} — {extractValue(schedule.vaccine_brand)}
                          </div>
                          <div className="schedule-datetime">
                            {new Date(extractValue(schedule.start_date_time)).toLocaleString()}
                          </div>
                          <div className="schedule-capacity">
                            Capacity: {extractValue(schedule.max_capacity)} • 
                            Remaining: {extractValue(schedule.remaining_slots)}
                          </div>
                        </div>
                        <span className={`status-badge status-${extractValue(schedule.status)?.toLowerCase()}`}>
                          {extractValue(schedule.status)}
                        </span>
                      </div>
                      
                      {expandedSchedule === schedule.sys_id && (
                        <div className="schedule-details">
                          <p>Appointments for this schedule will appear here...</p>
                          {/* You can add appointment details here */}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals would go here - simplified for this demo */}
      {showClinicModal && (
        <div className="modal-overlay" onClick={() => setShowClinicModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Edit Clinic</h3>
            <p>Clinic editing form would go here...</p>
            <button onClick={() => setShowClinicModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showScheduleModal && (
        <div className="modal-overlay" onClick={() => setShowScheduleModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Add Schedule</h3>
            <p>Schedule creation form would go here...</p>
            <button onClick={() => setShowScheduleModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}