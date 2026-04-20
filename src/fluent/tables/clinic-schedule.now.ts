import '@servicenow/sdk/global'
import { 
  Table, 
  StringColumn, 
  DateColumn, 
  IntegerColumn,
  ReferenceColumn
} from '@servicenow/sdk/core'

/**
 * Clinic Schedule - Daily vaccination schedules per clinic
 */
export const x_2009786_vaccinat_clinic_schedule = Table({
  name: 'x_2009786_vaccinat_clinic_schedule',
  label: 'Clinic Schedule',
  schema: {
    clinic: ReferenceColumn({
      label: 'Clinic',
      referenceTable: 'x_2009786_vaccinat_clinic',
      mandatory: true
    }),
    schedule_date: DateColumn({
      label: 'Schedule Date',
      mandatory: true
    }),
    start_time: StringColumn({
      label: 'Start Time',
      maxLength: 10,
      default: '08:00',
      mandatory: true
    }),
    end_time: StringColumn({
      label: 'End Time',
      maxLength: 10,
      default: '17:00', 
      mandatory: true
    }),
    total_slots: IntegerColumn({
      label: 'Total Available Slots',
      mandatory: true,
      min: 1,
      max: 500
    }),
    booked_slots: IntegerColumn({
      label: 'Booked Slots',
      default: 0,
      read_only: true
    }),
    available_slots: IntegerColumn({
      label: 'Available Slots',
      read_only: true,
      function_definition: 'glidefunction:subtract(total_slots, booked_slots)'
    }),
    barangay: StringColumn({
      label: 'Barangay Coverage',
      maxLength: 100
    }),
    notes: StringColumn({
      label: 'Schedule Notes',
      maxLength: 500
    })
  },
  allow_web_service_access: true,
  extensible: true,
  display: 'clinic'
})