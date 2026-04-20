import React, { useState, useEffect } from 'react';
import { AuthService } from './services/AuthService.js';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import StaffDashboard from './components/StaffDashboard.jsx';
import ProviderDashboard from './components/ProviderDashboard.jsx';
import BookingPortal from './components/BookingPortal.jsx';
import './App.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('loading');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const normalizeRole = (role) => {
    if (!role) return '';
    const raw = role.toString().trim().toLowerCase();
    if (raw.includes('provider')) return 'provider';
    if (raw.includes('clinic_staff') || raw.includes('staff')) return 'staff';
    if (raw.includes('citizen')) return 'citizen';
    return raw;
  };

  const checkAuthentication = async () => {
    try {
      const authService = new AuthService();
      const user = await authService.getCurrentUser();
      
      if (user) {
        setCurrentUser(user);
        routeByRole(user.roles, user.description);
      } else {
        setCurrentPage('login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setCurrentPage('login');
    } finally {
      setLoading(false);
    }
  };

  const routeByRole = (roles, description) => {
    const normalizedRoles = Array.isArray(roles)
      ? roles.map(normalizeRole)
      : [];
    const normalizedDescription = (description || '').toLowerCase();

    if (normalizedRoles.includes('provider')) {
        setCurrentPage('provider-dashboard');
    } else if (normalizedRoles.includes('staff')) {
        setCurrentPage('staff-dashboard');
    } else if (normalizedRoles.includes('citizen')) {
      setCurrentPage('citizen-dashboard');
    } else if (normalizedDescription.includes('provider')) {
      setCurrentPage('provider-dashboard');
    } else if (normalizedDescription.includes('staff')) {
        setCurrentPage('staff-dashboard');
    } else {
      setCurrentPage('login');
    }
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    routeByRole(user.roles, user.description);
  };

  const handleLogout = async () => {
    try {
      const authService = new AuthService();
      await authService.logout();
      setCurrentUser(null);
      setCurrentPage('login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderRoleContent = () => {
    switch (currentPage) {
      case 'booking-portal':
      case 'citizen-dashboard':
        return <BookingPortal user={currentUser} onLogout={handleLogout} hideLogout hideHeader />;
      case 'staff-dashboard':
        return <StaffDashboard user={currentUser} onLogout={handleLogout} hideLogout hideHeader />;
      case 'provider-dashboard':
        return <ProviderDashboard user={currentUser} onLogout={handleLogout} hideLogout hideHeader />;
      default:
        return <BookingPortal user={currentUser} onLogout={handleLogout} hideLogout hideHeader />;
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading E-Bakuna...</p>
      </div>
    );
  }

  switch (currentPage) {
    case 'login':
      return <Login onLogin={handleLogin} onNavigate={navigateTo} />;
    case 'registration':
      return <Registration onNavigate={navigateTo} />;
    case 'booking-portal':
    case 'citizen-dashboard':
    case 'staff-dashboard':
    case 'provider-dashboard':
      return (
        <div className="app-shell">
          <header className="app-shell-header">
            <div>
              <h1>E-Bakuna</h1>
              <p>
                {currentPage === 'provider-dashboard' && 'Provider portal'}
                {currentPage === 'staff-dashboard' && 'Clinic staff portal'}
                {currentPage === 'citizen-dashboard' && 'Citizen booking portal'}
                {currentPage === 'booking-portal' && 'Citizen booking portal'}
              </p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </header>
          <main className="app-shell-content">
            {renderRoleContent()}
          </main>
        </div>
      );
    default:
      return <Login onLogin={handleLogin} onNavigate={navigateTo} />;
  }
}