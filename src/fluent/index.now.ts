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

// Scaffolded structure template exports
export * from './tables/email-data.now'
export * from './tables/market-research.now'
export * from './flows/inbound-email-parser.now'
export * from './business-rules/market-research-parser.now'
export * from './navigation/application-menu.now'
export * from './ui-policies/market-research-ui-policies.now'
