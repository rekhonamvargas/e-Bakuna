import React, { useState } from 'react';
import { EBakunaService } from '../services/EBakunaService.js';
import './BookingModal.css';

export default function BookingModal({ schedule, user, onClose, onSuccess }) {
  const [selectedDose, setSelectedDose] = useState('1st Dose');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const ebakunaService = new EBakunaService();

  const extractValue = (field) => {
    return typeof field === 'object' ? field.display_value : field;
  };

  const getSysId = (field) => {
    return typeof field === 'object' ? field.value : field;
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    
    try {
      const appointmentData = {
        citizen: user.sys_id,
        schedule: getSysId(schedule.sys_id),
        dose_number: selectedDose,
        status: 'Pending'
      };

      const appointment = await ebakunaService.createAppointment(appointmentData);
      setReferenceNumber(appointment.reference_number);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    onSuccess();
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  if (showConfirmation) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="success-icon">✅</div>
          <h3 className="success-title">Appointment Confirmed!</h3>
          <p className="success-message">
            Your E-Bakuna vaccination appointment has been successfully scheduled. 
            A confirmation SMS will be sent to your mobile number within 5 minutes.
          </p>
          <div className="reference-box">
            <div className="reference-label">Official Booking Reference</div>
            <div className="reference-number">{referenceNumber}</div>
            <div className="reference-note">Please save this number for appointment tracking</div>
          </div>
          <div className="next-steps">
            <div className="next-steps-title">📱 What happens next:</div>
            <div className="next-steps-content">
              • SMS confirmation sent to your number<br />
              • Arrive 15 minutes before appointment time<br />
              • Bring valid ID and vaccination card<br />
              • Follow health protocols at clinic
            </div>
          </div>
          <button className="btn-primary" onClick={handleConfirmationClose}>
            Close & Continue
          </button>
        </div>
      </div>
    );
  }

  const scheduleDateTime = formatDateTime(extractValue(schedule.start_date_time));

  return (
    <div className="modal-overlay">
      <div className="booking-modal">
        <div className="booking-header">
          <h2 className="booking-title">📋 Confirm Your Booking</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="booking-content">
          {/* Schedule Details */}
          <div className="schedule-summary">
            <h3 className="schedule-summary-title">Selected Schedule</h3>
            <div className="schedule-summary-content">
              <div className="schedule-summary-item">
                <span className="label">Clinic:</span>
                <span className="value">{extractValue(schedule.clinic?.name)}</span>
              </div>
              <div className="schedule-summary-item">
                <span className="label">Vaccine:</span>
                <span className="value">{extractValue(schedule.vaccine_brand)}</span>
              </div>
              <div className="schedule-summary-item">
                <span className="label">Date:</span>
                <span className="value">{scheduleDateTime.date}</span>
              </div>
              <div className="schedule-summary-item">
                <span className="label">Time:</span>
                <span className="value">{scheduleDateTime.time}</span>
              </div>
              <div className="schedule-summary-item">
                <span className="label">Location:</span>
                <span className="value">{extractValue(schedule.clinic?.barangay)}</span>
              </div>
            </div>
          </div>

          {/* Dose Selection */}
          <div className="dose-selection">
            <label className="form-label" htmlFor="dose">
              Select Dose Number <span className="required">*</span>
            </label>
            <select
              id="dose"
              className="form-select"
              value={selectedDose}
              onChange={(e) => setSelectedDose(e.target.value)}
            >
              <option value="1st Dose">1st Dose (Primary)</option>
              <option value="2nd Dose">2nd Dose (Primary)</option>
              <option value="1st Booster">1st Booster</option>
              <option value="2nd Booster">2nd Booster</option>
              <option value="Annual Booster">Annual Booster</option>
            </select>
          </div>

          {/* Requirements Notice */}
          <div className="requirements-notice">
            <h4 className="requirements-title">📋 Requirements for Vaccination Day</h4>
            <ul className="requirements-list">
              <li>Valid government ID (PhilHealth, UMID, Driver's License)</li>
              <li>Previous vaccination card (for 2nd dose or booster)</li>
              <li>Booking confirmation SMS with reference number</li>
              <li>Short-sleeved clothing for easy vaccination access</li>
              <li>Parental consent form (for minors under 18 years)</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="booking-actions">
            <button
              className="btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={handleConfirmBooking}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}