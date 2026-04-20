import '@servicenow/sdk/global'
import { 
  Table, 
  StringColumn, 
  IntegerColumn, 
  BooleanColumn
} from '@servicenow/sdk/core'

/**
 * Clinic Table - Healthcare facility management
 */
export const x_2009786_vaccinat_clinic = Table({
  name: 'x_2009786_vaccinat_clinic',
  label: 'Vaccination Clinic',
  schema: {
    name: StringColumn({
      label: 'Clinic Name',
      maxLength: 100,
      mandatory: true
    }),
    location: StringColumn({
      label: 'Location/Address',
      maxLength: 200,
      mandatory: true
    }),
    barangay: StringColumn({
      label: 'Barangay',
      maxLength: 50,
      mandatory: true
    }),
    capacity: IntegerColumn({
      label: 'Daily Capacity',
      mandatory: true,
      min: 1,
      max: 1000
    }),
    start_time: StringColumn({
      label: 'Operating Start Time',
      maxLength: 10,
      default: '08:00'
    }),
    end_time: StringColumn({
      label: 'Operating End Time', 
      maxLength: 10,
      default: '17:00'
    }),
    active: BooleanColumn({
      label: 'Active',
      default: true
    }),
    contact_person: StringColumn({
      label: 'Contact Person',
      maxLength: 100
    }),
    contact_number: StringColumn({
      label: 'Contact Number',
      maxLength: 20
    }),
    email: StringColumn({
      label: 'Email',
      maxLength: 100
    })
  },
  allow_web_service_access: true,
  extensible: true,
  display: 'name'
})