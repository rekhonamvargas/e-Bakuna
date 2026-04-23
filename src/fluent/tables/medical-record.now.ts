import '@servicenow/sdk/global'
import {
    Table,
    StringColumn,
    DateColumn,
    ReferenceColumn,
    BooleanColumn,
    ChoiceColumn,
    DateTimeColumn,
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
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        citizen: ReferenceColumn({
            label: 'Citizen',
            referenceTable: 'sys_user',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        allergies: StringColumn({
            label: 'Allergies',
            maxLength: 500,
            mandatory: true,
        }),
        symptoms: StringColumn({
            label: 'Post-vaccination symptoms',
            maxLength: 255,
            mandatory: true,
        }),
        follow_up_date: DateColumn({
            label: 'Follow-up Date',
            mandatory: true,
        }),
        consent_signed: BooleanColumn({
            label: 'Consent signed by citizen',
            mandatory: true,
            default: false,
        }),
        hd_fever_cough_cold: BooleanColumn({
            label: 'Fever, cough, or cold today?',
            mandatory: true,
            default: false,
        }),
        hd_anaphylaxis_history: BooleanColumn({
            label: 'History of severe allergic reactions (Anaphylaxis)?',
            mandatory: true,
            default: false,
        }),
        hd_recent_vaccine: BooleanColumn({
            label: 'Received another vaccine in the last 14 days?',
            mandatory: true,
            default: false,
        }),
        hd_covid_contact: BooleanColumn({
            label: 'Recent close contact with COVID-positive individual?',
            mandatory: true,
            default: false,
        }),
        hd_pregnant_breastfeeding: BooleanColumn({
            label: 'Currently pregnant or breastfeeding?',
            mandatory: true,
            default: false,
        }),
        vaccination_date: DateTimeColumn({
            label: 'Vaccination Date & Time',
        }),
        medical_history: StringColumn({
            label: 'Relevant Medical History',
            maxLength: 1000,
        }),
        address: StringColumn({
            label: 'Address',
            maxLength: 200,
        }),
        vaccination_status: ChoiceColumn({
            default: 'partial',
            dropdown: 'dropdown_with_none',
            label: 'Vaccination Status',
        }),
        next_dose_due: DateColumn({
            label: 'Next Dose Due Date',
        }),
        patient_id: StringColumn({
            label: 'Patient ID/National ID',
            mandatory: true,
            maxLength: 50,
        }),
        administered_by: StringColumn({
            label: 'Administered By',
            maxLength: 100,
        }),
        contact_number: StringColumn({
            label: 'Contact Number',
            maxLength: 20,
        }),
        patient_name: StringColumn({
            label: 'Patient Name',
            mandatory: true,
            maxLength: 100,
        }),
        vaccine_brand: ChoiceColumn({
            dropdown: 'dropdown_with_none',
            label: 'Vaccine Brand',
        }),
        gender: ChoiceColumn({
            dropdown: 'dropdown_with_none',
            label: 'Gender',
            mandatory: true,
        }),
        date_of_birth: DateColumn({
            label: 'Date of Birth',
            mandatory: true,
        }),
        barangay: StringColumn({
            label: 'Barangay',
            mandatory: true,
            maxLength: 50,
        }),
        dose_number: ChoiceColumn({
            dropdown: 'dropdown_with_none',
            label: 'Dose Number',
        }),
        side_effects: StringColumn({
            label: 'Side Effects/Adverse Reactions',
            maxLength: 1000,
        }),
        clinic: ReferenceColumn({
            attributes: {
                encode_utf8: false,
            },
            label: 'Vaccination Clinic',
            referenceTable: 'x_2009786_vaccinat_clinic',
        }),
        lot_number: StringColumn({
            label: 'Vaccine Lot Number',
            maxLength: 50,
        }),
    },
    allowWebServiceAccess: true,
    extensible: false,
    display: 'patient_name',
    actions: ['read', 'update', 'create'],
    allowClientScripts: true,
    allowNewFields: true,
    allowUiActions: true,
    index: [
        {
            name: 'index',
            unique: false,
            element: 'appointment',
        },
        {
            name: 'index2',
            unique: false,
            element: 'citizen',
        },
    ],
})
