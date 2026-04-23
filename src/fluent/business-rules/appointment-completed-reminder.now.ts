import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'

/**
 * Business Rule - Send dose reminder when appointment is marked as completed
 * Triggers on update of x_2009786_vaccinat_appointment table
 * when status field changes to 'completed'
 */
export const appointmentCompletedReminder = BusinessRule({
  $id: Now.ID['appointment_completed_reminder'],
  table: 'x_2009786_vaccinat_appointment',
  name: 'Send dose reminder on appointment completion',
  when: 'after',
  priority: 100,
  script: `
    (function() {
      const appointmentId = current.getUniqueValue();
      const currentStatus = current.getValue('status');
      const previousStatus = previous.getValue('status');
      
      // Only process if status is 'completed' and changed TO 'completed'
      if (currentStatus !== 'completed') {
        return;
      }
      
      if (previousStatus !== 'completed' && currentStatus === 'completed') {
        try {
          const appointmentRec = new GlideRecord('x_2009786_vaccinat_appointment');
          if (appointmentRec.get(appointmentId)) {
            // Import notification service and send reminder
            const doseNumber = appointmentRec.getValue('dose_number');
            const citizenId = appointmentRec.getValue('citizen');
            
            // Get citizen email
            const citizen = new GlideRecord('sys_user');
            if (citizen.get(citizenId)) {
              const citizenEmail = citizen.getValue('email');
              const subject = doseNumber === 'st' 
                ? 'Your Second Dose Appointment Awaits'
                : doseNumber === 'nd'
                ? 'Booster Vaccination Eligible'
                : null;
              
              const body = doseNumber === 'st'
                ? 'You have completed your 1st dose. Please book your 2nd dose appointment to complete your vaccination.'
                : doseNumber === 'nd'
                ? 'You have completed your 2nd dose. Please book your booster appointment when eligible.'
                : null;
              
              if (subject && body && citizenEmail) {
                // Queue email
                const email = new GlideRecord('sys_email_queue');
                email.initialize();
                email.setValue('recipient', citizenEmail);
                email.setValue('subject', subject);
                email.setValue('body', body);
                email.setValue('priority', 3);
                email.setValue('state', 'ready');
                email.insert();
                gs.log(\`[Dose Reminder] Sent to \${citizenEmail} for dose \${doseNumber}\`);
              }
            }
          }
        } catch (e) {
          gs.error('Error sending dose reminder: ' + e.message);
        }
      }
    })();
  `
})
