import '@servicenow/sdk/global'
import { 
  Table, 
  ReferenceColumn,
  ChoiceColumn
} from '@servicenow/sdk/core'

/**
 * Appointment Table - Main vaccination appointment management
 */
export const x_2009786_vaccinat_appointment = Table({
  name: 'x_2009786_vaccinat_appointment',
  label: 'Appointment',
  schema: {
    citizen: ReferenceColumn({
      label: 'Citizen',
      referenceTable: 'sys_user',
      mandatory: true
    }),
    schedule_slot: ReferenceColumn({
      label: 'Schedule Slot',
      referenceTable: 'x_2009786_vaccinat_clinic_schedule',
      mandatory: true
    }),
    dose_number: ChoiceColumn({
      label: 'Dose Number',
      choices: {
        st: { label: '1st', sequence: 0 },
        nd: { label: '2nd', sequence: 1 },
        booster: { label: 'Booster', sequence: 2 }
      },
      dropdown: 'dropdown_with_none',
      mandatory: true
    }),
    status: ChoiceColumn({
      label: 'Status',
      choices: {
        confirmed: { label: 'Confirmed', sequence: 0 },
        completed: { label: 'Completed', sequence: 1 },
        no_show: { label: 'No-show', sequence: 2 },
        cancelled: { label: 'Cancelled', sequence: 3 }
      },
      dropdown: 'dropdown_with_none',
      default: 'confirmed',
      mandatory: true
    })
  },
  allow_web_service_access: true,
  extensible: true,
  display: 'citizen'
})