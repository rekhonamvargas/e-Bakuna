import React, { useState, useCallback } from 'react'
import { AuthService } from '../services/AuthService.js'
import styles from './Login.module.css'

function Field({ id, label, icon, type = 'text', value, onChange, placeholder, autoComplete }) {
  const [focused, setFocused] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword ? (showPw ? 'text' : 'password') : type

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.label}>{label}</label>

      <div className={styles.inputWrap}>
        <span className={styles.inputIcon}>{icon}</span>

        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${styles.input} ${focused ? styles.focused : ''}`}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
        />

        {isPassword && (
          <button
            type="button"
            className={styles.showToggle}
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
    <div className={styles.error}>
      <span>⚠</span>
      <span>{message}</span>
    </div>
  )
}

function DebugPanel({ info }) {
  if (!info) return null
  return (
    <pre className={styles.debug}>
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
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.stripe} />

        <div className={styles.body}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>✚</div>
              <div>
                <div className={styles.logoText}>E-Bakuna</div>
                <div className={styles.logoSub}>Vaccination System</div>
              </div>
            </div>

            <h2 className={styles.title}>Welcome back</h2>
            <p className={styles.subtitle}>Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
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
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? <><div className={styles.spinner}/>Signing in…</> : 'Sign In'}
            </button>
          </form>

          <div className={styles.footer}>
            <p>
              Don't have an account?{' '}
              <button
                className={styles.registerBtn}
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