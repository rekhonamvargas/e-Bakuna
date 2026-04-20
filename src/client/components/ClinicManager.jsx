import React, { useState, useEffect } from 'react'

export default function ClinicManager({ ebakunaService, onDataChange }) {
  const [clinics, setClinics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadClinics()
  }, [])

  const loadClinics = async () => {
    try {
      setLoading(true)
      const data = await ebakunaService.getClinics()
      setClinics(data)
    } catch (error) {
      console.error('Error loading clinics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="manager-loading">
        <div className="loading-spinner"></div>
        <p>Loading vaccination clinics...</p>
      </div>
    )
  }

  return (
    <div className="clinic-manager">
      <div className="manager-header">
        <h2>🏥 Clinic Management</h2>
        <button className="btn btn-primary">
          + Add New Clinic
        </button>
      </div>

      <div className="clinics-grid">
        {clinics.length > 0 ? (
          clinics.map(clinic => (
            <div key={clinic.sys_id?.value || clinic.sys_id} className="clinic-card card">
              <div className="card-content">
                <h3>{clinic.name?.display_value || clinic.name}</h3>
                <p>📍 {clinic.location?.display_value || clinic.location}</p>
                <p>🏘️ {clinic.barangay?.display_value || clinic.barangay}</p>
                <p>👥 Capacity: {clinic.capacity?.display_value || clinic.capacity} per day</p>
                <p>⏰ {clinic.start_time?.display_value || '08:00'} - {clinic.end_time?.display_value || '17:00'}</p>
                <p>📞 {clinic.contact_number?.display_value || 'No contact'}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>🏥 No vaccination clinics found</p>
            <button className="btn btn-secondary">Add First Clinic</button>
          </div>
        )}
      </div>
    </div>
  )
}