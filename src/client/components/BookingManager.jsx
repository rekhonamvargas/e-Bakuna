import React, { useState, useEffect } from 'react'

export default function BookingManager({ ebakunaService, onDataChange }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      setLoading(true)
      const data = await ebakunaService.getBookings()
      setBookings(data)
    } catch (error) {
      console.error('Error loading bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="manager-loading">
        <div className="loading-spinner"></div>
        <p>Loading citizen bookings...</p>
      </div>
    )
  }

  return (
    <div className="booking-manager">
      <div className="manager-header">
        <h2>📝 Citizen Booking Management</h2>
        <button className="btn btn-primary">
          + Register New Citizen
        </button>
      </div>

      <div className="bookings-grid">
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <div key={booking.sys_id?.value || booking.sys_id} className="booking-card card">
              <div className="card-content">
                <h3>{booking.citizen_name?.display_value || booking.citizen_name}</h3>
                <p>📞 {booking.contact_number?.display_value || booking.contact_number}</p>
                <p>📍 {booking.barangay?.display_value || booking.barangay}</p>
                <p>💉 Dose: {booking.dose_number?.display_value || booking.dose_number}</p>
                <p>📊 Status: {booking.booking_status?.display_value || booking.booking_status}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>📋 No citizen bookings found</p>
            <button className="btn btn-secondary">Register First Citizen</button>
          </div>
        )}
      </div>
    </div>
  )
}