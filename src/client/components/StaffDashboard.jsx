<div className="staff-pending-panel">
  <div className="staff-panel-header">
    <h2>Pending Booking Requests</h2>
  </div>

  <div className="staff-filter-chips">
    {/* filters here */}
  </div>

  {/* ✅ SCROLL AREA ONLY */}
  <div className="pending-scroll-wrapper">
    <div className="pending-card-list">
      {filteredPendingBookings.length === 0 ? (
        <div className="empty-state">No pending bookings for this filter.</div>
      ) : (
        filteredPendingBookings.map((booking) => {
          const citizenName = extractValue(booking.citizen_name) || 'Unknown Citizen';
          const vaccine = extractValue(booking.vaccine_type) || 'N/A';
          const preferredDate = formatDate(
            extractValue(booking.first_dose_date) ||
            extractValue(booking.preferred_date)
          );
          const reference = extractValue(booking.booking_reference) || '--';
          const dob = formatDate(extractValue(booking.date_of_birth));
          const contact = extractValue(booking.contact_number) || '--';
          const note = extractValue(booking.special_requirements) || 'No allergies declared';
          const dateValue = getAssignDate(booking);

          return (
            <article key={booking.sys_id} className="pending-card">
              <div className="pending-left">
                <span className="pending-avatar">
                  {getInitials(citizenName)}
                </span>

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
                      setAssignedDates((prev) => ({
                        ...prev,
                        [booking.sys_id]: value
                      }));
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
  </div>
</div>