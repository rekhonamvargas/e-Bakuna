import React from 'react';
import BookingPortal from './BookingPortal.jsx';

export default function CitizenDashboard({ user, onLogout }) {
  return <BookingPortal user={user} onLogout={onLogout} />;
}
