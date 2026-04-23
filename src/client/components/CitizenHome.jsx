import React, { useState, useEffect, useMemo } from 'react'
import './CitizenHome.css'

const css = {
  page: { minHeight: '100vh', background: 'linear-gradient(180deg, #fafafa 0%, #f5f1f1 100%)', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#1a0505' },
  topbar: { background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #e53935 100%)', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, boxShadow: '0 8px 32px rgba(220,38,38,0.25)' },
  topLeft: { display: 'flex', alignItems: 'center', gap: 18 },
  avatar: { width: 52, height: 52, borderRadius: '12px', background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
  topTitle: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '0.5px' },
  topSub: { fontSize: 13, color: 'rgba(255,255,255,0.9)', margin: '4px 0 0', fontWeight: 500 },
  chip: { background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 24, padding: '8px 16px', fontSize: 13, color: '#fff', fontWeight: 600 },
  logoutBtn: { background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: 8, padding: '8px 18px', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, transition: 'all 0.2s' },
  hero: { background: 'linear-gradient(135deg, #fff0f0 0%, #ffe8e8 50%, #fff0f0 100%)', padding: '60px 40px', textAlign: 'center', borderBottom: '2px solid rgba(220,38,38,0.1)' },
  heroTitle: { fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: '#8b0000', margin: '0 0 16px', letterSpacing: '0.5px' },
  heroSub: { fontSize: 18, color: '#6a3a3a', margin: '0 0 32px', fontWeight: 500, lineHeight: 1.6 },
  ctaRow: { display: 'flex', gap: 16, justifyContent: 'center' },
  ctaPrimary: { padding: '15px 40px', background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", boxShadow: '0 8px 24px rgba(220,38,38,0.3)', transition: 'all 0.3s' },
  ctaSecondary: { padding: '15px 40px', background: '#fff', color: '#c0272d', border: '2.5px solid #c0272d', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.3s' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, padding: '40px', background: '#fff', borderBottom: '2px solid rgba(220,38,38,0.1)' },
  statCard: { textAlign: 'center', padding: 24, background: 'linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%)', borderRadius: 16, border: '2px solid rgba(220,38,38,0.1)' },
  statNum: { fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: '#c0272d', display: 'block', lineHeight: 1 },
  statLbl: { fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7a4a4a', fontWeight: 600, marginTop: 8 },
  navRow: { display: 'flex', gap: 0, background: '#fff', borderBottom: '2px solid rgba(220,38,38,0.1)' },
  navItem: (a) => ({ flex: 1, padding: '18px 0', textAlign: 'center', background: a ? '#fff0f0' : '#fff', borderBottom: a ? '4px solid #dc2626' : '4px solid transparent', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: a ? '#dc2626' : '#7a3a3a', transition: 'all 0.3s', letterSpacing: '0.3px' }),
  content: { padding: '40px' },
  card: { background: '#fff', borderRadius: 16, padding: 28, marginBottom: 24, boxShadow: '0 4px 16px rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.05)' },
  cardTitle: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#8b0000', margin: '0 0 20px', letterSpacing: '0.3px' },
  apptItem: { display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: '1px solid #f0d0d0', cursor: 'pointer', transition: 'all 0.3s' },
  apptDate: { width: 64, height: 64, background: 'linear-gradient(135deg, #fff0f0, #ffe8e8)', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid #e8c0c0', boxShadow: '0 2px 8px rgba(220,38,38,0.1)' },
  apptDay: { fontSize: 24, fontWeight: 700, color: '#c0272d', lineHeight: 1 },
  apptMonth: { fontSize: 11, textTransform: 'uppercase', color: '#8b5a5a', fontWeight: 600, marginTop: 2 },
  apptInfo: { flex: 1 },
  apptRef: { fontSize: 12, color: '#8b5a5a', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' },
  apptVaccine: { fontSize: 15, fontWeight: 700, color: '#2a0a0a' },
  apptClinic: { fontSize: 13, color: '#7a3a3a', marginTop: 4, fontWeight: 500 },
  apptStatus: (s) => ({ padding: '6px 14px', borderRadius: 16, fontSize: 12, fontWeight: 700, background: s === 'completed' || s === 'approved' ? '#e8f5e9' : s === 'pending' || s === 'review' ? '#fff8e1' : '#ffebee', color: s === 'completed' || s === 'approved' ? '#1b5e20' : s === 'pending' || s === 'review' ? '#d97706' : '#b71c1c' }),
  empty: { textAlign: 'center', padding: '48px 0', color: '#9a4a4a', fontSize: 15, fontWeight: 500 },
}

const STATUS_STEPS = [
  { id: 1, label: 'Submitted' },
  { id: 2, label: 'Under Review' },
  { id: 3, label: 'Approved' },
  { id: 4, label: 'Completed' },
]

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

export default function CitizenHome({ user, onLogout, onNavigate }) {
  const userInitials = `${(user?.first_name || 'C').charAt(0)}${(user?.last_name || 'U').charAt(0)}`.toUpperCase()
  const userName = [user?.first_name, user?.last_name].filter(Boolean).join(' ') || 'Citizen'

  const [activeTab, setActiveTab] = useState('home')
  const [bookings, setBookings] = useState([])
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
  }).slice(0, 3)

  const past = bookings.filter(b => {
    const status = (b.status || '').toLowerCase()
    return status.includes('complete') || status.includes('cancelled') || status.includes('done')
  }).slice(0, 3)

  const totalBookings = bookings.length
  const completed = bookings.filter(b => {
    const status = (b.status || '').toLowerCase()
    return status.includes('complete') || status.includes('done') || status.includes('vaccinat')
  }).length

  return (
    <div style={css.page}>
      <header style={css.topbar}>
        <div style={css.topLeft}>
          <div style={css.avatar}>✚</div>
          <div>
            <h1 style={css.topTitle}>E-Bakuna</h1>
            <p style={css.topSub}>Vaccination System · Cebu City</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={css.chip}>Citizen</span>
          <button style={css.logoutBtn} onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div style={css.hero}>
        <h2 style={css.heroTitle}>Welcome back, {userName.split(' ')[0]}!</h2>
        <p style={css.heroSub}>Book your vaccination appointment today</p>
        <div style={css.ctaRow}>
          <button style={css.ctaPrimary} onClick={() => onNavigate('browse-schedules')}>
            ✚ Book Appointment
          </button>
          <button style={css.ctaSecondary} onClick={() => onNavigate('my-appointments')}>
            My Appointments
          </button>
        </div>
      </div>

      <div style={css.statsRow}>
        <div style={css.statCard}>
          <strong style={css.statNum}>{totalBookings}</strong>
          <span style={css.statLbl}>Total Bookings</span>
        </div>
        <div style={css.statCard}>
          <strong style={css.statNum}>{upcoming.length}</strong>
          <span style={css.statLbl}>Upcoming</span>
        </div>
        <div style={css.statCard}>
          <strong style={css.statNum}>{completed}</strong>
          <span style={css.statLbl}>Completed</span>
        </div>
      </div>

      <nav style={css.navRow}>
        <div style={css.navItem(activeTab === 'home')} onClick={() => setActiveTab('home')}>
          Home
        </div>
        <div style={css.navItem(activeTab === 'appointments')} onClick={() => onNavigate('my-appointments')}>
          My Appointments
        </div>
        <div style={css.navItem(activeTab === 'records')} onClick={() => {}}>
          Medical Records
        </div>
      </nav>

      <div style={css.content}>
        {activeTab === 'home' && (
          <>
            <div style={css.card}>
              <h3 style={css.cardTitle}>Upcoming Appointments</h3>
              {upcoming.length === 0 ? (
                <p style={css.empty}>No upcoming appointments. Book your first vaccination today!</p>
              ) : (
                upcoming.map((b, i) => {
                  const fd = formatDate(b.preferredDate)
                  return (
                    <div key={i} style={css.apptItem} onClick={() => onNavigate('appointment-detail', b)}>
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
                  )
                })
              )}
            </div>

            <div style={css.card}>
              <h3 style={css.cardTitle}>Quick Actions</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <button style={css.ctaSecondary} onClick={() => onNavigate('browse-schedules')}>
                  Browse Schedules
                </button>
                <button style={css.ctaSecondary} onClick={() => onNavigate('my-appointments')}>
                  Track Booking
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}