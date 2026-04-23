import '@servicenow/sdk/global'
import { AccessControlList } from '@servicenow/sdk/core'

/**
 * ACLs for e-Bakuna vaccination system
 * Defines role-based access controls for all core tables
 */

// ═══════════════════════════════════════════
// USER ROLE TABLE ACLs
// ═══════════════════════════════════════════

export const userRoleAdminCreate = AccessControlList({
    $id: Now.ID['user_role_admin_create'],
    operation: 'create',
    table: 'x_2009786_vaccinat_user_role',
    role: 'admin',
    condition: '',
    priority: 100,
    inherit: false
})

export const userRoleAdminRead = AccessControlList({
    $id: Now.ID['user_role_admin_read'],
    operation: 'read',
    table: 'x_2009786_vaccinat_user_role',
    role: 'admin',
    condition: '',
    priority: 100,
    inherit: false
})

export const userRoleAdminWrite = AccessControlList({
    $id: Now.ID['user_role_admin_write'],
    operation: 'write',
    table: 'x_2009786_vaccinat_user_role',
    role: 'admin',
    condition: '',
    priority: 100,
    inherit: false
})

// ═══════════════════════════════════════════
// CLINIC TABLE ACLs
// ═══════════════════════════════════════════

export const clinicProviderCreate = AccessControlList({
    $id: Now.ID['clinic_provider_create'],
    operation: 'create',
    table: 'x_2009786_vaccinat_clinic',
    role: 'x_2009786_vaccinat.provider',
    condition: '',
    priority: 100,
    inherit: false
})

export const clinicProviderRead = AccessControlList({
    $id: Now.ID['clinic_provider_read'],
    operation: 'read',
    table: 'x_2009786_vaccinat_clinic',
    role: 'x_2009786_vaccinat.provider',
    condition: '',
    priority: 100,
    inherit: false
})

export const clinicProviderWrite = AccessControlList({
    $id: Now.ID['clinic_provider_write'],
    operation: 'write',
    table: 'x_2009786_vaccinat_clinic',
    role: 'x_2009786_vaccinat.provider',
    condition: '',
    priority: 100,
    inherit: false
})

export const clinicStaffRead = AccessControlList({
    $id: Now.ID['clinic_staff_read'],
    operation: 'read',
    table: 'x_2009786_vaccinat_clinic',
    role: 'x_2009786_vaccinat.clinic_staff',
    condition: '',
    priority: 100,
    inherit: false
})

export const clinicStaffWrite = AccessControlList({
    $id: Now.ID['clinic_staff_write'],
    operation: 'write',
    table: 'x_2009786_vaccinat_clinic',
    role: 'x_2009786_vaccinat.clinic_staff',
    condition: '',
    priority: 100,
    inherit: false
})

export const clinicCitizenRead = AccessControlList({
    $id: Now.ID['clinic_citizen_read'],
    operation: 'read',
    table: 'x_2009786_vaccinat_clinic',
    role: 'x_2009786_vaccinat.citizen',
    condition: '',
    priority: 100,
    inherit: false
})

// ═══════════════════════════════════════════
// CLINIC SCHEDULE TABLE ACLs
// ═══════════════════════════════════════════

export const scheduleProviderCreate = AccessControlList({
    $id: Now.ID['schedule_provider_create'],
    operation: 'create',
    table: 'x_2009786_vaccinat_clinic_schedule',
    role: 'x_2009786_vaccinat.provider',
    condition: '',
    priority: 100,
    inherit: false
})

export const scheduleProviderRead = AccessControlList({
    $id: Now.ID['schedule_provider_read'],
    operation: 'read',
    table: 'x_2009786_vaccinat_clinic_schedule',
    role: 'x_2009786_vaccinat.provider',
    condition: '',
    priority: 100,
    inherit: false
})

export const scheduleProviderWrite = AccessControlList({
    $id: Now.ID['schedule_provider_write'],
    operation: 'write',
    table: 'x_2009786_vaccinat_clinic_schedule',
    role: 'x_2009786_vaccinat.provider',
    condition: '',
    priority: 100,
    inherit: false
})

export const scheduleStaffRead = AccessControlList({
    $id: Now.ID['schedule_staff_read'],
    operation: 'read',
    table: 'x_2009786_vaccinat_clinic_schedule',
    role: 'x_2009786_vaccinat.clinic_staff',
    condition: '',
    priority: 100,
    inherit: false
})

export const scheduleStaffWrite = AccessControlList({
    $id: Now.ID['schedule_staff_write'],
    operation: 'write',
    table: 'x_2009786_vaccinat_clinic_schedule',
    role: 'x_2009786_vaccinat.clinic_staff',
    condition: '',
    priority: 100,
    inherit: false
})

