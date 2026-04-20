import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, ReferenceColumn, DateTimeColumn, IntegerColumn, BooleanColumn, DateColumn, Role, Acl } from '@servicenow/sdk/core'

// Table 1: Clinic
export const x_2009786_vaccinat_clinic = Table({
    name: 'x_2009786_vaccinat_clinic',
    label: 'Clinic',
    schema: {
        clinic_name: StringColumn({ 
            label: 'Clinic Name', 
            maxLength: 100 
        }),
        address: StringColumn({ 
            label: 'Address', 
            maxLength: 255 
        }),
        contact_number: StringColumn({ 
            label: 'Contact Number', 
            maxLength: 11 
        }),
        provider: ReferenceColumn({ 
            label: 'Provider', 
            referenceTable: 'sys_user' 
        }),
        barangay: ChoiceColumn({
            label: 'Barangay',
            dropdown: 'dropdown_with_none',
            choices: {
                'adlaon': { label: 'Adlaon', sequence: 0 },
                'agsungot': { label: 'Agsungot', sequence: 1 },
                'apas': { label: 'Apas', sequence: 2 },
                'bacayan': { label: 'Bacayan', sequence: 3 },
                'banilad': { label: 'Banilad', sequence: 4 },
                'binaliw': { label: 'Binaliw', sequence: 5 },
                'bonbon': { label: 'Bonbon', sequence: 6 },
                'budla_an': { label: 'Budla-an', sequence: 7 },
                'busay': { label: 'Busay', sequence: 8 },
                'cambinocot': { label: 'Cambinocot', sequence: 9 },
                'guba': { label: 'Guba', sequence: 10 },
                'kalunasan': { label: 'Kalunasan', sequence: 11 },
                'lusaran': { label: 'Lusaran', sequence: 12 },
                'mabini': { label: 'Mabini', sequence: 13 },
                'malubog': { label: 'Malubog', sequence: 14 },
                'pamutan': { label: 'Pamutan', sequence: 15 },
                'paril': { label: 'Paril', sequence: 16 },
                'pit_os': { label: 'Pit-os', sequence: 17 },
                'pulangbato': { label: 'Pulangbato', sequence: 18 },
                'pung_ol_sibugay': { label: 'Pung-ol-Sibugay', sequence: 19 },
                'san_jose': { label: 'San Jose', sequence: 20 },
                'sapangdaku': { label: 'Sapangdaku', sequence: 21 },
                'sinsin': { label: 'Sinsin', sequence: 22 },
                'sirao': { label: 'Sirao', sequence: 23 },
                'sudlon_i': { label: 'Sudlon I', sequence: 24 },
                'sudlon_ii': { label: 'Sudlon II', sequence: 25 },
                'tabunan': { label: 'Tabunan', sequence: 26 },
                'tagbao': { label: 'Tagbao', sequence: 27 },
                'talamban': { label: 'Talamban', sequence: 28 },
                'taptap': { label: 'Taptap', sequence: 29 },
                'toong': { label: 'Toong', sequence: 30 },
                'camputhaw': { label: 'Camputhaw', sequence: 31 },
                'carreta': { label: 'Carreta', sequence: 32 },
                'cogon_ramos': { label: 'Cogon Ramos', sequence: 33 },
                'day_as': { label: 'Day-as', sequence: 34 },
                'ermita': { label: 'Ermita', sequence: 35 },
                'hippodromo': { label: 'Hippodromo', sequence: 36 },
                'kalubihan': { label: 'Kalubihan', sequence: 37 },
                'kamagayan': { label: 'Kamagayan', sequence: 38 },
                'kasambagan': { label: 'Kasambagan', sequence: 39 },
                'lahug': { label: 'Lahug', sequence: 40 },
                'lorega_san_miguel': { label: 'Lorega San Miguel', sequence: 41 },
                'luz': { label: 'Luz', sequence: 42 },
                'mabolo': { label: 'Mabolo', sequence: 43 },
                'pari_an': { label: 'Pari-an', sequence: 44 },
                'tejero': { label: 'Tejero', sequence: 45 },
                'babag': { label: 'Babag', sequence: 46 },
                'basak_pardo': { label: 'Basak Pardo', sequence: 47 },
                'basak_san_nicolas': { label: 'Basak San Nicolas', sequence: 48 },
                'buhisan': { label: 'Buhisan', sequence: 49 },
                'bulacao': { label: 'Bulacao', sequence: 50 },
                'buot_taup_pardo': { label: 'Buot-Taup Pardo', sequence: 51 },
                'calamba': { label: 'Calamba', sequence: 52 },
                'cogon_pardo': { label: 'Cogon Pardo', sequence: 53 },
                'duljo_fatima': { label: 'Duljo-Fatima', sequence: 54 },
                'guadalupe': { label: 'Guadalupe', sequence: 55 },
                'inayawan': { label: 'Inayawan', sequence: 56 },
                'kinasang_an_pardo': { label: 'Kinasang-an Pardo', sequence: 57 },
                'labangon': { label: 'Labangon', sequence: 58 },
                'mambaling': { label: 'Mambaling', sequence: 59 },
                'pahina_central': { label: 'Pahina Central', sequence: 60 },
                'pahina_san_nicolas': { label: 'Pahina San Nicolas', sequence: 61 },
                'pasil': { label: 'Pasil', sequence: 62 },
                'punta_princesa': { label: 'Punta Princesa', sequence: 63 },
                'quiot_pardo': { label: 'Quiot Pardo', sequence: 64 },
                'san_antonio': { label: 'San Antonio', sequence: 65 },
                'san_nicolas_central': { label: 'San Nicolas Central', sequence: 66 },
                'san_roque': { label: 'San Roque', sequence: 67 },
                'santa_cruz': { label: 'Santa Cruz', sequence: 68 },
                'sawang_calero': { label: 'Sawang Calero', sequence: 69 },
                'sibugay': { label: 'Sibugay', sequence: 70 },
                'suba_san_nicolas': { label: 'Suba San Nicolas', sequence: 71 },
                't_padilla': { label: 'T. Padilla', sequence: 72 },
                'taboan': { label: 'Taboan', sequence: 73 },
                'tisa': { label: 'Tisa', sequence: 74 },
                'zapatera': { label: 'Zapatera', sequence: 75 }
            }
        }),
        clinic_type: ChoiceColumn({
            label: 'Clinic Type',
            dropdown: 'dropdown_with_none',
            choices: {
                'rhu': { label: 'RHU', sequence: 0 },
                'cho': { label: 'CHO', sequence: 1 },
                'private': { label: 'Private', sequence: 2 }
            }
        }),
        status: ChoiceColumn({
            label: 'Status',
            dropdown: 'dropdown_with_none',
            choices: {
                'active': { label: 'Active', sequence: 0 },
                'inactive': { label: 'Inactive', sequence: 1 }
            }
        })
    },
    display: 'clinic_name'
})

