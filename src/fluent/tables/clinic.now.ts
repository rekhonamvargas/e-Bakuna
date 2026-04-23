import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, ReferenceColumn, BooleanColumn, IntegerColumn } from '@servicenow/sdk/core'

/**
 * Clinic Table - Healthcare facility management
 */
export const x_2009786_vaccinat_clinic = Table({
    name: 'x_2009786_vaccinat_clinic',
    label: 'Clinic',
    schema: {
        clinic_name: StringColumn({
            label: 'Clinic Name',
            maxLength: 150,
            mandatory: true,
        }),
        address: StringColumn({
            label: 'Address',
            maxLength: 255,
            mandatory: true,
        }),
        barangay: ChoiceColumn({
            label: 'Barangay',
            choices: {
                adlaon: { label: 'Adlaon', sequence: 0 },
                agsungot: { label: 'Agsungot', sequence: 1 },
                apas: { label: 'Apas', sequence: 2 },
                bacayan: { label: 'Bacayan', sequence: 3 },
                banilad: { label: 'Banilad', sequence: 4 },
                basak_san_nicolas: { label: 'Basak San Nicolas', sequence: 5 },
                camputhaw: { label: 'Camputhaw', sequence: 6 },
                capitol_site: { label: 'Capitol Site', sequence: 7 },
                guadalupe: { label: 'Guadalupe', sequence: 8 },
                lahug: { label: 'Lahug', sequence: 9 },
                mabolo: { label: 'Mabolo', sequence: 10 },
                mambaling: { label: 'Mambaling', sequence: 11 },
                talamban: { label: 'Talamban', sequence: 12 },
                tisa: { label: 'Tisa', sequence: 13 },
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
            maxLength: 50,
        }),
        clinic_type: ChoiceColumn({
            label: 'Clinic Type',
            choices: {
                rhu: { label: 'RHU', sequence: 0 },
                cho: { label: 'CHO', sequence: 1 },
                private: { label: 'Private', sequence: 2 },
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
        }),
        provider: ReferenceColumn({
            label: 'Provider',
            referenceTable: 'sys_user',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        contact_number: StringColumn({
            label: 'Contact Number',
            maxLength: 20,
            mandatory: true,
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                active: { label: 'Active', sequence: 0 },
                inactive: { label: 'Inactive', sequence: 1 },
            },
            dropdown: 'dropdown_with_none',
            default: 'active',
            mandatory: true,
        }),
        active: BooleanColumn({
            default: true,
            label: 'Active',
        }),
        email: StringColumn({
            label: 'Email',
            maxLength: 100,
        }),
        capacity: IntegerColumn({
            label: 'Daily Capacity',
            mandatory: true,
        }),
        start_time: StringColumn({
            default: '08:00',
            label: 'Operating Start Time',
            maxLength: 10,
        }),
        location: StringColumn({
            label: 'Location/Address',
            mandatory: true,
            maxLength: 200,
        }),
        contact_person: StringColumn({
            label: 'Contact Person',
            maxLength: 100,
        }),
        end_time: StringColumn({
            default: '17:00',
            label: 'Operating End Time',
            maxLength: 10,
        }),
        name: StringColumn({
            label: 'Clinic Name',
            mandatory: true,
            maxLength: 100,
        }),
    },
    allowWebServiceAccess: true,
    extensible: false,
    display: 'name',
    actions: ['read', 'update', 'create'],
    allowClientScripts: true,
    allowNewFields: true,
    allowUiActions: true,
    index: [
        {
            name: 'index',
            unique: false,
            element: 'provider',
        },
    ],
})