export const scheduleCitizenRead = AccessControlList({
    $id: Now.ID['schedule_citizen_read'],
    operation: 'read',
    table: 'x_2009786_vaccinat_clinic_schedule',
    role: 'x_2009786_vaccinat.citizen',
    condition: '',
    priority: 100,
    inherit: false
})

// ═══════════════════════════════════════════
// APPOINTMENT TABLE ACLs
// ═══════════════════════════════════════════

export const appointmentCitizenCreate = AccessControlList({
    $id: Now.ID['appointment_citizen_create'],
    operation: 'create',
    table: 'x_2009786_vaccinat_appointment',
    role: 'x_2009786_vaccinat.citizen',
    condition: '',
    priority: 100,
    inherit: false
})

export const appointmentCitizenRead = AccessControlList({
    $id: Now.ID['appointment_citizen_read'],
    operation: 'read',
    table: 'x_2009786_vaccinat_appointment',
    role: 'x_2009786_vaccinat.citizen',
    condition: 'citizen=javascript:gs.getUserID()',
    priority: 100,
    inherit: false
})

export const appointmentStaffRead = AccessControlList({
    $id: Now.ID['appointment_staff_read'],
    operation: 'read',
    table: 'x_2009786_vaccinat_appointment',
    role: 'x_2009786_vaccinat.clinic_staff',
    condition: '',
    priority: 100,
    inherit: false
})

export const appointmentStaffWrite = AccessControlList({
    $id: Now.ID['appointment_staff_write'],
    operation: 'write',
    table: 'x_2009786_vaccinat_appointment',
    role: 'x_2009786_vaccinat.clinic_staff',
    condition: '',
    priority: 100,
    inherit: false
})

export const appointmentProviderRead = AccessControlList({
    $id: Now.ID['appointment_provider_read'],
    operation: 'read',
    table: 'x_2009786_vaccinat_appointment',
    role: 'x_2009786_vaccinat.provider',
    condition: '',
    priority: 100,
    inherit: false
})

export const appointmentProviderWrite = AccessControlList({
    $id: Now.ID['appointment_provider_write'],
    operation: 'write',
    table: 'x_2009786_vaccinat_appointment',
    role: 'x_2009786_vaccinat.provider',
    condition: '',
    priority: 100,
    inherit: false
})

// ═══════════════════════════════════════════
// MEDICAL RECORD TABLE ACLs
// ═══════════════════════════════════════════

export const medicalRecordCitizenCreate = AccessControlList({
    $id: Now.ID['medical_record_citizen_create'],
    operation: 'create',
    table: 'x_2009786_vaccinat_medical_record',
    role: 'x_2009786_vaccinat.citizen',
    condition: '',
    priority: 100,
    inherit: false
})

export const medicalRecordCitizenRead = AccessControlList({
    $id: Now.ID['medical_record_citizen_read'],
    operation: 'read',
    table: 'x_2009786_vaccinat_medical_record',
    role: 'x_2009786_vaccinat.citizen',
    condition: 'citizen=javascript:gs.getUserID()',
    priority: 100,
    inherit: false
})

export const medicalRecordStaffCreate = AccessControlList({
    $id: Now.ID['medical_record_staff_create'],
    operation: 'create',
    table: 'x_2009786_vaccinat_medical_record',
    role: 'x_2009786_vaccinat.clinic_staff',
    condition: '',
    priority: 100,
    inherit: false
})

export const medicalRecordStaffRead = AccessControlList({
    $id: Now.ID['medical_record_staff_read'],
    operation: 'read',
    table: 'x_2009786_vaccinat_medical_record',
    role: 'x_2009786_vaccinat.clinic_staff',
    condition: '',
    priority: 100,
    inherit: false
})

export const medicalRecordStaffWrite = AccessControlList({
    $id: Now.ID['medical_record_staff_write'],
    operation: 'write',
    table: 'x_2009786_vaccinat_medical_record',
    role: 'x_2009786_vaccinat.clinic_staff',
    condition: '',
    priority: 100,
    inherit: false
})

export const medicalRecordProviderRead = AccessControlList({
    $id: Now.ID['medical_record_provider_read'],
    operation: 'read',
    table: 'x_2009786_vaccinat_medical_record',
    role: 'x_2009786_vaccinat.provider',
    condition: '',
    priority: 100,
    inherit: false
})

export const medicalRecordProviderWrite = AccessControlList({
    $id: Now.ID['medical_record_provider_write'],
    operation: 'write',
    table: 'x_2009786_vaccinat_medical_record',
    role: 'x_2009786_vaccinat.provider',
    condition: '',
    priority: 100,
    inherit: false
})
