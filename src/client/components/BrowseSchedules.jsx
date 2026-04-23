import React, { useState, useEffect } from 'react'
import './BrowseSchedules.css'

const T = { red600: '#c0272d', border: '#f0d0d0', muted: '#9a4a4a', sans: "'DM Sans', system-ui, sans-serif", serif: "'Playfair Display', serif" }

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

const VACCINES = ['COVID-19 Booster', 'Flu Vaccine', 'Hepatitis B', 'Pneumococcal', 'MMR', 'Varicella', 'Tetanus (Td)']

const TIME_SLOTS = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM']

const CONSENT_TEXT = `INFORMED CONSENT FOR VACCINATION
By signing below, I confirm that:
1. I have been provided with information about the vaccine I am receiving
2. I understand the benefits and risks associated with the vaccination
3. I have had the opportunity to ask questions and receive answers
4. I voluntarily consent to receive the vaccination
5. I understand that I can withdraw consent at any time`

export default function BrowseSchedules({ user, onLogout, onNavigate }) {
  const [clinics, setClinics] = useState([])
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [selectedClinic, setSelectedClinic] = useState(null)
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [form, setForm] = useState({ fullName: '', age: '', gender: '', barangay: '', vaccineType: '', healthDeclaration: false, consentSigned: false })
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState({ type: '', msg: '' })

  useEffect(() => {
    loadData()
  }, [])

  const extract = (f) => (f && typeof f === 'object' ? f.display_value || f.value || '' : f || '')

  const loadData = async () => {
    try {
      // Fetch actual clinics from ServiceNow
      const clinicResponse = await fetch('/api/now/table/x_2009786_vaccinat_clinic?sysparm_display_value=all&sysparm_limit=200&status=active', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-UserToken': window.g_ck
        }
      })
      
      // Fetch actual schedules from ServiceNow
      const scheduleResponse = await fetch('/api/now/table/x_2009786_vaccinat_clinic_schedule?sysparm_display_value=all&sysparm_limit=200', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-UserToken': window.g_ck
        }
      })
      
      const clinicData = await clinicResponse.json()
      const scheduleData = await scheduleResponse.json()
      
      const clinicList = Array.isArray(clinicData.result) ? clinicData.result : []
      const scheduleList = Array.isArray(scheduleData.result) ? scheduleData.result : []
      
      const clinicsWithSchedules = clinicList.map(clinic => {
        const clinicSchedules = scheduleList.filter(s => {
          const clinicRef = s.clinic
          const clinicRefId = typeof clinicRef === 'object' ? clinicRef.value : clinicRef
          return clinicRefId === clinic.sys_id && extract(s.status).toLowerCase() !== 'cancelled'
        })
        
        return {
          id: clinic.sys_id,
          name: extract(clinic.clinic_name) || extract(clinic.name) || 'Unnamed Clinic',
          barangay: extract(clinic.barangay) || 'Cebu City',
          vaccines: ['COVID-19 Booster', 'Flu Vaccine', 'Hepatitis B', 'Pneumococcal', 'MMR'],
          scheduleCount: clinicSchedules.length,
          schedules: clinicSchedules.map(s => ({
            clinicId: clinic.sys_id,
            date: extract(s.start_date_time)?.slice(0, 10) || '',
            time: extract(s.start_date_time)?.slice(11, 16) || '',
            available: parseInt(extract(s.remaining_slots)) || 0,
            sysId: s.sys_id
          }))
        }
      }).filter(c => c.scheduleCount > 0)
      
      if (clinicsWithSchedules.length > 0) {
        setClinics(clinicsWithSchedules)
        setSchedules(clinicsWithSchedules.flatMap(c => c.schedules))
      } else {
        setNotice({ type: 'error', msg: 'No schedules available. Please check back later.' })
      }
    } catch (e) {
      console.error('Failed to load data:', e)
      setNotice({ type: 'error', msg: 'Failed to load clinics and schedules.' })
    } finally {
      setLoading(false)
    }
  }
  
  const extract = (f) => (f && typeof f === 'object' ? f.display_value || f.value || '' : f || '')

  const getClinicSchedules = (clinicId) => {
    const clinic = clinics.find(c => c.id === clinicId)
    return clinic ? clinic.schedules.filter(s => s.available > 0) : []
  }

  const handleSelectClinic = (clinic) => {
    setSelectedClinic(clinic)
    setStep(2)
  }

  const handleSelectSchedule = (schedule) => {
    setSelectedSchedule(schedule)
    setSelectedTime(schedule.time)
  }

  const validateStep2 = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.age) e.age = 'Age is required'
    if (!form.gender) e.gender = 'Gender is required'
    if (!form.barangay) e.barangay = 'Barangay is required'
    if (!form.vaccineType) e.vaccineType = 'Vaccine type is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (step === 1 && !selectedClinic) {
      setNotice({ type: 'error', msg: 'Please select a clinic' })
      return
    }
    if (step === 1 && selectedClinic) {
      setStep(2)
      setNotice({ type: '', msg: '' })
      return
    }
    if (step === 2 && !validateStep2()) return
    if (step === 2 && validateStep2()) {
      setStep(3)
      setErrors({})
      return
    }
    if (step === 3 && (!form.healthDeclaration || !form.consentSigned)) {
      setNotice({ type: 'error', msg: 'Please confirm health declaration and consent' })
      return
    }
    handleSubmit()
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/now/table/x_2009786_vaccinat_citizen_booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify({
          full_name: form.fullName,
          age: form.age,
          gender: form.gender,
          barangay: form.barangay,
          vaccine_type: form.vaccineType,
          health_unit: selectedClinic.name,
          health_unit_id: selectedClinic.id,
          preferred_date: selectedSchedule.date,
          preferred_time: selectedSchedule.time,
          booking_status: 'pending'
        })
      })
      
      if (response.ok) {
        const ref = `EBK-${Date.now().toString(36).toUpperCase()}`
        setNotice({ type: 'success', msg: `Booking confirmed! Reference: ${ref}` })
        setTimeout(() => onNavigate('my-appointments'), 2000)
      } else {
        setNotice({ type: 'error', msg: 'Failed to submit booking' })
      }
    } catch (e) {
      console.error('Booking error:', e)
      setNotice({ type: 'error', msg: 'Failed to submit booking' })
    }
  }

  const formatDate = (d) => {
    if (!d) return ''
    const date = new Date(d)
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  if (loading) {
    return <div style={{ minHeight: '100vh', background: '#fff8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.sans }}>Loading...</div>
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff8f8', fontFamily: T.sans }}>
      <header style={{ background: `linear-gradient(135deg, #8b0000 0%, #c0272d 60%, #e53935 100%)`, padding: '18px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 6, padding: '6px 14px', fontSize: 12, cursor: 'pointer', marginRight: 12 }} onClick={() => onNavigate('citizen-home')}>← Back</button>
          <span style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 600, color: '#fff' }}>Book Vaccination</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 20, padding: '5px 14px', fontSize: 12, color: 'rgba(255,255,255,0.9)' }}>Citizen</span>
          <button style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 6, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }} onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div style={{ padding: '24px 28px' }}>
        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {['Select Clinic', 'Your Details', 'Confirm'].map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, background: step > i ? '#c0272d' : step === i + 1 ? '#fff' : '#ddd', color: step > i ? '#fff' : step === i + 1 ? '#c0272d' : '#999', border: `2px solid ${step > i ? '#c0272d' : step === i + 1 ? '#c0272d' : '#ddd'}` }}>{i + 1}</div>
              <span style={{ fontSize: 12, marginLeft: 8, color: step > i ? '#c0272d' : '#999' }}>{label}</span>
            </div>
          ))}
        </div>

        {notice.msg && <div style={{ padding: '12px 16px', borderRadius: 8, marginBottom: 16, background: notice.type === 'success' ? '#e8f5e9' : '#ffebee', color: notice.type === 'success' ? '#1b5e20' : '#b71c1c' }}>{notice.msg}</div>}

        {/* Step 1: Select Clinic */}
        {step === 1 && (
          <>
            <h2 style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 600, color: '#7a1a1a', margin: '0 0 20px' }}>Available Clinics</h2>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              {BARANGAYS.slice(0, 5).map(b => (
                <div key={b} style={{ padding: '8px 16px', borderRadius: 20, fontSize: 12, cursor: 'pointer', background: '#fff', color: '#7a3a3a', border: '1.5px solid #e8c0c0' }}>{b}</div>
              ))}
            </div>
            {clinics.map(clinic => {
              const clinicSchedules = getClinicSchedules(clinic.id)
              const vaccines = Array.isArray(clinic.vaccines) ? clinic.vaccines : [clinic.vaccines]
              return (
                <div key={clinic.id} style={{ background: '#fff', borderRadius: 12, padding: 20, marginBottom: 16, boxShadow: '0 2px 8px rgba(139,0,0,0.08)', cursor: 'pointer' }} onClick={() => handleSelectClinic(clinic)}>
                  <div style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 600, color: '#7a1a1a', marginBottom: 8 }}>{clinic.name}</div>
                  <div style={{ fontSize: 13, color: '#7a3a3a', marginBottom: 12 }}>📍 {clinic.barangay}, Cebu City</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {vaccines.map(v => <span key={v} style={{ padding: '4px 10px', borderRadius: 12, fontSize: 11, background: '#fff0f0', color: '#c0272d' }}>{v}</span>)}
                  </div>
                  <div style={{ marginTop: 12, fontSize: 12, color: '#2e7d32' }}>✓ {clinicSchedules.length} available slots</div>
                </div>
              )
            })}
          </>
        )}

        {/* Step 2: Your Details */}
        {step === 2 && selectedClinic && (
          <>
            <h2 style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 600, color: '#7a1a1a', margin: '0 0 20px' }}>Your Details - {selectedClinic.name}</h2>
            
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: T.muted, marginBottom: 6 }}>Full Name</label>
                <input style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e8c0c0', borderRadius: 8, fontSize: 14 }} value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} placeholder="Maria Santos" />
                {errors.fullName && <span style={{ color: '#c0272d', fontSize: 12 }}>{errors.fullName}</span>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: T.muted, marginBottom: 6 }}>Age</label>
                  <input type="number" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e8c0c0', borderRadius: 8, fontSize: 14 }} value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} placeholder="25" />
                  {errors.age && <span style={{ color: '#c0272d', fontSize: 12 }}>{errors.age}</span>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: T.muted, marginBottom: 6 }}>Gender</label>
                  <select style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e8c0c0', borderRadius: 8, fontSize: 14 }} value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <span style={{ color: '#c0272d', fontSize: 12 }}>{errors.gender}</span>}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: T.muted, marginBottom: 6 }}>Barangay</label>
                <select style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e8c0c0', borderRadius: 8, fontSize: 14 }} value={form.barangay} onChange={e => setForm(f => ({ ...f, barangay: e.target.value }))}>
                  <option value="">Select barangay</option>
                  {BARANGAYS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                {errors.barangay && <span style={{ color: '#c0272d', fontSize: 12 }}>{errors.barangay}</span>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: T.muted, marginBottom: 6 }}>Preferred Vaccine</label>
                 <select style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e8c0c0', borderRadius: 8, fontSize: 14 }} value={form.vaccineType} onChange={e => setForm(f => ({ ...f, vaccineType: e.target.value }))}>
                    <option value="">Select vaccine</option>
                    {Array.isArray(selectedClinic.vaccines) ? selectedClinic.vaccines.map(v => <option key={v} value={v}>{v}</option>) : VACCINES.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                {errors.vaccineType && <span style={{ color: '#c0272d', fontSize: 12 }}>{errors.vaccineType}</span>}
              </div>
            </div>

            {/* Available Slots */}
            <h3 style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 600, color: '#7a1a1a', marginBottom: 12 }}>Select Date & Time</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 20 }}>
              {getClinicSchedules(selectedClinic.id).slice(0, 15).map((s, i) => (
                <div key={i} style={{ padding: 12, borderRadius: 8, textAlign: 'center', cursor: 'pointer', background: selectedSchedule?.date === s.date && selectedTime === s.time ? T.red600 : '#fff', color: selectedSchedule?.date === s.date && selectedTime === s.time ? '#fff' : '#3a0a0a', border: `1px solid ${T.border}` }} onClick={() => handleSelectSchedule(s)}>
                  <div style={{ fontSize: 11, fontWeight: 600 }}>{formatDate(s.date)}</div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>{s.time}</div>
                  <div style={{ fontSize: 10, color: selectedSchedule?.date === s.date ? '#fff' : '#2e7d32' }}>{s.available} left</div>
                </div>
              ))}
            </div>

            <button style={{ padding: '12px 24px', background: T.red600, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }} onClick={handleNext}>Continue →</button>
          </>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <>
            <h2 style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 600, color: '#7a1a1a', margin: '0 0 20px' }}>Confirm Booking</h2>
            
            <div style={{ background: '#fff0f0', padding: 16, borderRadius: 8, marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: '#7a3a3a' }}><strong>Clinic:</strong> {selectedClinic.name}</div>
              <div style={{ fontSize: 13, color: '#7a3a3a' }}><strong>Date:</strong> {selectedSchedule ? formatDate(selectedSchedule.date) : ''}</div>
              <div style={{ fontSize: 13, color: '#7a3a3a' }}><strong>Time:</strong> {selectedTime}</div>
              <div style={{ fontSize: 13, color: '#7a3a3a' }}><strong>Vaccine:</strong> {form.vaccineType}</div>
              <div style={{ fontSize: 13, color: '#7a3a3a' }}><strong>Name:</strong> {form.fullName}</div>
            </div>

            <div style={{ background: '#fff8f8', padding: 16, borderRadius: 8, fontSize: 13, color: '#7a3a3a', marginBottom: 16, maxHeight: 150, overflowY: 'auto' }}>{CONSENT_TEXT}</div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
                <input type="checkbox" style={{ marginRight: 8 }} checked={form.healthDeclaration} onChange={e => setForm(f => ({ ...f, healthDeclaration: e.target.checked }))} />
                I confirm health information is accurate
              </label>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
                <input type="checkbox" style={{ marginRight: 8 }} checked={form.consentSigned} onChange={e => setForm(f => ({ ...f, consentSigned: e.target.checked }))} />
                I have read and agree to consent form
              </label>
            </div>

            <button style={{ padding: '12px 24px', background: T.red600, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }} onClick={handleSubmit}>✓ Confirm Booking</button>
          </>
        )}
      </div>
    </div>
  )
}