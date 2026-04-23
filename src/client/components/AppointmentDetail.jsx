import React, { useState, useEffect } from 'react'
import './AppointmentDetail.css'

const css = {
  page: { minHeight: '100vh', background: 'linear-gradient(180deg, #fafafa 0%, #f5f1f1 100%)', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#1a0505' },
  topbar: { background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #e53935 100%)', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, boxShadow: '0 8px 32px rgba(220,38,38,0.25)' },
  topTitle: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '0.5px' },
  backBtn: { background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: 8, padding: '8px 18px', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, marginRight: 16, transition: 'all 0.2s' },
  chip: { background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 24, padding: '8px 16px', fontSize: 13, color: '#fff', fontWeight: 600 },
  logoutBtn: { background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: 8, padding: '8px 18px', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 },
  content: { padding: '40px' },
  title: { fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#8b0000', margin: '0 0 32px', letterSpacing: '0.5px' },
  refBox: { background: 'linear-gradient(135deg, #fff0f0 0%, #ffe8e8 100%)', border: '3px dashed #c0a0a0', borderRadius: 18, padding: '36px 28px', textAlign: 'center', marginBottom: 32, boxShadow: '0 4px 12px rgba(220,38,38,0.1)' },
  refLabel: { fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#8b5a5a', fontWeight: 700 },
  refNum: { fontFamily: "'Playfair Display', serif", fontSize: 36, letterSpacing: '0.1em', color: '#c0272d', fontWeight: 700, margin: '14px 0 10px', wordBreak: 'break-all' },
  statusBadge: (s) => ({ display: 'inline-block', padding: '8px 18px', borderRadius: 16, fontSize: 14, fontWeight: 700, background: s === 'completed' || s === 'approved' ? '#e8f5e9' : s === 'pending' || s === 'review' ? '#fff8e1' : '#ffebee', color: s === 'completed' || s === 'approved' ? '#1b5e20' : s === 'pending' || s === 'review' ? '#d97706' : '#b71c1c', marginTop: 12 }),
  timeline: { listStyle: 'none', padding: 0, margin: '0 0 32px', position: 'relative' },
  stepRow: { display: 'flex', alignItems: 'flex-start', gap: 18, paddingBottom: 28, position: 'relative' },
  connector: (d) => ({ position: 'absolute', left: 15, top: 36, bottom: 0, width: 3, background: d ? 'linear-gradient(180deg, #dc2626 0%, #991b1b 100%)' : '#e8d0d0' }),
  dot: (s) => ({ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0, background: s === 'done' ? 'linear-gradient(135deg, #dc2626, #c0272d)' : s === 'active' ? '#fff' : '#f8eded', border: `3px solid ${s === 'done' ? '#dc2626' : s === 'active' ? '#dc2626' : '#e8c0c0'}`, color: s === 'done' ? '#fff' : s === 'active' ? '#dc2626' : '#d0a0a0', boxShadow: s === 'done' ? '0 4px 12px rgba(220,38,38,0.3)' : 'none' }),
  stepTitle: (active) => ({ fontSize: 16, fontWeight: 700, color: active ? '#dc2626' : active === false ? '#c0a0a0' : '#3a0a0a', margin: 0, letterSpacing: '0.3px' }),
  stepDesc: (ok) => ({ fontSize: 14, color: '#7a5a5a', margin: '8px 0 0', opacity: ok === false ? 0.5 : 1, fontWeight: 500 }),
  card: { background: '#fff', borderRadius: 16, padding: 28, marginBottom: 24, boxShadow: '0 4px 16px rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.05)' },
  cardTitle: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#8b0000', margin: '0 0 20px', letterSpacing: '0.3px' },
  detailRow: { display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #f0d0d0' },
  detailLbl: { fontSize: 14, color: '#8b6a6a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' },
  detailVal: { fontSize: 15, fontWeight: 700, color: '#2a0a0a' },
  recordCard: { background: 'linear-gradient(135deg, #f0fdf4 0%, #e8fce0 100%)', borderRadius: 16, padding: 28, border: '2px solid #16a34a', boxShadow: '0 4px 12px rgba(22,163,74,0.1)' },
  recordTitle: { fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#1b5e20', margin: '0 0 16px', letterSpacing: '0.3px' },
  recordRow: { display: 'flex', padding: '12px 0' },
  recordLbl: { fontSize: 14, color: '#4a7a4a', width: 140, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' },
  recordVal: { fontSize: 15, fontWeight: 600, color: '#1b5e20' },
  empty: { textAlign: 'center', padding: '28px', color: '#9a4a4a', fontSize: 14, fontStyle: 'italic', fontWeight: 500 },
}

const STATUS_STEPS = [
  { id: 1, label: 'Submitted', desc: 'Your booking request has been received.' },
  { id: 2, label: 'Under Review', desc: 'Clinic staff is verifying your details.' },
  { id: 3, label: 'Approved', desc: 'Your appointment has been confirmed.' },
  { id: 4, label: 'Completed', desc: 'Vaccination successfully done.' },
]

function getStatusStage(status = '') {
  const s = (status || '').toLowerCase()
  if (s.includes('reject') || s.includes('cancel')) return 3
  if (s.includes('complete') || s.includes('done') || s.includes('vaccinat')) return 4
  if (s.includes('approve') || s.includes('confirm')) return 3
  if (s.includes('review') || s.includes('pending')) return 2
  return 1
}

function formatDate(d) {
  if (!d) return '—'
  const date = new Date(d)
  return isNaN(date) ? d : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const TIME_SLOTS = [
  { value: 't_0900_am', label: '09:00 AM' },
  { value: 't_1000_am', label: '10:00 AM' },
  { value: 't_1100_am', label: '11:00 AM' },
  { value: 't_1200_pm', label: '12:00 PM' },
  { value: 't_0100_pm', label: '01:00 PM' },
  { value: 't_0200_pm', label: '02:00 PM' },
  { value: 't_0300_pm', label: '03:00 PM' },
  { value: 't_0400_pm', label: '04:00 PM' },
]

function formatTime(t) {
  return TIME_SLOTS.find(s => s.value === t)?.label || t || '—'
}

export default function AppointmentDetail({ user, booking, onLogout, onNavigate }) {
  const stage = booking ? getStatusStage(booking.status) : 0

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      const saved = JSON.parse(localStorage.getItem('ebakuna_bookings') || '[]')
      const updated = saved.map(b => {
        if (b.referenceNumber === booking.referenceNumber) {
          return { ...b, status: 'cancelled' }
        }
        return b
      })
      localStorage.setItem('ebakuna_bookings', JSON.stringify(updated))
      onNavigate('my-appointments')
    }
  }

  if (!booking) {
    return (
      <div style={css.page}>
        <header style={css.topbar}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button style={css.backBtn} onClick={() => onNavigate('my-appointments')}>← Back</button>
            <h1 style={css.topTitle}>Appointment Details</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={css.chip}>Citizen</span>
            <button style={css.logoutBtn} onClick={onLogout}>Logout</button>
          </div>
        </header>
        <div style={css.content}>
          <p style={css.empty}>No appointment selected</p>
        </div>
      </div>
    )
  }

  return (
    <div style={css.page}>
      <header style={css.topbar}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button style={css.backBtn} onClick={() => onNavigate('my-appointments')}>← Back</button>
          <h1 style={css.topTitle}>Appointment Details</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={css.chip}>Citizen</span>
          <button style={css.logoutBtn} onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div style={css.content}>
        <div style={css.refBox}>
          <div style={css.refLabel}>Reference Number</div>
          <div style={css.refNum}>{booking.referenceNumber}</div>
          <span style={css.statusBadge(booking.status)}>
            {(booking.status || 'pending').charAt(0).toUpperCase() + (booking.status || 'pending').slice(1)}
          </span>
        </div>

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: '#7a1a1a', marginBottom: 16 }}>
          Status Timeline
        </h3>
        <ul style={css.timeline}>
          {STATUS_STEPS.map((step, i) => {
            const state = stage > step.id ? 'done' : stage === step.id ? 'active' : 'pending'
            const isLast = i === STATUS_STEPS.length - 1

            return (
              <li key={step.id} style={css.stepRow}>
                {!isLast && <div style={css.connector(stage > step.id)} />}
                <div style={css.dot(state)}>
                  {state === 'done' ? '✓' : step.id}
                </div>
                <div style={{ paddingTop: 2 }}>
                  <p style={css.stepTitle(state === 'active')}>{step.label}</p>
                  <p style={css.stepDesc(state === 'pending')}>{step.desc}</p>
                </div>
              </li>
            )
          })}
        </ul>

        <div style={css.card}>
          <h3 style={css.cardTitle}>Appointment Details</h3>
          <div style={css.detailRow}>
            <span style={css.detailLbl}>Vaccine</span>
            <span style={css.detailVal}>{booking.vaccineType}</span>
          </div>
          <div style={css.detailRow}>
            <span style={css.detailLbl}>Date</span>
            <span style={css.detailVal}>{formatDate(booking.preferredDate)}</span>
          </div>
          <div style={css.detailRow}>
            <span style={css.detailLbl}>Time</span>
            <span style={css.detailVal}>{formatTime(booking.preferredTime)}</span>
          </div>
          <div style={css.detailRow}>
            <span style={css.detailLbl}>Clinic</span>
            <span style={css.detailVal}>{booking.healthUnit}</span>
          </div>
          <div style={css.detailRow}>
            <span style={css.detailLbl}>Booked On</span>
            <span style={css.detailVal}>{formatDate(booking.bookedDate)}</span>
          </div>
        </div>

        {booking.medicalRecord && (
          <div style={css.recordCard}>
            <h3 style={css.recordTitle}>✓ Medical Record</h3>
            <div style={css.recordRow}>
              <span style={css.recordLbl}>Date</span>
              <span style={css.recordVal}>{formatDate(booking.medicalRecord.date)}</span>
            </div>
            <div style={css.recordRow}>
              <span style={css.recordLbl}>Symptoms</span>
              <span style={css.recordVal}>{booking.medicalRecord.symptoms || 'None reported'}</span>
            </div>
            <div style={css.recordRow}>
              <span style={css.recordLbl}>Temperature</span>
              <span style={css.recordVal}>{booking.medicalRecord.temperature || '—'}</span>
            </div>
            <div style={css.recordRow}>
              <span style={css.recordLbl}>Follow-up</span>
              <span style={css.recordVal}>{formatDate(booking.medicalRecord.followUpDate)}</span>
            </div>
          </div>
        )}

        {!booking.medicalRecord && stage >= 4 && (
          <div style={css.recordCard}>
            <p style={css.empty}>Medical record not yet available</p>
          </div>
        )}

        {stage < 3 && (
          <div style={{ marginTop: 16 }}>
            <button
              style={{ padding: '12px 24px', background: '#fff', color: '#c0272d', border: '2px solid #e8c0c0', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              onClick={handleCancel}
            >
              Cancel Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  )
}