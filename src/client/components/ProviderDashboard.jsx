import React, { useEffect, useMemo, useState } from 'react'
import { EBakunaService } from '../services/EBakunaService.js'
import './ProviderDashboard.css'

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  red900: '#8b0000', red800: '#991b1b', red700: '#b91c1c',
  red600: '#c0272d', red500: '#dc2626', red400: '#f87171',
  red100: '#fee2e2', red50:  '#fff5f5',
  border: '#f0d0d0', muted: '#9a4a4a', faint: '#faeaea',
  serif: "'Playfair Display', Georgia, serif",
  sans:  "'DM Sans', system-ui, sans-serif",
}

// ─── Status badge config ──────────────────────────────────────────────────────
const statusStyle = (raw = '') => {
  const s = raw.toLowerCase()
  if (s.includes('approve') || s.includes('complet') || s.includes('vaccinat'))
    return { background: '#e8f5e9', color: '#1b5e20', border: '1px solid #a5d6a7' }
  if (s.includes('reject') || s.includes('cancel'))
    return { background: '#ffebee', color: '#b71c1c', border: '1px solid #ef9a9a' }
  return { background: '#fff8e1', color: '#e65100', border: '1px solid #ffcc80' }
}

// ─── Shared inline styles ─────────────────────────────────────────────────────
const css = {
  root: { minHeight: '100vh', background: '#fff8f8', fontFamily: T.sans, color: '#1a0505', animation: 'pd-fade-up 0.3s ease both' },
  // topbar
  topbar: { background: `linear-gradient(135deg, ${T.red900} 0%, ${T.red600} 60%, ${T.red500} 100%)`, padding: '18px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  brand: { display: 'flex', alignItems: 'center', gap: 14 },
  logoCircle: { width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', border: '2px solid rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#fff', fontWeight: 700, flexShrink: 0 },
  brandTitle: { fontFamily: T.serif, fontSize: 20, fontWeight: 600, color: '#fff', margin: 0 },
  brandSub: { fontSize: 12, color: 'rgba(255,255,255,0.75)', margin: '2px 0 0' },
  chip: { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 20, padding: '5px 14px', fontSize: 12, color: 'rgba(255,255,255,0.9)' },
  logoutBtn: { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 6, padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontFamily: T.sans },
  // KPI row
  kpiRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: '#fff', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` },
  kpiCell: (last) => ({ padding: '20px 24px', textAlign: 'center', borderRight: last ? 'none' : `1px solid ${T.border}` }),
  kpiNum: { fontFamily: T.serif, fontSize: 36, fontWeight: 700, color: T.red600, lineHeight: 1, display: 'block' },
  kpiLbl: { fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.muted, marginTop: 6, display: 'block' },
  kpiDelta: (pos) => ({ fontSize: 11, color: pos ? '#2e7d32' : T.red600, marginTop: 3, display: 'block' }),
  // two-col grid
  mainGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${T.border}` },
  panel: { padding: '24px 28px', background: '#fff8f8' },
  panelBorder: { borderRight: `1px solid ${T.border}` },
  panelTitle: { fontFamily: T.serif, fontSize: 22, fontWeight: 600, color: '#7a1a1a', margin: '0 0 18px' },
  secTitle: { fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.muted, fontWeight: 600, margin: '20px 0 10px', paddingTop: 18, borderTop: `1px solid ${T.border}`, display: 'block' },
  // schedule grid
  schedGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 7 },
  dayCard: (active) => ({ background: active ? T.red600 : '#fff0f0', border: `1px solid ${active ? T.red600 : T.border}`, borderRadius: 8, padding: '10px 4px', textAlign: 'center', cursor: 'default' }),
  dayName: (active) => ({ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: active ? 'rgba(255,255,255,0.8)' : T.muted }),
  dayNum: (active) => ({ fontFamily: T.serif, fontSize: 22, fontWeight: 600, color: active ? '#fff' : '#3a0a0a', margin: '4px 0 2px', display: 'block' }),
  daySlots: (active) => ({ fontSize: 10, color: active ? 'rgba(255,255,255,0.85)' : T.red600 }),
  // vaccine chips
  tagRow: { display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 16 },
  tag: { background: '#fff0f0', border: `1px solid ${T.border}`, borderRadius: 20, padding: '4px 12px', fontSize: 12, color: '#7a3a3a' },
  // bar chart
  barRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 },
  barLabel: { fontSize: 12, color: '#7a3a3a', width: 90, flexShrink: 0 },
  barTrack: { flex: 1, background: T.faint, borderRadius: 4, height: 10, overflow: 'hidden' },
  barFill: { height: '100%', background: T.red600, borderRadius: 4, transition: 'width 0.5s ease' },
  barVal: { fontSize: 12, color: T.red600, fontWeight: 600, width: 28, textAlign: 'right' },
  // notifications
  notifList: { listStyle: 'none', padding: 0, margin: 0 },
  notifItem: (dot) => ({ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${T.faint}`, alignItems: 'flex-start' }),
  notifDot: (active) => ({ width: 8, height: 8, borderRadius: '50%', background: active ? T.red600 : '#d0b0b0', flexShrink: 0, marginTop: 5 }),
  notifText: { fontSize: 13, color: '#3a0a0a', lineHeight: 1.5 },
  // table section
  tableSection: { padding: '20px 28px 32px', background: '#fff8f8' },
  tableHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  exportBtn: { fontSize: 12, color: T.red600, background: '#fff0f0', border: `1px solid ${T.border}`, borderRadius: 6, padding: '5px 14px', cursor: 'pointer', fontFamily: T.sans },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: 720 },
  th: { fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.07em', color: T.muted, padding: '8px 10px', borderBottom: `1px solid ${T.border}`, textAlign: 'left', fontWeight: 600 },
  td: { padding: '11px 10px', borderBottom: `1px solid ${T.faint}`, fontSize: 13, color: '#2a0a0a', verticalAlign: 'middle' },
  refCell: { fontFamily: 'monospace', color: T.red600, fontWeight: 600, letterSpacing: '0.03em' },
  badge: (raw) => ({ display: 'inline-block', padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, ...statusStyle(raw) }),
  empty: { color: T.muted, padding: '20px 0', textAlign: 'center', fontSize: 14 },
  // loading
  loadWrap: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: T.red50, fontFamily: T.sans },
  spinner: { width: 36, height: 36, border: `3px solid ${T.red100}`, borderTopColor: T.red600, borderRadius: '50%', animation: 'pd-spin 0.7s linear infinite' },
  loadText: { color: T.muted, fontSize: 14 },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const extract = (f) => (f && typeof f === 'object' ? f.display_value || f.value || '' : f || '')

const fmtDate = (v) => {
  if (!v) return '—'
  const d = new Date(v)
  return isNaN(d) ? v : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const dayLabel = (d) => d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()

const VACCINE_KEYS = [
  { name: 'COVID-19', key: 'covid' },
  { name: 'Flu Vaccine', key: 'flu' },
  { name: 'Hepatitis B', key: 'hepatitis' },
  { name: 'Pneumococcal', key: 'pneumo' },
  { name: 'MMR', key: 'mmr' },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProviderDashboard({ user, onLogout, hideLogout = false, hideHeader = false }) {
  const normalizedRoles = Array.isArray(user?.roles)
    ? user.roles.map((r) => (r || '').toString().toLowerCase()) : []
  const isProvider =
    normalizedRoles.some((r) => r.includes('provider')) ||
    (user?.description || '').toLowerCase().includes('provider')

  const [clinics, setClinics]     = useState([])
  const [schedules, setSchedules] = useState([])
  const [bookings, setBookings]   = useState([])
  const [loading, setLoading]     = useState(true)
  const svc = useMemo(() => new EBakunaService(), [])

  useEffect(() => {
    if (user && !isProvider) return
    ;(async () => {
      try {
        const [c, sc, bk] = await Promise.all([
          svc.getClinics({ sysparm_limit: '100' }),
          svc.getSchedules({ sysparm_limit: '100' }),
          svc.getBookings({ sysparm_limit: '100' }),
        ])
        setClinics(c); setSchedules(sc); setBookings(bk)
      } catch (e) {
        console.error('Provider dashboard load error:', e)
      } finally {
        setLoading(false)
      }
    })()
  }, [svc])

  if (user && !isProvider) {
    return (
      <div style={{ ...css.root, padding: 40 }}>
        <div style={{ background: T.red100, color: T.red800, padding: '12px 16px', borderRadius: 8, borderLeft: `4px solid ${T.red600}`, fontSize: 14 }}>
          Access denied: Provider dashboard only.
        </div>
      </div>
    )
  }

  // ── derived stats ──
  const totalBookings = bookings.length
  const vaccinated    = bookings.filter(b => { const s = extract(b.booking_status).toLowerCase(); return s.includes('approv') || s.includes('complet') || s.includes('vaccinat') }).length
  const pending       = bookings.filter(b => { const s = extract(b.booking_status).toLowerCase(); return s.includes('pending') || s.includes('review') }).length
  const providerName  = [user?.first_name, user?.last_name].filter(Boolean).join(' ') || 'Provider'

  const vaccineTotals = VACCINE_KEYS.map(({ name, key }) => ({
    name,
    count: bookings.filter(b => extract(b.vaccine_type).toLowerCase().includes(key)).length,
  }))
  const maxCount = Math.max(...vaccineTotals.map(v => v.count), 1)

  // ── schedule day grid ──
  const slotsByDate = schedules.reduce((acc, s) => {
    const raw =
      extract(s.start_date_time) ||
      extract(s.end_date_time) ||
      extract(s.schedule_date) ||
      extract(s.date) ||
      extract(s.clinic_date) ||
      extract(s.available_date)
    if (!raw) return acc
    const d = new Date(raw)
    if (isNaN(d)) return acc
    const k = d.toISOString().slice(0, 10)
    acc[k] = (acc[k] || 0) + 1
    return acc
  }, {})

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i)
    const k = d.toISOString().slice(0, 10)
    return { date: d, key: k, slots: slotsByDate[k] || 0, isToday: i === 0 }
  })

  const bookingRows = bookings.slice(0, 8)
  const extractDate = (b) =>
    extract(b.first_dose_date) ||
    extract(b.preferred_date) ||
    extract(b.appointment_date) ||
    extract(b.clinic_schedule_date) ||
    ''

  return (
    <div style={css.root}>
      {/* ── Topbar ── */}
      <header style={css.topbar}>
        <div style={css.brand}>
          <div style={css.logoCircle}>✚</div>
          <div>
            <h1 style={css.brandTitle}>Cebu City Health Office</h1>
            <p style={css.brandSub}>Provider Dashboard &nbsp;·&nbsp; Vaccination Management System</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={css.chip}>CHO &nbsp;·&nbsp; Cebu</span>
          {!hideLogout && (
            <button style={css.logoutBtn} onClick={onLogout}>Logout</button>
          )}
        </div>
      </header>

      {/* ── KPI row ── */}
      <section style={css.kpiRow}>
        {[
          { num: totalBookings.toLocaleString(), lbl: 'Total Bookings',   delta: '+42 this week', pos: true },
          { num: vaccinated.toLocaleString(),    lbl: 'Vaccinated',       delta: `${totalBookings ? Math.round(vaccinated / totalBookings * 100) : 0}% rate`, pos: true },
          { num: pending.toLocaleString(),       lbl: 'Pending Review',   delta: 'Needs action', pos: false },
          { num: schedules.length.toLocaleString(), lbl: 'Active Schedules', delta: 'Next 14 days', pos: true },
        ].map((k, i, arr) => (
          <article key={k.lbl} style={css.kpiCell(i === arr.length - 1)}>
            <strong style={css.kpiNum}>{k.num}</strong>
            <span style={css.kpiLbl}>{k.lbl}</span>
            <span style={css.kpiDelta(k.pos)}>{k.delta}</span>
          </article>
        ))}
      </section>

      {/* ── Main two-col ── */}
      <section style={css.mainGrid}>
        {/* Left: Schedule */}
        <div style={{ ...css.panel, ...css.panelBorder }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <h2 style={{ ...css.panelTitle, margin: 0 }}>Schedule Management</h2>
            {!hideHeader && <span style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>{providerName}</span>}
          </div>

          <div style={css.schedGrid}>
            {days.map(({ date, key, slots, isToday }) => (
              <div key={key} style={css.dayCard(slots > 0)}>
                <div style={css.dayName(slots > 0)}>{dayLabel(date)}</div>
                <span style={css.dayNum(slots > 0)}>{date.getDate()}</span>
                <div style={css.daySlots(slots > 0)}>
                  {isToday && slots === 0 ? 'Today' : slots > 0 ? `${slots} slot${slots > 1 ? 's' : ''}` : 'Closed'}
                </div>
              </div>
            ))}
          </div>

          <div style={css.tagRow}>
            {vaccineTotals.map(v => (
              <span key={v.name} style={css.tag}>✓ {v.name}</span>
            ))}
          </div>

          <span style={css.secTitle}>Active Clinics</span>
          {clinics.length === 0
            ? <p style={{ fontSize: 13, color: T.muted }}>No clinics found.</p>
            : clinics.slice(0, 4).map((c, i) => (
                <div key={c.sys_id || i} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.red600, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#3a0a0a' }}>{extract(c.name) || extract(c.clinic_name) || `Clinic ${i + 1}`}</span>
                </div>
              ))
          }
        </div>

        {/* Right: Vaccine chart + notifications */}
        <div style={css.panel}>
          <h2 style={css.panelTitle}>Bookings by Vaccine</h2>
          <div>
            {vaccineTotals.map(v => (
              <div key={v.name} style={css.barRow}>
                <span style={css.barLabel}>{v.name}</span>
                <div style={css.barTrack}>
                  <div style={{ ...css.barFill, width: `${(v.count / maxCount) * 100}%` }} />
                </div>
                <div style={css.barVal}>{v.count}</div>
              </div>
            ))}
          </div>

          <span style={css.secTitle}>Notifications</span>
          <ul style={css.notifList}>
            {[
              { text: `${pending} pending bookings require staff review`, active: pending > 0 },
              { text: `${clinics.length} clinic${clinics.length !== 1 ? 's' : ''} currently active in this account`, active: true },
              { text: `${schedules.length} schedule${schedules.length !== 1 ? 's' : ''} visible in the next service window`, active: true },
              { text: 'COVID-19 Booster stock running low — verify with clinic', active: false },
            ].map((n, i) => (
              <li key={i} style={css.notifItem()}>
                <div style={css.notifDot(n.active)} />
                <span style={css.notifText}>{n.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Bookings table ── */}
      <section style={css.tableSection}>
        <div style={css.tableHead}>
          <h2 style={{ ...css.panelTitle, margin: 0 }}>All Booking Records</h2>
          <button style={css.exportBtn}>Export CSV</button>
        </div>
        <div style={css.tableWrap}>
          {bookingRows.length === 0 ? (
            <p style={css.empty}>No booking records found.</p>
          ) : (
            <table style={css.table}>
              <thead>
                <tr>
                  {['Reference No.', 'Citizen', 'Vaccine', 'Preferred Date', 'Assigned Date', 'Status'].map(h => (
                    <th key={h} style={css.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookingRows.map((b) => {
                  const status = extract(b.booking_status) || 'Pending'
                  return (
                    <tr key={b.sys_id}>
                      <td style={{ ...css.td, ...css.refCell }}>{extract(b.booking_reference) || '—'}</td>
                      <td style={css.td}>{extract(b.citizen_name) || '—'}</td>
                      <td style={css.td}>{extract(b.vaccine_type) || 'N/A'}</td>
                      <td style={css.td}>{fmtDate(extractDate(b))}</td>
                      <td style={css.td}>{fmtDate(extract(b.assigned_date) || extract(b.clinic_schedule)) || '—'}</td>
                      <td style={css.td}>
                        <span style={css.badge(status)}>{status}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  )
}