// Table 2: Schedule
export const x_2009786_vaccinat_schedule = Table({
    name: 'x_2009786_vaccinat_schedule',
    label: 'Schedule',
    schema: {
        clinic: ReferenceColumn({ 
            label: 'Clinic',
            referenceTable: 'x_2009786_vaccinat_clinic'
        }),
        start_date_time: DateTimeColumn({ 
            label: 'Start Date Time'
        }),
        end_date_time: DateTimeColumn({ 
            label: 'End Date Time'
        }),
        vaccine_brand: ChoiceColumn({
            label: 'Vaccine Brand',
            dropdown: 'dropdown_with_none',
            choices: {
                'pfizer_biontech': { label: 'Pfizer-BioNTech', sequence: 0 },
                'moderna': { label: 'Moderna', sequence: 1 },
                'astrazeneca': { label: 'AstraZeneca', sequence: 2 },
                'sinovac': { label: 'Sinovac', sequence: 3 },
                'sinopharm': { label: 'Sinopharm', sequence: 4 },
                'johnson_johnson': { label: 'Johnson & Johnson', sequence: 5 },
                'novavax': { label: 'Novavax', sequence: 6 },
                'sputnik_v': { label: 'Sputnik V', sequence: 7 },
                'covaxin': { label: 'Covaxin', sequence: 8 }
            }
        }),
        max_capacity: IntegerColumn({ 
            label: 'Max Capacity'
        }),
        remaining_slots: IntegerColumn({ 
            label: 'Remaining Slots',
            readOnly: true // Best practice for computed values
        }),
        status: ChoiceColumn({
            label: 'Status',
            dropdown: 'dropdown_without_none',
            choices: {
                'open': { label: 'Open', sequence: 0 },
                'full': { label: 'Full', sequence: 1 },
                'cancelled': { label: 'Cancelled', sequence: 2 }
            }
        })
    }
})

