import '@servicenow/sdk/global'
import { Table, StringColumn, DateColumn, IntegerColumn, ReferenceColumn, ChoiceColumn } from '@servicenow/sdk/core'

/**
 * Citizen Booking - Individual citizen vaccination bookings
 */
export const x_2009786_vaccinat_citizen_booking = Table({
    name: 'x_2009786_vaccinat_citizen_booking',
    label: 'Citizen Booking',
    schema: {
        appointment: ReferenceColumn({
            label: 'Appointment',
            referenceTable: 'x_2009786_vaccinat_appointment',
            attributes: {
                encode_utf8: false,
            },
        }),
        citizen_name: StringColumn({
            label: 'Citizen Name',
            maxLength: 100,
            mandatory: true,
        }),
        date_of_birth: DateColumn({
            label: 'Date of Birth',
            mandatory: true,
        }),
        citizen_age: IntegerColumn({
            label: 'Age',
            readOnly: true,
        }),
        contact_number: StringColumn({
            label: 'Contact Number',
            maxLength: 20,
            mandatory: true,
        }),
        barangay: StringColumn({
            label: 'Barangay',
            maxLength: 50,
            mandatory: true,
        }),
        schedule_slot: ReferenceColumn({
            label: 'Schedule Slot',
            referenceTable: 'x_2009786_vaccinat_clinic_schedule',
            attributes: {
                encode_utf8: false,
            },
        }),
        clinic_schedule: ReferenceColumn({
            label: 'Clinic Schedule',
            referenceTable: 'x_2009786_vaccinat_clinic_schedule',
            attributes: {
                encode_utf8: false,
            },
            mandatory: true,
        }),
        health_unit: StringColumn({
            label: 'Health Unit',
            maxLength: 150,
            mandatory: true,
        }),
        vaccine_type: StringColumn({
            label: 'Vaccine Type',
            maxLength: 100,
            mandatory: true,
        }),
        dose_number: ChoiceColumn({
            label: 'Dose Number',
            choices: {
                first: { label: 'First Dose', sequence: 0 },
                second: { label: 'Second Dose', sequence: 1 },
                booster: { label: 'Booster', sequence: 2 },
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
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
                t_0300_pm: { label: '03:00 PM', sequence: 6 },
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
        }),
        first_dose_date: DateColumn({
            label: 'First Dose Date',
        }),
        second_dose_date: DateColumn({
            label: 'Second Dose Date',
        }),
        booking_status: ChoiceColumn({
            label: 'Booking Status',
            choices: {
                pending: { label: 'Pending', sequence: 0 },
                confirmed: { label: 'Confirmed', sequence: 1 },
                completed: { label: 'Completed', sequence: 2 },
                cancelled: { label: 'Cancelled', sequence: 3 },
            },
            dropdown: 'dropdown_with_none',
            default: 'pending',
        }),
        booking_reference: StringColumn({
            label: 'Booking Reference',
            maxLength: 50,
            readOnly: true,
        }),
        special_requirements: StringColumn({
            label: 'Special Requirements/Medical Conditions',
            maxLength: 500,
        }),
    },
    allowWebServiceAccess: true,
    extensible: false,
    display: 'citizen_name',
    actions: ['read', 'update', 'create'],
    allowClientScripts: true,
    allowNewFields: true,
    allowUiActions: true,
    index: [
        {
            name: 'index',
            unique: false,
            element: 'schedule_slot',
        },
        {
            name: 'index2',
            unique: false,
            element: 'appointment',
        },
        {
            name: 'index3',
            unique: false,
            element: 'clinic_schedule',
        },
    ],
})
