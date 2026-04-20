import React, { useState, useEffect } from 'react'
import AppointmentManager from './AppointmentManager.jsx'
import ClinicManager from './ClinicManager.jsx'
import BookingManager from './BookingManager.jsx'
import StatsCard from './StatsCard.jsx'
import './Dashboard.css'

export default function Dashboard({ user, authService, ebakunaService }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardStats()
  }, [])

  const loadDashboardStats = async () => {
    try {
      setLoading(true)
      const dashboardStats = await ebakunaService.getDashboardStats()
      setStats(dashboardStats)
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'appointments', label: '📅 Appointments', icon: '📅' },
    { id: 'bookings', label: '📝 Bookings', icon: '📝' },
    { id: 'clinics', label: '🏥 Clinics', icon: '🏥' },
    { id: 'records', label: '📋 Records', icon: '📋' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-content">
            <div className="stats-grid">
              <StatsCard
                title="Total Appointments"
                value={stats.totalAppointments || 0}
                icon="📅"
                color="blue"
                subtitle={`${stats.scheduledAppointments || 0} scheduled, ${stats.completedAppointments || 0} completed`}
              />
              <StatsCard
                title="Total Bookings"
                value={stats.totalBookings || 0}
                icon="📝"
                color="green"
                subtitle={`${stats.pendingBookings || 0} pending, ${stats.confirmedBookings || 0} confirmed`}
              />
              <StatsCard
                title="Active Clinics"
                value={stats.totalClinics || 0}
                icon="🏥"
                color="purple"
                subtitle="Vaccination centers"
              />
              <StatsCard
                title="Total Vaccinated"
                value={stats.totalVaccinated || 0}
                icon="💉"
                color="orange"
                subtitle="Medical records"
              />
            </div>
            
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-grid">
                <button 
                  className="action-card"
                  onClick={() => setActiveTab('appointments')}
                >
                  <span className="action-icon">📅</span>
                  <span className="action-title">Schedule Appointment</span>
                  <span className="action-desc">Book new vaccination appointment</span>
                </button>
                
                <button 
                  className="action-card"
                  onClick={() => setActiveTab('bookings')}
                >
                  <span className="action-icon">📝</span>
                  <span className="action-title">Citizen Booking</span>
                  <span className="action-desc">Register citizen for vaccination</span>
                </button>
                
                <button 
                  className="action-card"
                  onClick={() => setActiveTab('clinics')}
                >
                  <span className="action-icon">🏥</span>
                  <span className="action-title">Manage Clinics</span>
                  <span className="action-desc">Configure vaccination centers</span>
                </button>
                
                <button 
                  className="action-card"
                  onClick={() => setActiveTab('records')}
                >
                  <span className="action-icon">📋</span>
                  <span className="action-title">Medical Records</span>
                  <span className="action-desc">View vaccination history</span>
                </button>
              </div>
            </div>
          </div>
        )

      case 'appointments':
        return (
          <AppointmentManager 
            ebakunaService={ebakunaService}
            onDataChange={loadDashboardStats}
          />
        )

      case 'bookings':
        return (
          <BookingManager 
            ebakunaService={ebakunaService}
            onDataChange={loadDashboardStats}
          />
        )

      case 'clinics':
        return (
          <ClinicManager 
            ebakunaService={ebakunaService}
            onDataChange={loadDashboardStats}
          />
        )

      case 'records':
        return (
          <div className="records-content">
            <h2>📋 Medical Records</h2>
            <p>Medical records management coming soon...</p>
          </div>
        )

      default:
        return <div>Tab not found</div>
    }
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="dashboard-content">
        {renderTabContent()}
      </main>
    </div>
  )
}