// Table 3: Appointment
export const x_2009786_vaccinat_appointment = Table({
    name: 'x_2009786_vaccinat_appointment',
    label: 'Appointment',
    schema: {
        citizen: ReferenceColumn({ 
            label: 'Citizen',
            referenceTable: 'sys_user'
        }),
        schedule_slot: ReferenceColumn({ 
            label: 'Schedule Slot',
            referenceTable: 'x_2009786_vaccinat_schedule'
        }),
        reference_number: StringColumn({ 
            label: 'Reference Number', 
            maxLength: 20,
            display: true // Makes EBK-XXXXX the record identifier
        }),
        dose_number: ChoiceColumn({
            label: 'Dose Number',
            dropdown: 'dropdown_with_none',
            choices: {
                'first_dose': { label: '1st Dose', sequence: 0 },
                'second_dose': { label: '2nd Dose', sequence: 1 },
                'booster': { label: 'Booster', sequence: 2 }
            }
        }),
        status: ChoiceColumn({
            label: 'Status',
            dropdown: 'dropdown_with_none',
            choices: {
                'pending': { label: 'Pending', sequence: 0 },
                'confirmed': { label: 'Confirmed', sequence: 1 },
                'completed': { label: 'Completed', sequence: 2 },
                'no_show': { label: 'No-show', sequence: 3 },
                'cancelled': { label: 'Cancelled', sequence: 4 }
            }
        })
    }
})

// Table 4: Medical Record
export const x_2009786_vaccinat_medical_record = Table({
    name: 'x_2009786_vaccinat_medical_record',
    label: 'Medical Record',
    schema: {
        appointment: ReferenceColumn({ 
            label: 'Appointment',
            referenceTable: 'x_2009786_vaccinat_appointment'
        }),
        citizen: ReferenceColumn({ 
            label: 'Citizen',
            referenceTable: 'sys_user'
        }),
        hd_fever_cough_cold: BooleanColumn({ 
            label: 'Fever, cough, or cold today?'
        }),
        hd_covid_contact: BooleanColumn({ 
            label: 'Recent close contact with COVID-positive individual?'
        }),
        hd_anaphylaxis_history: BooleanColumn({ 
            label: 'History of severe allergic reactions (Anaphylaxis)?'
        }),
        hd_pregnant_breastfeeding: BooleanColumn({ 
            label: 'Currently pregnant or breastfeeding?'
        }),
        hd_recent_vaccine: BooleanColumn({ 
            label: 'Received another vaccine in the last 14 days?'
        }),
        allergies: StringColumn({ 
            label: 'Allergies',
            maxLength: 500
        }),
        symptoms: StringColumn({ 
            label: 'Post-vaccination symptoms',
            maxLength: 150
        }),
        follow_up_date: DateColumn({ 
            label: 'Follow-up Date'
        }),
        consent_signed: BooleanColumn({ 
            label: 'Consent signed by citizen'
        })
    }
})

// ROLES
export const citizenRole = Role({
    $id: Now.ID['citizen_role'],
    name: 'x_2009786_vaccinat.citizen',
    description: 'Role for vaccination system citizens'
})

export const clinicStaffRole = Role({
    $id: Now.ID['clinic_staff_role'],
    name: 'x_2009786_vaccinat.clinic_staff',
    description: 'Role for vaccination clinic staff members'
})

export const providerRole = Role({
    $id: Now.ID['provider_role'],
    name: 'x_2009786_vaccinat.provider',
    description: 'Role for vaccination system providers'
})

// ACLs FOR CLINIC TABLE
// Citizen - Read only
Acl({
    $id: Now.ID['clinic_citizen_read'],
    type: 'record',
    table: 'x_2009786_vaccinat_clinic',
    operation: 'read',
    roles: [citizenRole],
    description: 'Citizens can read clinic information'
})

// Clinic Staff - Read and Write
Acl({
    $id: Now.ID['clinic_staff_read'],
    type: 'record',
    table: 'x_2009786_vaccinat_clinic',
    operation: 'read',
    roles: [clinicStaffRole],
    description: 'Clinic staff can read clinic information'
})

Acl({
    $id: Now.ID['clinic_staff_write'],
    type: 'record',
    table: 'x_2009786_vaccinat_clinic',
    operation: 'write',
    roles: [clinicStaffRole],
    description: 'Clinic staff can update clinic information'
})

// Provider - Create, Read, and Write
Acl({
    $id: Now.ID['clinic_provider_create'],
    type: 'record',
    table: 'x_2009786_vaccinat_clinic',
    operation: 'create',
    roles: [providerRole],
    description: 'Providers can create new clinics'
})

Acl({
    $id: Now.ID['clinic_provider_read'],
    type: 'record',
    table: 'x_2009786_vaccinat_clinic',
    operation: 'read',
    roles: [providerRole],
    description: 'Providers can read clinic information'
})

Acl({
    $id: Now.ID['clinic_provider_write'],
    type: 'record',
    table: 'x_2009786_vaccinat_clinic',
    operation: 'write',
    roles: [providerRole],
    description: 'Providers can update clinic information'
})

// ACLs FOR SCHEDULE TABLE
// Citizen - Read only
Acl({
    $id: Now.ID['schedule_citizen_read'],
    type: 'record',
    table: 'x_2009786_vaccinat_schedule',
    operation: 'read',
    roles: [citizenRole],
    description: 'Citizens can read schedule information'
})

