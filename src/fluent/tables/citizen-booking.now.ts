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
 * 
 * NOTE: This table is NOT part of the core data model (which uses x_2009786_vaccinat_appointment).
 * However, it is actively used by the legacy booking workflow in:
 * - src/server/auth-handler.js (booking creation, retrieval, updates)
 * - src/client/services/EBakunaService.js (booking API calls)
 * 
 * DECISION: Keeping this table to maintain compatibility with existing production code.
 * TODO: Review if this table should be deprecated in favor of the appointment table,
 *       or if it serves a different purpose that warrants keeping both.
 */
export const x_2009786_vaccinat_citizen_booking = Table({
  name: 'x_2009786_vaccinat_citizen_booking',
  label: 'Citizen Booking',
  schema: {
    appointment: ReferenceColumn({
      label: 'Appointment',
      referenceTable: 'x_2009786_vaccinat_appointment'
    }),
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
    schedule_slot: ReferenceColumn({
      label: 'Schedule Slot',
      referenceTable: 'x_2009786_vaccinat_clinic_schedule'
    }),
    clinic_schedule: ReferenceColumn({
      label: 'Clinic Schedule',
      referenceTable: 'x_2009786_vaccinat_clinic_schedule'
    }),
    health_unit: StringColumn({
      label: 'Health Unit',
      maxLength: 150,
      mandatory: true
    }),
    vaccine_type: StringColumn({
      label: 'Vaccine Type',
      maxLength: 100,
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
    preferred_time: ChoiceColumn({
      label: 'Preferred Time',
      choices: {
        t_0900_am: { label: '09:00 AM', sequence: 0 },
        t_1000_am: { label: '10:00 AM', sequence: 1 },
        t_1100_am: { label: '11:00 AM', sequence: 2 },
        t_1200_pm: { label: '12:00 PM', sequence: 3 },
        t_0100_pm: { label: '01:00 PM', sequence: 4 },
        t_0200_pm: { label: '02:00 PM', sequence: 5 },
        t_0300_pm: { label: '03:00 PM', sequence: 6 }
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