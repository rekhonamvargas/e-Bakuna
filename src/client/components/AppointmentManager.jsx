import React, { useState, useEffect } from 'react'

export default function AppointmentManager({ ebakunaService, onDataChange }) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      const data = await ebakunaService.getAppointments()
      setAppointments(data)
    } catch (error) {
      console.error('Error loading appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="manager-loading">
        <div className="loading-spinner"></div>
        <p>Loading appointments...</p>
      </div>
    )
  }

  return (
    <div className="appointment-manager">
      <div className="manager-header">
        <h2>📅 Appointment Management</h2>
        <button className="btn btn-primary">
          + Schedule New Appointment
        </button>
      </div>

      <div className="appointments-grid">
        {appointments.length > 0 ? (
          appointments.map(appointment => (
            <div key={appointment.sys_id?.value || appointment.sys_id} className="appointment-card card">
              <div className="card-content">
                <h3>{appointment.full_name?.display_value || appointment.full_name}</h3>
                <p>📞 {appointment.phone?.display_value || appointment.phone}</p>
                <p>🏥 {appointment.clinic?.display_value || 'No clinic assigned'}</p>
                <p>💉 {appointment.vaccine_type?.display_value || 'No vaccine selected'}</p>
                <p>📊 Status: {appointment.status?.display_value || appointment.status}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>📋 No appointments found</p>
            <button className="btn btn-secondary">Create First Appointment</button>
          </div>
        )}
      </div>
    </div>
  )
}