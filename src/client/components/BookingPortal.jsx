import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { EBakunaService } from '../services/EBakunaService.js'
import './BookingPortal.css'

// ─── Constants ────────────────────────────────────────────────────────────────
// NOTE: Keep these values aligned with the ServiceNow Choice field `preferred_time`
// in `x_2009786_vaccinat_citizen_booking`.
const TIME_SLOTS = [
  { value: 't_0900_am', label: '09:00 AM' },
  { value: 't_1000_am', label: '10:00 AM' },
  { value: 't_1100_am', label: '11:00 AM' },
  { value: 't_1200_pm', label: '12:00 PM' },
  { value: 't_0100_pm', label: '01:00 PM' },
  { value: 't_0200_pm', label: '02:00 PM' },
  { value: 't_0300_pm', label: '03:00 PM' },
]

const VACCINES = [
  'COVID-19 Booster',
  'Flu Vaccine',
  'Hepatitis B',
  'Pneumococcal',
  'MMR',
  'Varicella',
  'Tetanus (Td)',
]

const BARANGAYS = [
  'Adlaon', 'Agsungot', 'Apas', 'Bacayan', 'Banilad', 'Binaliw', 'Bonbon', 'Budla-an', 'Busay',
  'Cambinocot', 'Guba', 'Kalunasan', 'Lusaran', 'Mabini', 'Malubog', 'Pamutan', 'Paril', 'Pit-os',
  'Pulangbato', 'Pung-ol-Sibugay', 'San Jose', 'Sapangdaku', 'Sinsin', 'Sirao', 'Sudlon I', 'Sudlon II',
  'Tabunan', 'Tagbao', 'Talamban', 'Taptap', 'Toong', 'Camputhaw', 'Carreta', 'Cogon Ramos', 'Day-as',
  'Ermita', 'Hippodromo', 'Kalubihan', 'Kamagayan', 'Kasambagan', 'Lahug', 'Lorega San Miguel', 'Luz',
  'Mabolo', 'Pari-an', 'Tejero', 'Babag', 'Basak Pardo', 'Basak San Nicolas', 'Buhisan', 'Bulacao',
  'Buot-Taup Pardo', 'Calamba', 'Cogon Pardo', 'Duljo-Fatima', 'Guadalupe', 'Inayawan', 'Kinasang-an Pardo',
  'Labangon', 'Mambaling', 'Pahina Central', 'Pahina San Nicolas', 'Pasil', 'Punta Princesa', 'Quiot Pardo',
  'San Antonio', 'San Nicolas Central', 'San Roque', 'Santa Cruz', 'Sawang Calero', 'Sibugay',
  'Suba San Nicolas', 'T. Padilla', 'Taboan', 'Tisa', 'Zapatera'
]

const DOSES = ['1st Dose', '2nd Dose', 'Booster']
const DEFAULT_PROVIDER = 'Cebu City Health Office (CHO)'

const STATUS_STEPS = [
  { id: 1, label: 'Submitted', desc: 'Request received and saved.' },
  { id: 2, label: 'Under Review', desc: 'Clinic staff verifying your details.' },
  { id: 3, label: 'Approved', desc: 'Final schedule assigned.' },
  { id: 4, label: 'Completed', desc: 'Vaccination successfully done.' },
]

// ─── Helpers ────────────────────────────────────────────────────────────────
const extract = (f) => (f && typeof f === 'object' ? f.display_value || f.value || '' : f || '')

