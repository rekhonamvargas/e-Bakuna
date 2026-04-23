import React, { useState, useEffect } from 'react'
import './MyAppointments.css'

const css = {
  page: { minHeight: '100vh', background: 'linear-gradient(180deg, #fafafa 0%, #f5f1f1 100%)', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#1a0505' },
  topbar: { background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #e53935 100%)', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, boxShadow: '0 8px 32px rgba(220,38,38,0.25)' },
  topTitle: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '0.5px' },
  backBtn: { background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: 8, padding: '8px 18px', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, marginRight: 16, transition: 'all 0.2s' },
  chip: { background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 24, padding: '8px 16px', fontSize: 13, color: '#fff', fontWeight: 600 },
  logoutBtn: { background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: 8, padding: '8px 18px', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 },
  content: { padding: '40px' },
  title: { fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#8b0000', margin: '0 0 28px', letterSpacing: '0.5px' },
  tabs: { display: 'flex', gap: 12, marginBottom: 28, borderRadius: 12, overflow: 'hidden', border: '2px solid rgba(220,38,38,0.1)', background: '#fff' },
  tab: (a) => ({ flex: 1, padding: '14px 0', textAlign: 'center', background: a ? 'linear-gradient(135deg, #dc2626, #c0272d)' : '#fff', color: a ? '#fff' : '#7a3a3a', cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all 0.3s', letterSpacing: '0.3px' }),
  searchRow: { display: 'flex', gap: 14, marginBottom: 28 },
  searchInput: { flex: 1, padding: '14px 18px', border: '2px solid rgba(220,38,38,0.15)', borderRadius: 12, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  searchBtn: { padding: '14px 32px', background: 'linear-gradient(135deg, #dc2626, #991b1b)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(220,38,38,0.25)', transition: 'all 0.3s' },
  apptCard: { background: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: '0 4px 16px rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.05)', transition: 'all 0.3s', cursor: 'pointer' },
  apptRow: { display: 'flex', gap: 18, alignItems: 'center' },
  apptDate: { width: 68, height: 68, background: 'linear-gradient(135deg, #fff0f0, #ffe8e8)', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid #e8c0c0', boxShadow: '0 2px 8px rgba(220,38,38,0.1)' },
  apptDay: { fontSize: 26, fontWeight: 700, color: '#c0272d', lineHeight: 1 },
  apptMonth: { fontSize: 11, textTransform: 'uppercase', color: '#8b5a5a', fontWeight: 600, marginTop: 2 },
  apptInfo: { flex: 1 },
  apptRef: { fontSize: 12, color: '#8b5a5a', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' },
  apptVaccine: { fontSize: 16, fontWeight: 700, color: '#2a0a0a', marginBottom: 6 },
  apptClinic: { fontSize: 14, color: '#7a3a3a', fontWeight: 500 },
  apptStatus: (s) => ({ padding: '8px 16px', borderRadius: 16, fontSize: 13, fontWeight: 700, background: s === 'completed' || s === 'approved' ? '#e8f5e9' : s === 'pending' || s === 'review' ? '#fff8e1' : '#ffebee', color: s === 'completed' || s === 'approved' ? '#1b5e20' : s === 'pending' || s === 'review' ? '#d97706' : '#b71c1c' }),
  empty: { textAlign: 'center', padding: '60px 0', color: '#9a4a4a', fontSize: 16, fontWeight: 500 },
}

function formatDate(d) {
  if (!d) return { day: '--', month: '---' }
  const date = new Date(d)
  if (isNaN(date)) return { day: '--', month: '---' }
  return { day: date.getDate(), month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase() }
}

function getStatusLabel(status = '') {
  const s = status.toLowerCase()
  if (s.includes('approve') || s.includes('confirm')) return 'Approved'
  if (s.includes('complete') || s.includes('done') || s.includes('vaccinat')) return 'Completed'
  if (s.includes('review')) return 'Under Review'
  if (s.includes('reject') || s.includes('cancel')) return 'Cancelled'
  return 'Submitted'
}

export default function MyAppointments({ user, onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      const saved = JSON.parse(localStorage.getItem('ebakuna_bookings') || '[]')
      setBookings(saved)
    } catch (e) {
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  const upcoming = bookings.filter(b => {
    const status = (b.status || '').toLowerCase()
    return !status.includes('complete') && !status.includes('cancelled') && !status.includes('done')
  })

  const past = bookings.filter(b => {
    const status = (b.status || '').toLowerCase()
    return status.includes('complete') || status.includes('cancelled') || status.includes('done')
  })

  const filtered = activeTab === 'upcoming' ? upcoming : past

  const handleTrack = () => {
    const found = bookings.find(b => b.referenceNumber === filter)
    if (found) {
      onNavigate('appointment-detail', found)
    }
  }

  return (
    <div style={css.page}>
      <header style={css.topbar}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button style={css.backBtn} onClick={() => onNavigate('citizen-home')}>← Back</button>
          <h1 style={css.topTitle}>My Appointments</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={css.chip}>Citizen</span>
          <button style={css.logoutBtn} onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div style={css.content}>
        <h2 style={css.title}>My Appointments</h2>

        <div style={css.searchRow}>
          <input
            style={css.searchInput}
            placeholder="Enter reference number (e.g. EBK-ABC123)"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          <button style={css.searchBtn} onClick={handleTrack}>Track</button>
        </div>

        <div style={css.tabs}>
          <div style={css.tab(activeTab === 'upcoming')} onClick={() => setActiveTab('upcoming')}>
            Upcoming ({upcoming.length})
          </div>
          <div style={css.tab(activeTab === 'past')} onClick={() => setActiveTab('past')}>
            Past ({past.length})
          </div>
        </div>

        {loading ? (
          <p style={css.empty}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p style={css.empty}>
            {activeTab === 'upcoming' ? 'No upcoming appointments' : 'No past appointments'}
          </p>
        ) : (
          filtered.map((b, i) => {
            const fd = formatDate(b.preferredDate)
            return (
              <div key={i} style={css.apptCard} onClick={() => onNavigate('appointment-detail', b)}>
                <div style={css.apptRow}>
                  <div style={css.apptDate}>
                    <span style={css.apptDay}>{fd.day}</span>
                    <span style={css.apptMonth}>{fd.month}</span>
                  </div>
                  <div style={css.apptInfo}>
                    <div style={css.apptRef}>Ref: {b.referenceNumber}</div>
                    <div style={css.apptVaccine}>{b.vaccineType}</div>
                    <div style={css.apptClinic}>{b.healthUnit}</div>
                  </div>
                  <span style={css.apptStatus(b.status)}>{getStatusLabel(b.status)}</span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}