/**
 * E-Bakuna Service - Manages vaccination-related data operations
 */
export class EBakunaService {
  constructor() {
    this.baseUrl = '/api/now/table'
    this.scope = 'x_2009786_vaccinat'
  }

  // Helper method to get authenticated headers
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-UserToken': window.g_ck
    }
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.text()
      let errorMessage
      try {
        const parsedError = JSON.parse(errorData)
        errorMessage = parsedError.error?.message || parsedError.error || 'Request failed'
      } catch (e) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`
      }
      throw new Error(errorMessage)
    }
    return response.json()
  }

  // Extract primitive value from ServiceNow fields
  extractValue(field, type = 'display') {
    if (typeof field === 'object' && field !== null) {
      return type === 'id' ? field.value : field.display_value
    }
    return field
  }

  // APPOINTMENT MANAGEMENT
  async getAppointments(filters = {}) {
    try {
      const params = new URLSearchParams({
        sysparm_display_value: 'all',
        sysparm_limit: '100',
        ...filters
      })
      
      const response = await fetch(`${this.baseUrl}/${this.scope}_appointment?${params}`, {
        method: 'GET',
        headers: this.getHeaders()
      })
      
      const data = await this.handleResponse(response)
      return data.result || []
    } catch (error) {
      console.error('Error fetching appointments:', error)
      throw error
    }
  }

  async createAppointment(appointmentData) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.scope}_appointment`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(appointmentData)
      })
      
      const data = await this.handleResponse(response)
      return data.result
    } catch (error) {
      console.error('Error creating appointment:', error)
      throw error
    }
  }

  async updateAppointment(sysId, appointmentData) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.scope}_appointment/${sysId}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(appointmentData)
      })
      
      const data = await this.handleResponse(response)
      return data.result
    } catch (error) {
      console.error('Error updating appointment:', error)
      throw error
    }
  }

  // CLINIC MANAGEMENT
  async getClinics(filters = {}) {
    try {
      const params = new URLSearchParams({
        sysparm_display_value: 'all',
        sysparm_query: 'active=true',
        ...filters
      })
      
      const response = await fetch(`${this.baseUrl}/${this.scope}_clinic?${params}`, {
        method: 'GET',
        headers: this.getHeaders()
      })
      
      const data = await this.handleResponse(response)
      return data.result || []
    } catch (error) {
      console.error('Error fetching clinics:', error)
      throw error
    }
  }

  async createClinic(clinicData) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.scope}_clinic`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          ...clinicData,
          active: true
        })
      })
      
      const data = await this.handleResponse(response)
      return data.result
    } catch (error) {
      console.error('Error creating clinic:', error)
      throw error
    }
  }

  // SCHEDULE MANAGEMENT
  async getSchedules(filters = {}) {
    try {
      const params = new URLSearchParams({
        sysparm_display_value: 'all',
        sysparm_limit: '100',
        ...filters
      })
      
      const response = await fetch(`${this.baseUrl}/${this.scope}_clinic_schedule?${params}`, {
        method: 'GET',
        headers: this.getHeaders()
      })
      
      const data = await this.handleResponse(response)
      return data.result || []
    } catch (error) {
      console.error('Error fetching schedules:', error)
      throw error
    }
  }

  async createSchedule(scheduleData) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.scope}_clinic_schedule`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(scheduleData)
      })
      
      const data = await this.handleResponse(response)
      return data.result
    } catch (error) {
      console.error('Error creating schedule:', error)
      throw error
    }
  }

  // CITIZEN BOOKING MANAGEMENT
  async getBookings(filters = {}) {
    try {
      const params = new URLSearchParams({
        sysparm_display_value: 'all',
        sysparm_limit: '100',
        ...filters
      })
      
      const response = await fetch(`${this.baseUrl}/${this.scope}_citizen_booking?${params}`, {
        method: 'GET',
        headers: this.getHeaders()
      })
      
      const data = await this.handleResponse(response)
      return data.result || []
    } catch (error) {
      console.error('Error fetching bookings:', error)
      throw error
    }
  }

  async createBooking(bookingData) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.scope}_citizen_booking`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          ...bookingData,
          booking_status: 'pending'
        })
      })
      
      const data = await this.handleResponse(response)
      return data.result
    } catch (error) {
      console.error('Error creating booking:', error)
      throw error
    }
  }

  async updateBooking(sysId, bookingData) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.scope}_citizen_booking/${sysId}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(bookingData)
      })

      const data = await this.handleResponse(response)
      return data.result
    } catch (error) {
      console.error('Error updating booking:', error)
      throw error
    }
  }

  // MEDICAL RECORDS
  async getMedicalRecords(filters = {}) {
    try {
      const params = new URLSearchParams({
        sysparm_display_value: 'all',
        sysparm_limit: '100',
        ...filters
      })
      
      const response = await fetch(`${this.baseUrl}/${this.scope}_medical_record?${params}`, {
        method: 'GET',
        headers: this.getHeaders()
      })
      
      const data = await this.handleResponse(response)
      return data.result || []
    } catch (error) {
      console.error('Error fetching medical records:', error)
      throw error
    }
  }

  async createMedicalRecord(recordData) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.scope}_medical_record`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(recordData)
      })
      
      const data = await this.handleResponse(response)
      return data.result
    } catch (error) {
      console.error('Error creating medical record:', error)
      throw error
    }
  }

  // DASHBOARD STATISTICS
  async getDashboardStats() {
    try {
      const [appointments, bookings, clinics, medicalRecords] = await Promise.allSettled([
        this.getAppointments(),
        this.getBookings(), 
        this.getClinics(),
        this.getMedicalRecords()
      ])

      const stats = {
        totalAppointments: appointments.status === 'fulfilled' ? appointments.value.length : 0,
        totalBookings: bookings.status === 'fulfilled' ? bookings.value.length : 0,
        totalClinics: clinics.status === 'fulfilled' ? clinics.value.length : 0,
        totalVaccinated: medicalRecords.status === 'fulfilled' ? medicalRecords.value.length : 0
      }

      // Calculate additional stats if data is available
      if (appointments.status === 'fulfilled') {
        const appointmentData = appointments.value
        stats.scheduledAppointments = appointmentData.filter(apt => 
          this.extractValue(apt.status) === 'scheduled'
        ).length
        stats.completedAppointments = appointmentData.filter(apt => 
          this.extractValue(apt.status) === 'completed'
        ).length
      }

      if (bookings.status === 'fulfilled') {
        const bookingData = bookings.value
        stats.pendingBookings = bookingData.filter(booking => 
          this.extractValue(booking.booking_status) === 'pending'
        ).length
        stats.confirmedBookings = bookingData.filter(booking => 
          this.extractValue(booking.booking_status) === 'confirmed'
        ).length
      }

      return stats
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      return {
        totalAppointments: 0,
        totalBookings: 0,
        totalClinics: 0,
        totalVaccinated: 0,
        scheduledAppointments: 0,
        completedAppointments: 0,
        pendingBookings: 0,
        confirmedBookings: 0
      }
    }
  }
}