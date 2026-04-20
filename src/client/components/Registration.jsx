import React, { useState } from 'react';
import { AuthService } from '../services/AuthService.js';
import './Registration.css';

export default function Registration({ onNavigate }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear field-specific error
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Please confirm your password';
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const authService = new AuthService();
      await authService.register(formData);
      
      setShowSuccess(true);
    } catch (err) {
      setErrors({
        general: err.message || 'Registration failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onNavigate('login');
  };

  if (showSuccess) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="success-icon">✅</div>
          <h3 className="success-title">Registration Successful!</h3>
          <p className="success-message">
            Your account has been created successfully. You can now log in with your credentials.
          </p>
          <button className="btn-primary" onClick={handleSuccessClose}>
            Continue to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <div className="registration-card">
        {/* Header */}
        <div className="registration-header">
          <h1 className="registration-logo">e-Bakuna</h1>
          <p className="registration-tagline">Cebu City Health Office — Vaccination Portal</p>
        </div>

        {/* Form */}
        <div className="registration-body">
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="first_name">
                  First Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className={`form-input ${errors.first_name ? 'error' : ''}`}
                  placeholder="First name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                {errors.first_name && <span className="field-error">{errors.first_name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="last_name">
                  Last Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className={`form-input ${errors.last_name ? 'error' : ''}`}
                  placeholder="Last name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                {errors.last_name && <span className="field-error">{errors.last_name}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirm_password">
                Confirm Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                className={`form-input ${errors.confirm_password ? 'error' : ''}`}
                placeholder="Confirm your password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
              {errors.confirm_password && <span className="field-error">{errors.confirm_password}</span>}
            </div>

            {errors.general && (
              <div className="error-message">
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary registration-btn"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="registration-footer">
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="link-button"
                onClick={() => onNavigate('login')}
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}