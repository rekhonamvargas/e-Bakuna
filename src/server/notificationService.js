/**
 * Notification Service - Handles appointment and dose reminders
 * Sends email notifications to citizens for vaccination reminders
 */

import { gs, GlideRecord } from '@servicenow/glide'

/**
 * Send a reminder notification to a citizen
 * @param {string} citizenEmail - Email address of the citizen
 * @param {string} subject - Email subject
 * @param {string} body - Email body (plain text)
 */
export function sendReminder(citizenEmail, subject, body) {
    try {
        if (!citizenEmail || !subject || !body) {
            gs.warn(`[Reminder] Skipped - missing required fields: email=${!!citizenEmail}, subject=${!!subject}, body=${!!body}`)
            return false
        }

        // Use ServiceNow's GlideEmailOutbound to send emails
        const email = new GlideRecord('sys_email_queue')
        email.initialize()
        email.setValue('recipient', citizenEmail)
        email.setValue('subject', subject)
        email.setValue('body', body)
        email.setValue('priority', 3) // Normal priority
        email.setValue('state', 'ready') // Ready to send

        const emailId = email.insert()
        if (emailId) {
            gs.log(`[Reminder sent] to ${citizenEmail} — ${subject}`, 'NotificationService')
            return true
        } else {
            gs.error(`[Reminder FAILED] Could not insert email record for ${citizenEmail}`)
            return false
        }
    } catch (error) {
        gs.error(`[Reminder ERROR] ${error.message}`)
        return false
    }
}

/**
 * Send appointment reminder 1 day before the appointment
 * Triggered when appointments are loaded/updated
 * @param {Object} appointment - Appointment record with citizen and schedule info
 */
export function sendAppointmentReminder(appointment) {
    if (!appointment) return false

    try {
        // Get schedule details
        const schedule = new GlideRecord('x_2009786_vaccinat_clinic_schedule')
        if (!schedule.get(appointment.schedule_slot)) {
            gs.warn('[Reminder] Could not find schedule for appointment')
            return false
        }

        // Get citizen details
        const citizen = new GlideRecord('sys_user')
        if (!citizen.get(appointment.citizen)) {
            gs.warn('[Reminder] Could not find citizen for appointment')
            return false
        }

        const citizenEmail = citizen.getValue('email')
        if (!citizenEmail) {
            gs.warn(`[Reminder] Citizen ${appointment.citizen} has no email`)
            return false
        }

        // Get clinic details
        const clinic = new GlideRecord('x_2009786_vaccinat_clinic')
        if (!clinic.get(schedule.getValue('clinic'))) {
            gs.warn('[Reminder] Could not find clinic for schedule')
            return false
        }

        const startDateTime = schedule.getValue('start_date_time')
        const clinicName = clinic.getValue('clinic_name')

        if (!startDateTime || !clinicName) {
            gs.warn('[Reminder] Missing schedule start time or clinic name')
            return false
        }

        // Parse and format the appointment time
        const appointmentDate = new Date(startDateTime)
        const formattedTime = appointmentDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })

        const subject = 'Vaccination Appointment Reminder - Tomorrow'
        const body = `Reminder: You have a vaccination appointment tomorrow at ${clinicName}, ${formattedTime}. Please bring a valid ID.`

        return sendReminder(citizenEmail, subject, body)
    } catch (error) {
        gs.error(`[Appointment Reminder ERROR] ${error.message}`)
        return false
    }
}

/**
 * Send second dose or booster reminder when appointment is completed
 * Triggered when appointment status is set to 'completed'
 * @param {Object} appointment - Appointment record with dose_number and citizen info
 */
export function sendDoseReminder(appointment) {
    if (!appointment) return false

    try {
        // Get citizen details
        const citizen = new GlideRecord('sys_user')
        if (!citizen.get(appointment.citizen)) {
            gs.warn('[Reminder] Could not find citizen for appointment')
            return false
        }

        const citizenEmail = citizen.getValue('email')
        if (!citizenEmail) {
            gs.warn(`[Reminder] Citizen ${appointment.citizen} has no email`)
            return false
        }

        const doseNumber = appointment.dose_number
        let subject = ''
        let body = ''

        if (doseNumber === 'st') {
            // First dose completed - remind for second dose
            subject = 'Your Second Dose Appointment Awaits'
            body = 'You have completed your 1st dose. Please book your 2nd dose appointment to complete your vaccination.'
        } else if (doseNumber === 'nd') {
            // Second dose completed - remind for booster
            subject = 'Booster Vaccination Eligible'
            body = 'You have completed your 2nd dose. Please book your booster appointment when eligible.'
        } else {
            // Booster or other - no further reminder needed
            gs.log(`[Reminder] Booster dose completed, no further reminder sent`)
            return false
        }

        return sendReminder(citizenEmail, subject, body)
    } catch (error) {
        gs.error(`[Dose Reminder ERROR] ${error.message}`)
        return false
    }
}

/**
 * Check all upcoming appointments and send reminders for those 1 day away
 * Scheduled job function - can be called by a scheduled business rule
 */
export function checkAndSendAppointmentReminders() {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStart = new Date(tomorrow)
    tomorrowStart.setHours(0, 0, 0, 0)
    const tomorrowEnd = new Date(tomorrow)
    tomorrowEnd.setHours(23, 59, 59, 999)

    try {
        const appointments = new GlideRecord('x_2009786_vaccinat_appointment')
        appointments.addQuery('status', 'pending') // Only pending appointments
        appointments.orderBy('schedule_slot')
        appointments.query()

        let remindersSent = 0
        while (appointments.next()) {
            const schedule = new GlideRecord('x_2009786_vaccinat_clinic_schedule')
            if (schedule.get(appointments.getValue('schedule_slot'))) {
                const startDateTime = new Date(schedule.getValue('start_date_time'))
                if (startDateTime >= tomorrowStart && startDateTime <= tomorrowEnd) {
                    if (sendAppointmentReminder(appointments.getRecord())) {
                        remindersSent++
                    }
                }
            }
        }

        if (remindersSent > 0) {
            gs.log(`[Reminders] Sent ${remindersSent} appointment reminders`)
        }
    } catch (error) {
        gs.error(`[Appointment Reminders Check ERROR] ${error.message}`)
    }
}