const fmtDate = (v) => {
  if (!v) return '—'
  const d = new Date(v)
  return isNaN(d) ? v : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const fmtTime = (v) => TIME_SLOTS.find((s) => s.value === v)?.label || v || '—'

const statusStage = (status = '') => {
  const s = (status || '').toLowerCase()
  if (s.includes('complete') || s.includes('done') || s.includes('vaccinat')) return 4
  if (s.includes('approve') || s.includes('confirm')) return 3
  if (s.includes('review') || s.includes('pending')) return 2
  return 1
}

const normalizeBooking = (raw = {}) => ({
  reference: extract(raw.reference_number) || extract(raw.referenceNumber) || extract(raw.booking_reference) || '—',
  status: (extract(raw.booking_status) || extract(raw.status) || 'pending').toLowerCase(),
  vaccine: extract(raw.vaccine_type) || extract(raw.vaccineType) || '—',
  date: extract(raw.first_dose_date) || extract(raw.preferredDate) || '',
  time: extract(raw.preferred_time) || extract(raw.preferredTime) || '',
  provider: extract(raw.provider) || extract(raw.health_unit) || '—',
  assigned: extract(raw.assigned_date) || extract(raw.clinic_schedule) || '',
})

// ─── Inline styles ───────────────────────────────────────────────────────────
const css = {
  portal: { minHeight: '100vh', background: '#fff8f8', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#1a0505', animation: 'bp-fade-up 0.3s ease both' },
  topbar: { background: 'linear-gradient(135deg, #8b0000 0%, #c0272d 60%, #e53935 100%)', padding: '18px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  topLeft: { display: 'flex', alignItems: 'center', gap: 14 },
  avatar: { width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', border: '2px solid rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600, color: '#fff', flexShrink: 0 },
  topTitle: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: '#fff', margin: 0 },
  topSub: { fontSize: 12, color: 'rgba(255,255,255,0.75)', margin: '2px 0 0' },
  chip: { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 20, padding: '5px 14px', fontSize: 12, color: 'rgba(255,255,255,0.9)' },
  logoutBtn: { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 6, padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 80px)' },
  panel: { padding: '28px 32px', animation: 'bp-fade-up 0.3s ease both' },
  leftPanel: { borderRight: '1px solid #f0d0d0' },
  panelTitle: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: '#7a1a1a', margin: '0 0 24px' },
  sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 500, color: '#7a1a1a', margin: '0 0 14px', paddingTop: 20, borderTop: '1px solid #f0d0d0', display: 'block' },
  fieldGrid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' },
  fieldWrap: { marginBottom: 14 },
  label: { display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#9a4a4a', marginBottom: 5 },
  input: (err) => ({ width: '100%', boxSizing: 'border-box', padding: '8px 11px', border: `1.5px solid ${err ? '#c0272d' : '#e8c0c0'}`, borderRadius: 7, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: '#2a0a0a', background: err ? '#fff5f5' : '#fff', outline: 'none' }),
  select: (err) => ({ width: '100%', boxSizing: 'border-box', padding: '8px 11px', border: `1.5px solid ${err ? '#c0272d' : '#e8c0c0'}`, borderRadius: 7, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: '#2a0a0a', background: '#fff', outline: 'none' }),
  errText: { fontSize: 11, color: '#c0272d', marginTop: 3, display: 'block', fontWeight: 500 },
  timeGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 7, marginTop: 4 },
  timeSlot: (a) => ({ padding: '7px 4px', textAlign: 'center', border: `1.5px solid ${a ? '#c0272d' : '#e8c0c0'}`, borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: 'pointer', background: a ? '#c0272d' : '#fff', color: a ? '#fff' : '#7a3a3a', transition: 'all 0.15s', userSelect: 'none' }),
  btnRow: { display: 'flex', gap: 10, marginTop: 20 },
  btnPrimary: (d) => ({ flex: 1, padding: '10px 0', background: d ? '#e8b0b0' : 'linear-gradient(135deg, #dc2626, #8b0000)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: d ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, letterSpacing: '0.03em' }),
  btnSecondary: { padding: '10px 20px', background: '#fff0f0', color: '#c0272d', border: '1px solid #f0c0c0', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 },
  spinner: { width: 15, height: 15, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'bp-spin 0.7s linear infinite', flexShrink: 0 },
  trackRow: { display: 'flex', gap: 8 },
  trackInput: { flex: 1, padding: '8px 11px', border: '1.5px solid #e8c0c0', borderRadius: 7, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: '#2a0a0a', outline: 'none', boxSizing: 'border-box' },
  trackBtn: (d) => ({ padding: '8px 18px', background: d ? '#e8b0b0' : '#c0272d', color: '#fff', border: 'none', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: d ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' }),
  alert: (t) => ({ display: 'flex', gap: 9, alignItems: 'flex-start', padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500, marginBottom: 16, lineHeight: 1.5, borderLeft: `4px solid ${t === 'error' ? '#c0272d' : '#2e7d32'}`, background: t === 'error' ? '#fff0f0' : '#f0faf0', color: t === 'error' ? '#8b0000' : '#1b5e20' }),
  refBox: { background: 'linear-gradient(135deg, #fff0f0, #ffe4e4)', border: '2px dashed #e8a0a0', borderRadius: 12, padding: '20px 16px', textAlign: 'center', marginBottom: 20 },
  refLabel: { fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#b06060', fontWeight: 600 },
  refNum: { fontFamily: "'Playfair Display', serif", fontSize: 26, letterSpacing: '0.1em', color: '#c0272d', fontWeight: 700, margin: '6px 0 4px', wordBreak: 'break-all' },
  refSub: { fontSize: 11, color: '#b06060' },
  timeline: { listStyle: 'none', padding: 0, margin: '0 0 20px', position: 'relative' },
  stepRow: { display: 'flex', alignItems: 'flex-start', gap: 12, paddingBottom: 18, position: 'relative' },
  connector: (d) => ({ position: 'absolute', left: 11, top: 26, bottom: 0, width: 2, background: d ? '#c0272d' : '#f0d0d0' }),
  dot: (s) => ({ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, background: s === 'done' ? '#c0272d' : s === 'active' ? '#fff' : '#f8eded', border: `2px solid ${s === 'done' ? '#c0272d' : s === 'active' ? '#c0272d' : '#e8c0c0'}`, color: s === 'done' ? '#fff' : s === 'active' ? '#c0272d' : '#d0a0a0' }),
  stepTitle: (active) => ({ fontSize: 13, fontWeight: 600, color: active ? '#c0272d' : active === false ? '#c0a0a0' : '#3a0a0a', margin: 0 }),
  stepDesc: (ok) => ({ fontSize: 12, color: '#9a6060', margin: '3px 0 0', opacity: ok === false ? 0.4 : 1 }),
  detailCard: { background: '#fff8f8', border: '1px solid #f0d0d0', borderRadius: 10, padding: '14px 16px' },
  detailHead: { fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b06060', fontWeight: 600, marginBottom: 12 },
  detailGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  detailLbl: { fontSize: 11, color: '#c09090', marginBottom: 2 },
  detailVal: { fontSize: 14, fontWeight: 600, color: '#2a0a0a' },
  detailValRed: { fontSize: 14, fontWeight: 600, color: '#c0272d' },
  clinicMsg: (isErr) => ({ fontSize: 12, color: isErr ? '#c0272d' : '#b06060', fontStyle: 'italic', padding: '8px 0', display: 'block' }),
}

// ─── Sub-components ─────────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div style={css.fieldWrap}>
      <label style={css.label}>{label}</label>
      {children}
      {error && <span style={css.errText}>{error}</span>}
    </div>
  )
}

function Alert({ type, message }) {
  if (!message) return null
  return (
    <div style={css.alert(type)}>
      <span>{type === 'error' ? '\u26a0' : '\u2713'}</span>
      <span>{message}</span>
    </div>
  )
}

function TimeSlotPicker({ value, onChange }) {
  return (
    <div style={css.timeGrid}>
      {TIME_SLOTS.map((s) => (
        <div key={s.value} style={css.timeSlot(value === s.value)} onClick={() => onChange(s.value)}>
          {s.label}
        </div>
      ))}
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function BookingPortal({ user, onLogout, hideLogout = false, hideHeader = false }) {
  const normalizedRoles = Array.isArray(user?.roles) ? user.roles.map((r) => (r || '').toString().toLowerCase()) : []
  const isCitizen =
    normalizedRoles.some((r) => r.includes('citizen')) ||
    (user?.description || '').toLowerCase().includes('citizen')

  if (user && !isCitizen) {
    return (
      <div className="bp-portal" style={{ ...css.portal, padding: 40 }}>
        <div style={css.alert('error')}>Access denied: Citizen dashboard only.</div>
      </div>
    )
  }

  const svc = useMemo(() => new EBakunaService(), [])

  // ── Clinics loaded from API — only registered providers shown ──
  const [clinics, setClinics] = useState([])
  const [clinicsLoading, setClinicsLoading] = useState(true)
  const [clinicsError, setClinicsError] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const data = await svc.getClinics({ sysparm_limit: '100' })
        setClinics(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error('Failed to load clinics:', e)
        setClinicsError('Could not load available providers. Please try again later.')
      } finally {
        setClinicsLoading(false)
      }
    })()
  }, [svc])

  const clinicOptions = clinics.map((c) => ({
    id: c.sys_id || '',
    label: extract(c.name) || extract(c.clinic_name) || extract(c.health_unit_name) || c.sys_id || 'Unknown Clinic',
  }))

  const defaultName = [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim()
  const userInitials = `${(user?.first_name || 'C').charAt(0)}${(user?.last_name || 'Z').charAt(0)}`.toUpperCase()

  const makeBlank = (firstLabel = DEFAULT_PROVIDER, firstId = '') => ({
    fullName: defaultName,
    contactNo: '',
    dateOfBirth: '',
    barangay: 'Mabolo',
    vaccineType: 'COVID-19 Booster',
    doseNumber: '1st Dose',
    preferredDate: '',
    preferredTime: 't_0900_am',
    healthUnit: firstLabel,
    healthUnitId: firstId,
  })

  const [form, setForm] = useState(makeBlank())
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState({ type: '', msg: '' })
  const [booking, setBooking] = useState(null)
  const [trackRef, setTrackRef] = useState('')
  const [trackErr, setTrackErr] = useState('')

  useEffect(() => {
    if (clinicOptions.length > 0) {
      setForm((p) => {
        if (p.healthUnit) return p
        return { ...p, healthUnit: clinicOptions[0].label, healthUnitId: clinicOptions[0].id }
      })
      return
    }

    // Keep booking usable even when no provider records are currently available.
    setForm((p) => {
      if (p.healthUnit) return p
      return { ...p, healthUnit: DEFAULT_PROVIDER, healthUnitId: '' }
    })
  }, [clinicOptions])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ebakuna_bookings') || '[]')
      if (saved.length) {
        const last = saved[saved.length - 1]
        setBooking(normalizeBooking({
          reference_number: last.referenceNumber,
          booking_status: last.status || 'pending',
          vaccine_type: last.vaccineType,
          first_dose_date: last.preferredDate,
          preferred_time: last.preferredTime,
          provider: last.healthUnit,
        }))
        setTrackRef(last.referenceNumber || '')
      }
    } catch (_) {}
  }, [])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    if (name === 'healthUnit') {
      const matched = clinicOptions.find((c) => c.label === value)
      setForm((p) => ({ ...p, healthUnit: value, healthUnitId: matched?.id || '' }))
    } else {
      setForm((p) => ({ ...p, [name]: value }))
    }
    setErrors((p) => ({ ...p, [name]: '' }))
    setNotice({ type: '', msg: '' })
  }, [clinicOptions])

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.contactNo.trim()) e.contactNo = 'Contact number is required'
    if (!form.dateOfBirth) e.dateOfBirth = 'Date of birth is required'
    if (!form.vaccineType) e.vaccineType = 'Vaccine type is required'
    if (!form.preferredDate) e.preferredDate = 'Preferred date is required'
    if (!form.preferredTime) e.preferredTime = 'Please select a time slot'
    if (!form.healthUnit) e.healthUnit = 'Please select a provider'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setNotice({ type: '', msg: '' })
    try {
      const res = await fetch('/api/x_2009786_vaccinat/v1/ebakuna_auth/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          userId: user?.sys_id,
          fullName: form.fullName,
          contactNo: form.contactNo,
          dateOfBirth: form.dateOfBirth,
          barangay: form.barangay,
          vaccineType: form.vaccineType,
          doseNumber: form.doseNumber,
          preferredDate: form.preferredDate,
          preferredTime: form.preferredTime,
          healthUnit: form.healthUnit,
          healthUnitId: form.healthUnitId,
        }),
      })
      const data = await res.json()
      const ref = data.referenceNumber || data.booking?.referenceNumber || data.booking?.reference_number
      if (data.status === 'success' && ref) {
        const saved = JSON.parse(localStorage.getItem('ebakuna_bookings') || '[]')
        saved.push({
          referenceNumber: ref,
          bookedDate: new Date().toISOString(),
          fullName: form.fullName,
          vaccineType: form.vaccineType,
          preferredDate: form.preferredDate,
          preferredTime: form.preferredTime,
          healthUnit: form.healthUnit,
          status: 'pending',
        })
        localStorage.setItem('ebakuna_bookings', JSON.stringify(saved))
        setBooking(normalizeBooking({
          reference_number: ref,
          booking_status: 'pending',
          vaccine_type: form.vaccineType,
          first_dose_date: form.preferredDate,
          preferred_time: form.preferredTime,
          provider: form.healthUnit,
        }))
        setTrackRef(ref)
        setNotice({ type: 'success', msg: `Booking submitted! Reference: ${ref}` })
        setForm(makeBlank(clinicOptions[0]?.label || '', clinicOptions[0]?.id || ''))
      } else {
        setNotice({ type: 'error', msg: data.error || 'Booking failed. Please try again.' })
      }
    } catch (err) {
      setNotice({ type: 'error', msg: err.message || 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!trackRef.trim()) {
      setTrackErr('Please enter a reference number')
      return
    }
    setLoading(true)
    setTrackErr('')
    try {
      const res = await fetch('/api/x_2009786_vaccinat/v1/ebakuna_auth/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ referenceNumber: trackRef }),
      })
      const data = await res.json()
      if (data.status === 'success' && data.booking) {
        setBooking(normalizeBooking(data.booking))
        setNotice({ type: 'success', msg: 'Booking found — status updated.' })
      } else {
        setTrackErr(data.error || 'No booking found for that reference number.')
      }
    } catch (err) {
      setTrackErr(err.message || 'Error tracking booking.')
    } finally {
      setLoading(false)
    }
  }

  const stage = booking ? statusStage(booking.status) : 0
  const effectiveBooking = booking || { reference: '—', vaccine: '—', date: '', time: '', provider: '—', status: '' }
  const isFormDisabled = loading || clinicsLoading

  return (
    <div className="bp-portal" style={css.portal}>
      {/* ── Topbar ── */}
      {!hideHeader && (
        <header style={css.topbar}>
          <div style={css.topLeft}>
            <div style={css.avatar}>{userInitials}</div>
            <div>
              <h1 style={css.topTitle}>{defaultName || 'Citizen User'} &nbsp;&middot;&nbsp; CHO Cebu</h1>
              <p style={css.topSub}>Citizen Portal &nbsp;&middot;&nbsp; Vaccination Booking System</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={css.chip}>Citizen &nbsp;&middot;&nbsp; Active</span>
            {!hideLogout && <button style={css.logoutBtn} onClick={onLogout}>Logout</button>}
          </div>
        </header>
      )}

      <div style={css.grid}>
        {/* ── LEFT: Booking Form ── */}
        <div style={{ ...css.panel, ...css.leftPanel }}>
          <h2 style={css.panelTitle}>Book an Appointment</h2>
          <Alert type={notice.type} message={notice.msg} />

          <form onSubmit={handleSubmit} noValidate>
            <div style={css.fieldGrid2}>
              <Field label="Full Name" error={errors.fullName}>
                <input name="fullName" value={form.fullName} onChange={handleChange} style={css.input(errors.fullName)} placeholder="Maria Santos" />
              </Field>
              <Field label="Contact Number" error={errors.contactNo}>
                <input name="contactNo" type="tel" value={form.contactNo} onChange={handleChange} style={css.input(errors.contactNo)} placeholder="+63 917 555 0108" />
              </Field>
            </div>

            <div style={css.fieldGrid2}>
              <Field label="Date of Birth" error={errors.dateOfBirth}>
                <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} style={css.input(errors.dateOfBirth)} />
              </Field>
              <Field label="Barangay">
                <select name="barangay" value={form.barangay} onChange={handleChange} style={css.select(false)}>
                  {BARANGAYS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </Field>
            </div>

            <div style={css.fieldGrid2}>
              <Field label="Vaccine Type" error={errors.vaccineType}>
                <select name="vaccineType" value={form.vaccineType} onChange={handleChange} style={css.select(errors.vaccineType)}>
                  {VACCINES.map((v) => <option key={v}>{v}</option>)}
                </select>
              </Field>
              <Field label="Dose Number">
                <select name="doseNumber" value={form.doseNumber} onChange={handleChange} style={css.select(false)}>
                  {DOSES.map((d) => <option key={d}>{d}</option>)}
                </select>
              </Field>
            </div>

            <div style={css.fieldGrid2}>
              <Field label="Preferred Date" error={errors.preferredDate}>
                <input name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange} style={css.input(errors.preferredDate)} />
              </Field>

              <Field label="Provider / Clinic" error={errors.healthUnit}>
                {clinicsLoading ? (
                  <span style={css.clinicMsg(false)}>Loading available providers…</span>
                ) : (
                  <select name="healthUnit" value={form.healthUnit} onChange={handleChange} style={css.select(errors.healthUnit)}>
                    {clinicOptions.length === 0 ? (
                      <option value={DEFAULT_PROVIDER}>{DEFAULT_PROVIDER}</option>
                    ) : (
                      clinicOptions.map((c) => (
                        <option key={c.id} value={c.label}>{c.label}</option>
                      ))
                    )}
                  </select>
                )}
                {!clinicsLoading && clinicsError && <span style={css.clinicMsg(true)}>{clinicsError}</span>}
                {!clinicsLoading && !clinicsError && clinicOptions.length === 0 && (
                  <span style={css.clinicMsg(true)}>No providers currently available. Using default CHO clinic.</span>
                )}
              </Field>
            </div>

            <Field label="Preferred Time Slot" error={errors.preferredTime}>
              <TimeSlotPicker
                value={form.preferredTime}
                onChange={(val) => {
                  setForm((p) => ({ ...p, preferredTime: val }))
                  setErrors((p) => ({ ...p, preferredTime: '' }))
                }}
              />
            </Field>

            <div style={css.btnRow}>
              <button type="submit" style={css.btnPrimary(isFormDisabled)} disabled={isFormDisabled}>
                {loading
                  ? <><div style={css.spinner} /> Submitting&hellip;</>
                  : '\u271a  Submit Booking'}
              </button>
              <button
                type="button"
                style={css.btnSecondary}
                onClick={() => {
                  setForm(makeBlank(clinicOptions[0]?.label || '', clinicOptions[0]?.id || ''))
                  setErrors({})
                  setNotice({ type: '', msg: '' })
                }}
                disabled={isFormDisabled}
              >
                Clear
              </button>
            </div>
          </form>

          <span style={css.sectionTitle}>Track a Booking</span>
          <form onSubmit={handleTrack} noValidate>
            <div style={css.trackRow}>
              <input
                style={{ ...css.trackInput, borderColor: trackErr ? '#c0272d' : '#e8c0c0' }}
                placeholder="Enter reference number  (e.g. EBK-ABC123)"
                value={trackRef}
                onChange={(e) => { setTrackRef(e.target.value); setTrackErr('') }}
              />
              <button type="submit" style={css.trackBtn(loading)} disabled={loading}>
                {loading ? '\u2026' : 'Track'}
              </button>
            </div>
            {trackErr && <span style={css.errText}>{trackErr}</span>}
          </form>
        </div>

        {/* ── RIGHT: Status Panel ── */}
        <div style={css.panel}>
          <h2 style={css.panelTitle}>Your Booking Status</h2>

          <div style={css.refBox}>
            <div style={css.refLabel}>Reference Number</div>
            <div style={css.refNum}>{effectiveBooking.reference}</div>
            <div style={css.refSub}>Use this number to track your appointment</div>
          </div>

          <ul style={css.timeline}>
            {STATUS_STEPS.map((step, i) => {
              const state = stage > step.id ? 'done' : stage === step.id ? 'active' : 'pending'
              const isLast = i === STATUS_STEPS.length - 1
              return (
                <li key={step.id} style={css.stepRow}>
                  {!isLast && <div style={css.connector(stage > step.id)} />}
                  <div style={css.dot(state)}>{state === 'done' ? '\u2713' : step.id}</div>
                  <div style={{ paddingTop: 2 }}>
                    <p style={css.stepTitle(state === 'active' ? true : state === 'pending' ? null : false)}>
                      {step.label}
                    </p>
                    <p style={css.stepDesc(state !== 'pending')}>
                      {step.id === 3 && effectiveBooking.date
                        ? `Assigned: ${fmtDate(effectiveBooking.date)} at ${fmtTime(effectiveBooking.time)}`
                        : step.desc}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>

          <div style={css.detailCard}>
            <div style={css.detailHead}>Appointment Details</div>
            <div style={css.detailGrid}>
              <div><div style={css.detailLbl}>Vaccine</div><div style={css.detailVal}>{effectiveBooking.vaccine}</div></div>
              <div><div style={css.detailLbl}>Provider</div><div style={css.detailVal}>{effectiveBooking.provider}</div></div>
              <div><div style={css.detailLbl}>Preferred Date</div><div style={css.detailValRed}>{fmtDate(effectiveBooking.date)}</div></div>
              <div><div style={css.detailLbl}>Time Slot</div><div style={css.detailValRed}>{fmtTime(effectiveBooking.time)}</div></div>
            </div>
          </div>

          {booking && (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <span style={{
                display: 'inline-block', padding: '5px 18px', borderRadius: 20, fontSize: 12,
                fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                background: booking.status.includes('approve') ? '#e8f5e9' : booking.status.includes('reject') ? '#ffebee' : '#fff8e1',
                color: booking.status.includes('approve') ? '#1b5e20' : booking.status.includes('reject') ? '#b71c1c' : '#e65100',
                border: `1px solid ${booking.status.includes('approve') ? '#a5d6a7' : booking.status.includes('reject') ? '#ef9a9a' : '#ffcc80'}`,
              }}>
                {booking.status || 'Pending'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
