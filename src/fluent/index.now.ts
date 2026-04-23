import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

// Tables are defined in ./tables/ directory - only Roles and ACLs here
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

// ═══════════════════════════════════════════
// CORE DATA MODEL TABLES — e-Bakuna System
// ═══════════════════════════════════════════
export * from './tables/user-credential.now'
export * from './tables/user-role.now'
export * from './tables/clinic.now'
export * from './tables/clinic-schedule.now'
export * from './tables/appointment.now'
export * from './tables/medical-record.now'

// ═══════════════════════════════════════════
// ACCESS CONTROL LISTS (ACLs)
// ═══════════════════════════════════════════
// TODO: ACLs are currently defined in acl.now.ts but AccessControlList API is not
// available in @servicenow/sdk/core v4.6.0. These must be defined in ServiceNow UI
// or through XML update set instead. See src/fluent/acl.now.ts for required ACL matrix.
// export * from './acl.now'

// ═══════════════════════════════════════════
// ADDITIONAL TABLES — Scaffolded Workflows
// ═══════════════════════════════════════════
// citizen-booking: Legacy table actively used in auth-handler.js and EBakunaService.js
// EMAIL-DATA & MARKET-RESEARCH: Support scaffolded email processing workflow
export * from './tables/citizen-booking.now'
export * from './tables/email-data.now'
export * from './tables/market-research.now'
export * from './flows/inbound-email-parser.now'
export * from './business-rules/market-research-parser.now'
export * from './business-rules/appointment-completed-reminder.now'
export * from './business-rules/appointment-reminder-schedule.now'
export * from './navigation/application-menu.now'
export * from './ui-policies/market-research-ui-policies.now'
