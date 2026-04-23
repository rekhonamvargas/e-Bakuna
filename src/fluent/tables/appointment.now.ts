import '@servicenow/sdk/global'
import { Table, ReferenceColumn, ChoiceColumn, DateColumn, DateTimeColumn, StringColumn } from '@servicenow/sdk/core'

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
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        schedule_slot: ReferenceColumn({
            label: 'Schedule Slot',
            referenceTable: 'x_2009786_vaccinat_schedule',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        dose_number: ChoiceColumn({
            label: 'Dose Number',
            choices: {
                st: { label: '1st', sequence: 0 },
                nd: { label: '2nd', sequence: 1 },
                booster: { label: 'Booster', sequence: 2 },
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                confirmed: { label: 'Confirmed', sequence: 0 },
                completed: { label: 'Completed', sequence: 1 },
                no_show: { label: 'No-show', sequence: 2 },
                cancelled: { label: 'Cancelled', sequence: 3 },
            },
            dropdown: 'dropdown_with_none',
            default: 'confirmed',
            mandatory: true,
        }),
        reference_no: StringColumn({
            label: 'Reference Number',
            maxLength: 50,
            readOnly: true,
        }),
        full_name: StringColumn({
            label: 'Full Name',
            mandatory: true,
            maxLength: 100,
        }),
        reference_number: StringColumn({
            label: 'Reference Number',
            maxLength: 20,
        }),
        barangay: StringColumn({
            label: 'Barangay',
            mandatory: true,
            maxLength: 50,
        }),
        vaccine_type: ChoiceColumn({
            dropdown: 'dropdown_with_none',
            label: 'Vaccine Type',
            mandatory: true,
        }),
        phone: StringColumn({
            label: 'Phone Number',
            mandatory: true,
            maxLength: 20,
        }),
        date_of_birth: DateColumn({
            label: 'Date of Birth',
            mandatory: true,
        }),
        appointment_date: DateTimeColumn({
            label: 'Appointment Date & Time',
            mandatory: true,
        }),
        clinic: ReferenceColumn({
            attributes: {
                encode_utf8: false,
            },
            label: 'Clinic',
            mandatory: true,
            referenceTable: 'x_2009786_vaccinat_clinic',
        }),
    },
    allowWebServiceAccess: true,
    extensible: false,
    display: 'full_name',
    actions: ['read', 'update', 'create'],
    allowClientScripts: true,
    allowNewFields: true,
    allowUiActions: true,
    index: [
        {
            name: 'index',
            unique: false,
            element: 'citizen',
        },
        {
            name: 'index2',
            unique: false,
            element: 'schedule_slot',
        },
    ],
})
