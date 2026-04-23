import React, { useState, useCallback } from 'react'
import { AuthService } from '../services/AuthService.js'
import './Login.css'

function Field({ id, label, icon, type = 'text', value, onChange, placeholder, autoComplete }) {
  const [focused, setFocused] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword ? (showPw ? 'text' : 'password') : type

  return (
    <div className="fieldGroup">
      <label htmlFor={id} className="label">{label}</label>

      <div className="inputWrap">
        <span className="inputIcon">{icon}</span>

        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`input ${focused ? 'focused' : ''}`}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
        />

        {isPassword && (
          <button
            type="button"
            className="showToggle"
            onClick={() => setShowPw(v => !v)}
          >
            {showPw ? 'HIDE' : 'SHOW'}
          </button>
        )}
      </div>
    </div>
  )
}

function ErrorBanner({ message }) {
  if (!message) return null
  return (
    <div className="error">
      <span>⚠</span>
      <span>{message}</span>
    </div>
  )
}

function DebugPanel({ info }) {
  if (!info) return null
  return (
    <pre className="debug">
      {JSON.stringify(info, null, 2)}
    </pre>
  )
}

export default function Login({ onLogin, onNavigate }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [debugInfo, setDebugInfo] = useState(null)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setDebugInfo(null)
    setLoading(true)

    try {
      const user = await new AuthService().login(
        credentials.username,
        credentials.password
      )
      onLogin(user)
    } catch (err) {
      setError(err.message || 'Login failed.')
      if (err.debug) setDebugInfo(err.debug)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="root">
      <div className="card">
        <div className="stripe" />

        <div className="body">
          <div className="header">
            <div className="logo">
              <div className="logoIcon">✚</div>
              <div>
                <div className="logoText">E-Bakuna</div>
                <div className="logoSub">Vaccination System</div>
              </div>
            </div>

            <h2 className="title">Welcome back</h2>
            <p className="subtitle">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <ErrorBanner message={error} />
            <DebugPanel info={debugInfo} />

            <Field
              id="username"
              label="Email / Username"
              icon="✉"
              value={credentials.username}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="username"
            />

            <Field
              id="password"
              label="Password"
              icon="🔒"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            <button
              type="submit"
              className="submitBtn"
              disabled={loading}
            >
              {loading ? <><div className="spinner"/>Signing in…</> : 'Sign In'}
            </button>
          </form>

          <div className="footer">
            <p>
              Don't have an account?{' '}
              <button
                className="registerBtn"
                onClick={() => onNavigate?.('register')}
              >
                Create one here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}