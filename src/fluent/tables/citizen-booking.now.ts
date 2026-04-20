import '@servicenow/sdk/global'
import { 
  Table, 
  StringColumn, 
  DateColumn, 
  IntegerColumn,
  ReferenceColumn,
  ChoiceColumn
} from '@servicenow/sdk/core'

/**
 * Citizen Booking - Individual citizen vaccination bookings
 */
export const x_2009786_vaccinat_citizen_booking = Table({
  name: 'x_2009786_vaccinat_citizen_booking',
  label: 'Citizen Booking',
  schema: {
    citizen_name: StringColumn({
      label: 'Citizen Name',
      maxLength: 100,
      mandatory: true
    }),
    date_of_birth: DateColumn({
      label: 'Date of Birth',
      mandatory: true
    }),
    citizen_age: IntegerColumn({
      label: 'Age',
      read_only: true
    }),
    contact_number: StringColumn({
      label: 'Contact Number',
      maxLength: 20,
      mandatory: true
    }),
    barangay: StringColumn({
      label: 'Barangay',
      maxLength: 50,
      mandatory: true
    }),
    clinic_schedule: ReferenceColumn({
      label: 'Clinic Schedule',
      referenceTable: 'x_2009786_vaccinat_clinic_schedule',
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
    first_dose_date: DateColumn({
      label: 'First Dose Date'
    }),
    second_dose_date: DateColumn({
      label: 'Second Dose Date'
    }),
    booking_status: ChoiceColumn({
      label: 'Booking Status',
      choices: {
        pending: { label: 'Pending', sequence: 0 },
        confirmed: { label: 'Confirmed', sequence: 1 },
        completed: { label: 'Completed', sequence: 2 },
        cancelled: { label: 'Cancelled', sequence: 3 }
      },
      dropdown: 'dropdown_with_none',
      default: 'pending'
    }),
    booking_reference: StringColumn({
      label: 'Booking Reference',
      maxLength: 50,
      read_only: true
    }),
    special_requirements: StringColumn({
      label: 'Special Requirements/Medical Conditions',
      maxLength: 500
    })
  },
  allow_web_service_access: true,
  extensible: true,
  display: 'citizen_name'
})