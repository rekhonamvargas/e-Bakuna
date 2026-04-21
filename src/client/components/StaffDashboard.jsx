import React, { useEffect, useMemo, useState } from 'react';
import { EBakunaService } from '../services/EBakunaService.js';
import './StaffDashboard.css';

export default function StaffDashboard({ user, onLogout, hideLogout = false }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [assignedDates, setAssignedDates] = useState({});
  const [updatingId, setUpdatingId] = useState(null);

  const svc = useMemo(() => new EBakunaService(), []);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await svc.getBookings({
        sysparm_query: 'booking_status=pending',
        sysparm_limit: '100'
      });
      setBookings(data || []);
    } catch (e) {
      console.error(e);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const extract = (f) =>
    f && typeof f === 'object' ? f.display_value || f.value || '' : f || '';

  const formatDate = (d) => {
    if (!d) return '--';
    const date = new Date(d);
    return isNaN(date)
      ? d
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getInitials = (name) => {
    if (!name) return 'PT';
    const parts = name.split(' ');
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
  };

  const filtered = bookings;

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="staff-dashboard">

      {/* TOPBAR */}
      <header className="staff-topbar">
        <h1>Staff Dashboard</h1>
        {!hideLogout && <button onClick={onLogout}>Logout</button>}
      </header>

      {/* CONTENT */}
      <div className="container">

        <section className="staff-pending-panel">

          {/* HEADER */}
          <div className="staff-panel-header">
            <h2>Pending Booking Requests</h2>
          </div>

          {/* FILTERS */}
          <div className="staff-filter-chips">
            <button
              className={activeFilter === 'all' ? 'active' : ''}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
          </div>

          {/* ✅ SCROLLABLE LIST */}
          <div className="pending-card-list">
            {filtered.length === 0 ? (
              <div className="empty-state">No pending bookings.</div>
            ) : (
              filtered.map((b) => {
                const name = extract(b.citizen_name) || 'Unknown';

                return (
                  <div key={b.sys_id} className="pending-card">
                    <div className="pending-left">
                      <div className="pending-avatar">
                        {getInitials(name)}
                      </div>
                      <div>
                        <h3>{name}</h3>
                        <p>
                          {extract(b.vaccine_type)} ·{' '}
                          {formatDate(extract(b.preferred_date))}
                        </p>
                      </div>
                    </div>

                    <div className="pending-actions">
                      <input
                        type="date"
                        value={assignedDates[b.sys_id] || ''}
                        onChange={(e) =>
                          setAssignedDates((p) => ({
                            ...p,
                            [b.sys_id]: e.target.value
                          }))
                        }
                      />

                      <button
                        onClick={() => alert('Approved')}
                        disabled={updatingId === b.sys_id}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => alert('Rejected')}
                        disabled={updatingId === b.sys_id}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </section>

      </div>
    </div>
  );
}