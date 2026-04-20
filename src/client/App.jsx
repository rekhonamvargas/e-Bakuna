import React, { useState, useEffect } from 'react';
import { AuthService } from './services/AuthService.js';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import CitizenDashboard from './components/CitizenDashboard.jsx';
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
    // Check standard roles first
    if (roles && roles.length > 0) {
      if (roles.includes('x_2009786_vaccinat.provider')) {
        setCurrentPage('provider-dashboard');
      } else if (roles.includes('x_2009786_vaccinat.clinic_staff')) {
        setCurrentPage('staff-dashboard');
      } else if (roles.includes('x_2009786_vaccinat.citizen')) {
        setCurrentPage('citizen-dashboard');
      } else {
        setCurrentPage('login');
      }
    } else if (description && description.includes('EBAKUNA_ROLE:')) {
      // Fallback to description field if no roles assigned
      if (description.includes('EBAKUNA_ROLE:staff')) {
        setCurrentPage('staff-dashboard');
      } else if (description.includes('EBAKUNA_ROLE:citizen')) {
        setCurrentPage('citizen-dashboard');
      } else {
        setCurrentPage('login');
      }
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
      return <BookingPortal user={currentUser} onLogout={handleLogout} />;
    case 'citizen-dashboard':
      return <CitizenDashboard user={currentUser} onLogout={handleLogout} />;
    case 'staff-dashboard':
      return <StaffDashboard user={currentUser} onLogout={handleLogout} />;
    case 'provider-dashboard':
      return <ProviderDashboard user={currentUser} onLogout={handleLogout} />;
    default:
      return <Login onLogin={handleLogin} onNavigate={navigateTo} />;
  }
}