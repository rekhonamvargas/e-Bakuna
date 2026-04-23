import '@servicenow/sdk/global'
import {
    Table,
    DateTimeColumn,
    IntegerColumn,
    ReferenceColumn,
    ChoiceColumn,
    DateColumn,
    StringColumn,
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
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        start_date_time: DateTimeColumn({
            label: 'Start Date/Time',
            mandatory: true,
        }),
        end_date_time: DateTimeColumn({
            label: 'End Date/Time',
            mandatory: true,
        }),
        max_capacity: IntegerColumn({
            label: 'Max Capacity',
            mandatory: true,
        }),
        remaining_slots: IntegerColumn({
            label: 'Remaining Slots',
            mandatory: true,
        }),
        vaccine_brand: ChoiceColumn({
            label: 'Vaccine Brand',
            choices: {
                pfizer: { label: 'Pfizer', sequence: 0 },
                moderna: { label: 'Moderna', sequence: 1 },
                astrazeneca: { label: 'AstraZeneca', sequence: 2 },
                sinovac: { label: 'Sinovac', sequence: 3 },
                sinopharm: { label: 'Sinopharm', sequence: 4 },
                johnson_johnson: { label: 'Johnson & Johnson', sequence: 5 },
                novavax: { label: 'Novavax', sequence: 6 },
                sputnik: { label: 'Sputnik', sequence: 7 },
                covaxin: { label: 'Covaxin', sequence: 8 },
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                open: { label: 'Open', sequence: 0 },
                full: { label: 'Full', sequence: 1 },
                cancelled: { label: 'Cancelled', sequence: 2 },
            },
            dropdown: 'dropdown_with_none',
            default: 'open',
            mandatory: true,
        }),
        booked_slots: IntegerColumn({
            default: '0',
            label: 'Booked Slots',
            readOnly: true,
        }),
        schedule_date: DateColumn({
            label: 'Schedule Date',
            mandatory: true,
        }),
        barangay: StringColumn({
            label: 'Barangay Coverage',
            maxLength: 100,
        }),
        start_time: StringColumn({
            default: '08:00',
            label: 'Start Time',
            mandatory: true,
            maxLength: 10,
        }),
        notes: StringColumn({
            label: 'Schedule Notes',
            maxLength: 500,
        }),
        available_slots: IntegerColumn({
            functionDefinition: 'glidefunction:subtract(total_slots, booked_slots)',
            label: 'Available Slots',
            readOnly: true,
        }),
        end_time: StringColumn({
            default: '17:00',
            label: 'End Time',
            mandatory: true,
            maxLength: 10,
        }),
        total_slots: IntegerColumn({
            label: 'Total Available Slots',
            mandatory: true,
        }),
    },
    allowWebServiceAccess: true,
    extensible: false,
    display: 'clinic',
    actions: ['read', 'update', 'create'],
    allowClientScripts: true,
    allowNewFields: true,
    allowUiActions: true,
    index: [
        {
            name: 'index',
            unique: false,
            element: 'clinic',
        },
    ],
})
