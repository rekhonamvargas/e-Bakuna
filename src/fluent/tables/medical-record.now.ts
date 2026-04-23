import '@servicenow/sdk/global'
import { 
  Table, 
  StringColumn,
  DateColumn, 
  ReferenceColumn,
  BooleanColumn
} from '@servicenow/sdk/core'

/**
 * Medical Record - Individual vaccination records and medical history
 */
export const x_2009786_vaccinat_medical_record = Table({
  name: 'x_2009786_vaccinat_medical_record',
  label: 'Medical Record',
  schema: {
    appointment: ReferenceColumn({
      label: 'Appointment',
      referenceTable: 'x_2009786_vaccinat_appointment',
      mandatory: true
    }),
    citizen: ReferenceColumn({
      label: 'Citizen',
      referenceTable: 'sys_user',
      mandatory: true
    }),
    allergies: StringColumn({
      label: 'Allergies',
      maxLength: 500,
      mandatory: false
    }),
    symptoms: StringColumn({
      label: 'Symptoms',
      maxLength: 255,
      mandatory: false
    }),
    follow_up_date: DateColumn({
      label: 'Follow-up Date',
      mandatory: true
    }),
    consent_signed: BooleanColumn({
      label: 'Consent-signed',
      mandatory: true,
      default: false
    }),
    hd_fever_cough_cold: BooleanColumn({
      label: 'hd_fever_cough_cold',
      mandatory: true,
      default: false
    }),
    hd_anaphylaxis_history: BooleanColumn({
      label: 'hd_anaphylaxis_history',
      mandatory: true,
      default: false
    }),
    hd_recent_vaccine: BooleanColumn({
      label: 'hd_recent_vaccine',
      mandatory: true,
      default: false
    }),
    hd_covid_contact: BooleanColumn({
      label: 'hd_covid_contact',
      mandatory: true,
      default: false
    }),
    hd_pregnant_breastfeeding: BooleanColumn({
      label: 'hd_pregnant_breastfeeding',
      mandatory: true,
      default: false
    })
  },
  allow_web_service_access: true,
  extensible: true,
  display: 'citizen'
})