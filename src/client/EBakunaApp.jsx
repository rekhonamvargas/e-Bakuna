import React, { useState, useEffect } from 'react'
import { AuthService } from './services/AuthService.js'
import { EBakunaService } from './services/EBakunaService.js'
import Login from './components/Login.jsx'
import Registration from './components/Registration.jsx'
import Dashboard from './components/Dashboard.jsx'
import './App.css'

export default function EBakunaApp() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('login') // 'login' or 'register'
  const [authService] = useState(() => new AuthService())
  const [ebakunaService] = useState(() => new EBakunaService())

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      setLoading(true)
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (credentials) => {
    try {
      const loggedInUser = await authService.login(credentials.username, credentials.password)
      setUser(loggedInUser)
      return { success: true }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, error: error.message }
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      setUser(null) // Force logout even on error
    }
  }

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading E-Bakuna System...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="app-container">
        <header className="app-header">
          <h1>🏥 E-Bakuna</h1>
          <p>COVID-19 Vaccination Management System</p>
          <p>Cebu City Health Office</p>
        </header>
        {currentPage === 'login' ? (
          <Login onLogin={handleLogin} onNavigate={handleNavigate} />
        ) : (
          <Registration onNavigate={handleNavigate} />
        )}
      </div>
    )
  }

  return (
    <div className="app-container">
      <header className="app-header logged-in">
        <div className="header-content">
          <div className="logo-section">
            <h1>🏥 E-Bakuna</h1>
            <span className="subtitle">Vaccination Management System</span>
          </div>
          <div className="user-section">
            <span className="welcome-text">
              Welcome, {user.first_name} {user.last_name}
            </span>
            <button 
              className="logout-btn" 
              onClick={handleLogout}
              title="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <Dashboard 
        user={user} 
        authService={authService} 
        ebakunaService={ebakunaService}
      />
    </div>
  )
}