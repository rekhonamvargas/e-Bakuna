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
 * Medical Record - Individual vaccination records and medical history
 */
export const x_2009786_vaccinat_medical_record = Table({
  name: 'x_2009786_vaccinat_medical_record',
  label: 'Medical Record',
  schema: {
    patient_name: StringColumn({
      label: 'Patient Name',
      maxLength: 100,
      mandatory: true
    }),
    patient_id: StringColumn({
      label: 'Patient ID/National ID',
      maxLength: 50,
      mandatory: true
    }),
    date_of_birth: DateColumn({
      label: 'Date of Birth',
      mandatory: true
    }),
    gender: ChoiceColumn({
      label: 'Gender',
      choices: {
        male: { label: 'Male', sequence: 0 },
        female: { label: 'Female', sequence: 1 },
        other: { label: 'Other', sequence: 2 }
      },
      dropdown: 'dropdown_with_none',
      mandatory: true
    }),
    contact_number: StringColumn({
      label: 'Contact Number',
      maxLength: 20
    }),
    address: StringColumn({
      label: 'Address',
      maxLength: 200
    }),
    barangay: StringColumn({
      label: 'Barangay',
      maxLength: 50,
      mandatory: true
    }),
    vaccine_brand: ChoiceColumn({
      label: 'Vaccine Brand',
      choices: {
        pfizer: { label: 'Pfizer-BioNTech', sequence: 0 },
        moderna: { label: 'Moderna', sequence: 1 },
        astrazeneca: { label: 'AstraZeneca', sequence: 2 },
        sinovac: { label: 'Sinovac', sequence: 3 },
        janssen: { label: 'Johnson & Johnson', sequence: 4 }
      },
      dropdown: 'dropdown_with_none'
    }),
    dose_number: ChoiceColumn({
      label: 'Dose Number',
      choices: {
        first: { label: 'First Dose', sequence: 0 },
        second: { label: 'Second Dose', sequence: 1 },
        booster_1: { label: 'First Booster', sequence: 2 },
        booster_2: { label: 'Second Booster', sequence: 3 }
      },
      dropdown: 'dropdown_with_none'
    }),
    vaccination_date: DateTimeColumn({
      label: 'Vaccination Date & Time'
    }),
    lot_number: StringColumn({
      label: 'Vaccine Lot Number',
      maxLength: 50
    }),
    clinic: ReferenceColumn({
      label: 'Vaccination Clinic',
      referenceTable: 'x_2009786_vaccinat_clinic'
    }),
    administered_by: StringColumn({
      label: 'Administered By',
      maxLength: 100
    }),
    side_effects: StringColumn({
      label: 'Side Effects/Adverse Reactions',
      maxLength: 1000
    }),
    medical_history: StringColumn({
      label: 'Relevant Medical History',
      maxLength: 1000
    }),
    allergies: StringColumn({
      label: 'Known Allergies',
      maxLength: 500
    }),
    next_dose_due: DateColumn({
      label: 'Next Dose Due Date'
    }),
    vaccination_status: ChoiceColumn({
      label: 'Vaccination Status',
      choices: {
        partial: { label: 'Partially Vaccinated', sequence: 0 },
        fully: { label: 'Fully Vaccinated', sequence: 1 },
        boosted: { label: 'Boosted', sequence: 2 }
      },
      dropdown: 'dropdown_with_none',
      default: 'partial'
    })
  },
  allow_web_service_access: true,
  extensible: true,
  display: 'patient_name'
})