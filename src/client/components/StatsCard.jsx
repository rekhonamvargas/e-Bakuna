import React from 'react'
import './StatsCard.css'

export default function StatsCard({ title, value, icon, color, subtitle }) {
  return (
    <div className={`stats-card ${color}`}>
      <div className="stats-icon">
        {icon}
      </div>
      <div className="stats-content">
        <h3 className="stats-title">{title}</h3>
        <div className="stats-value">{value}</div>
        {subtitle && <div className="stats-subtitle">{subtitle}</div>}
      </div>
    </div>
  )
}