// Clinic Staff - Read and Write
Acl({
    $id: Now.ID['schedule_staff_read'],
    type: 'record',
    table: 'x_2009786_vaccinat_schedule',
    operation: 'read',
    roles: [clinicStaffRole],
    description: 'Clinic staff can read schedule information'
})

Acl({
    $id: Now.ID['schedule_staff_write'],
    type: 'record',
    table: 'x_2009786_vaccinat_schedule',
    operation: 'write',
    roles: [clinicStaffRole],
    description: 'Clinic staff can update schedule information'
})

// Provider - Create, Read, and Write
Acl({
    $id: Now.ID['schedule_provider_create'],
    type: 'record',
    table: 'x_2009786_vaccinat_schedule',
    operation: 'create',
    roles: [providerRole],
    description: 'Providers can create new schedules'
})

Acl({
    $id: Now.ID['schedule_provider_read'],
    type: 'record',
    table: 'x_2009786_vaccinat_schedule',
    operation: 'read',
    roles: [providerRole],
    description: 'Providers can read schedule information'
})

Acl({
    $id: Now.ID['schedule_provider_write'],
    type: 'record',
    table: 'x_2009786_vaccinat_schedule',
    operation: 'write',
    roles: [providerRole],
    description: 'Providers can update schedule information'
})

// ACLs FOR APPOINTMENT TABLE
// Citizen - Create and Read
Acl({
    $id: Now.ID['appointment_citizen_create'],
    type: 'record',
    table: 'x_2009786_vaccinat_appointment',
    operation: 'create',
    roles: [citizenRole],
    description: 'Citizens can create their own appointments'
})

Acl({
    $id: Now.ID['appointment_citizen_read'],
    type: 'record',
    table: 'x_2009786_vaccinat_appointment',
    operation: 'read',
    roles: [citizenRole],
    description: 'Citizens can read appointment information'
})

// Clinic Staff - Read and Write
Acl({
    $id: Now.ID['appointment_staff_read'],
    type: 'record',
    table: 'x_2009786_vaccinat_appointment',
    operation: 'read',
    roles: [clinicStaffRole],
    description: 'Clinic staff can read appointment information'
})

Acl({
    $id: Now.ID['appointment_staff_write'],
    type: 'record',
    table: 'x_2009786_vaccinat_appointment',
    operation: 'write',
    roles: [clinicStaffRole],
    description: 'Clinic staff can update appointment information'
})

// Provider - Read and Write
Acl({
    $id: Now.ID['appointment_provider_read'],
    type: 'record',
    table: 'x_2009786_vaccinat_appointment',
    operation: 'read',
    roles: [providerRole],
    description: 'Providers can read appointment information'
})

Acl({
    $id: Now.ID['appointment_provider_write'],
    type: 'record',
    table: 'x_2009786_vaccinat_appointment',
    operation: 'write',
    roles: [providerRole],
    description: 'Providers can update appointment information'
})

// ACLs FOR MEDICAL RECORD TABLE
// Citizen - Create and Read (own records only)
Acl({
    $id: Now.ID['medical_citizen_create'],
    type: 'record',
    table: 'x_2009786_vaccinat_medical_record',
    operation: 'create',
    roles: [citizenRole],
    description: 'Citizens can create their own medical records'
})

Acl({
    $id: Now.ID['medical_citizen_read'],
    type: 'record',
    table: 'x_2009786_vaccinat_medical_record',
    operation: 'read',
    roles: [citizenRole],
    script: `
        // Citizens can only see their own medical records
        var answer = (current.citizen == gs.getUserID());
    `,
    description: 'Citizens can read their own medical records only'
})

// Clinic Staff - Create, Read, and Write
Acl({
    $id: Now.ID['medical_staff_create'],
    type: 'record',
    table: 'x_2009786_vaccinat_medical_record',
    operation: 'create',
    roles: [clinicStaffRole],
    description: 'Clinic staff can create medical records'
})

Acl({
    $id: Now.ID['medical_staff_read'],
    type: 'record',
    table: 'x_2009786_vaccinat_medical_record',
    operation: 'read',
    roles: [clinicStaffRole],
    description: 'Clinic staff can read medical records'
})

Acl({
    $id: Now.ID['medical_staff_write'],
    type: 'record',
    table: 'x_2009786_vaccinat_medical_record',
    operation: 'write',
    roles: [clinicStaffRole],
    description: 'Clinic staff can update medical records'
})

// Provider - Read only
Acl({
    $id: Now.ID['medical_provider_read'],
    type: 'record',
    table: 'x_2009786_vaccinat_medical_record',
    operation: 'read',
    roles: [providerRole],
    description: 'Providers can read medical records'
})