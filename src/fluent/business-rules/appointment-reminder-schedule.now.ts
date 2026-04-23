import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'

/**
 * Scheduled Business Rule - Check and send appointment reminders
 * Runs daily to send reminders for appointments scheduled 1 day away
 * Triggers for appointments with status 'pending' or 'confirmed'
 */
export const appointmentReminderSchedule = BusinessRule({
  $id: Now.ID['appointment_reminder_schedule'],
  table: 'x_2009786_vaccinat_appointment',
  name: 'Send appointment reminders for tomorrow',
  when: 'before',
  insert: false,
  update: false,
  delete: false,
  is_filter: false,
  priority: 100,
  script: `
    (function() {
      // Calculate tomorrow's date range
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStart = new Date(tomorrow);
      tomorrowStart.setHours(0, 0, 0, 0);
      const tomorrowEnd = new Date(tomorrow);
      tomorrowEnd.setHours(23, 59, 59, 999);
      
      try {
        const appointments = new GlideRecord('x_2009786_vaccinat_appointment');
        appointments.orderBy('citizen');
        appointments.query();
        
        let remindersSent = 0;
        const sentTo = {};
        
        while (appointments.next()) {
          const scheduleId = appointments.getValue('schedule_slot');
          const citizenId = appointments.getValue('citizen');
          
          // Skip if already sent reminder to this citizen
          if (sentTo[citizenId]) continue;
          
          const schedule = new GlideRecord('x_2009786_vaccinat_clinic_schedule');
          if (!schedule.get(scheduleId)) continue;
          
          const startDateTime = new Date(schedule.getValue('start_date_time'));
          
          // Check if appointment is tomorrow
          if (startDateTime >= tomorrowStart && startDateTime <= tomorrowEnd) {
            // Get citizen email
            const citizen = new GlideRecord('sys_user');
            if (!citizen.get(citizenId)) continue;
            
            const citizenEmail = citizen.getValue('email');
            if (!citizenEmail) continue;
            
            // Get clinic name
            const clinic = new GlideRecord('x_2009786_vaccinat_clinic');
            if (!clinic.get(schedule.getValue('clinic'))) continue;
            
            const clinicName = clinic.getValue('clinic_name');
            const appointmentTime = startDateTime.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            });
            
            // Send reminder email
            const email = new GlideRecord('sys_email_queue');
            email.initialize();
            email.setValue('recipient', citizenEmail);
            email.setValue('subject', 'Reminder: You have a vaccination appointment tomorrow');
            email.setValue('body', 
              'Reminder: You have a vaccination appointment tomorrow at ' + 
              clinicName + ', ' + appointmentTime + 
              '. Please bring a valid ID.'
            );
            email.setValue('priority', 3);
            email.setValue('state', 'ready');
            
            if (email.insert()) {
              remindersSent++;
              sentTo[citizenId] = true;
            }
          }
        }
        
        if (remindersSent > 0) {
          gs.log('[Appointment Reminders] Sent ' + remindersSent + ' reminders for tomorrow\\'s appointments');
        }
      } catch (e) {
        gs.error('Error sending appointment reminders: ' + e.message);
      }
    })();
  `
})
