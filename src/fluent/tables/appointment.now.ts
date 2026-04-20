import '@servicenow/sdk/global'
import { 
  Table, 
  StringColumn, 
  DateColumn, 
  ReferenceColumn,
  ChoiceColumn,
  DateTimeColumn
} from '@servicenow/sdk/core'

/**
 * Appointment Table - Main vaccination appointment management
 */
export const x_2009786_vaccinat_appointment = Table({
  name: 'x_2009786_vaccinat_appointment',
  label: 'Vaccination Appointment',
  schema: {
    full_name: StringColumn({
      label: 'Full Name',
      maxLength: 100,
      mandatory: true
    }),
    phone: StringColumn({
      label: 'Phone Number',
      maxLength: 20,
      mandatory: true
    }),
    date_of_birth: DateColumn({
      label: 'Date of Birth',
      mandatory: true
    }),
    barangay: StringColumn({
      label: 'Barangay',
      maxLength: 50,
      mandatory: true
    }),
    clinic: ReferenceColumn({
      label: 'Clinic',
      referenceTable: 'x_2009786_vaccinat_clinic',
      mandatory: true
    }),
    vaccine_type: ChoiceColumn({
      label: 'Vaccine Type',
      choices: {
        pfizer: { label: 'Pfizer-BioNTech', sequence: 0 },
        moderna: { label: 'Moderna', sequence: 1 },
        astrazeneca: { label: 'AstraZeneca', sequence: 2 },
        sinovac: { label: 'Sinovac', sequence: 3 },
        janssen: { label: 'Johnson & Johnson', sequence: 4 }
      },
      dropdown: 'dropdown_with_none',
      mandatory: true
    }),
    dose_number: ChoiceColumn({
      label: 'Dose Number',
      choices: {
        first: { label: 'First Dose', sequence: 0 },
        second: { label: 'Second Dose', sequence: 1 },
        booster: { label: 'Booster', sequence: 2 }
      },
      dropdown: 'dropdown_with_none',
      mandatory: true
    }),
    status: ChoiceColumn({
      label: 'Status',
      choices: {
        scheduled: { label: 'Scheduled', sequence: 0 },
        completed: { label: 'Completed', sequence: 1 },
        cancelled: { label: 'Cancelled', sequence: 2 },
        no_show: { label: 'No Show', sequence: 3 }
      },
      dropdown: 'dropdown_with_none',
      default: 'scheduled'
    }),
    reference_no: StringColumn({
      label: 'Reference Number',
      maxLength: 50,
      read_only: true
    }),
    appointment_date: DateTimeColumn({
      label: 'Appointment Date & Time',
      mandatory: true
    })
  },
  allow_web_service_access: true,
  extensible: true,
  display: 'full_name'
})