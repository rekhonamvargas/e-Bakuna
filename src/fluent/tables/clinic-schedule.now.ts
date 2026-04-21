import '@servicenow/sdk/global'
import { 
  Table, 
  DateTimeColumn,
  IntegerColumn,
  ReferenceColumn,
  ChoiceColumn
} from '@servicenow/sdk/core'

/**
 * Clinic Schedule - Daily vaccination schedules per clinic
 */
export const x_2009786_vaccinat_clinic_schedule = Table({
  name: 'x_2009786_vaccinat_clinic_schedule',
  label: 'Schedule',
  schema: {
    clinic: ReferenceColumn({
      label: 'Clinic',
      referenceTable: 'x_2009786_vaccinat_clinic',
      mandatory: true
    }),
    start_date_time: DateTimeColumn({
      label: 'Start Date/Time',
      mandatory: true
    }),
    end_date_time: DateTimeColumn({
      label: 'End Date/Time',
      mandatory: true
    }),
    max_capacity: IntegerColumn({
      label: 'Max Capacity',
      mandatory: true,
      min: 1,
      max: 2000
    }),
    remaining_slots: IntegerColumn({
      label: 'Remaining Slots',
      mandatory: true,
      min: 0,
      max: 2000
    }),
    vaccine_brand: ChoiceColumn({
      label: 'Vaccine Brand',
      choices: {
        pfizer: { label: 'Pfizer', sequence: 0 },
        moderna: { label: 'Moderna', sequence: 1 },
        astrazeneca: { label: 'AstraZeneca', sequence: 2 },
        sinovac: { label: 'Sinovac', sequence: 3 },
        sinopharm: { label: 'Sinopharm', sequence: 4 },
        johnson_johnson: { label: 'Johnson & Johnson', sequence: 5 },
        novavax: { label: 'Novavax', sequence: 6 },
        sputnik: { label: 'Sputnik', sequence: 7 },
        covaxin: { label: 'Covaxin', sequence: 8 }
      },
      dropdown: 'dropdown_with_none',
      mandatory: true
    }),
    status: ChoiceColumn({
      label: 'Status',
      choices: {
        open: { label: 'Open', sequence: 0 },
        full: { label: 'Full', sequence: 1 },
        cancelled: { label: 'Cancelled', sequence: 2 }
      },
      dropdown: 'dropdown_with_none',
      default: 'open',
      mandatory: true
    })
  },
  allow_web_service_access: true,
  extensible: true,
  display: 'clinic'
})