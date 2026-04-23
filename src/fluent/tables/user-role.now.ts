import '@servicenow/sdk/global'
import {
  Table,
  ReferenceColumn,
  ChoiceColumn,
  BooleanColumn
} from '@servicenow/sdk/core'

/**
 * User Role - Maps e-Bakuna users to their role(s) in the system
 * 
 * This table provides proper role management for the vaccination system:
 * - Links sys_user records to e-Bakuna roles (citizen, clinic_staff, provider)
 * - Allows users to have multiple roles
 * - Tracks active/inactive status
 * 
 * DESIGN NOTE: The auth-handler currently stores roles in sys_user.description
 * as a string marker. This table provides a proper relational model for:
 * - Frontend role detection after login
 * - Role-based portal routing
 * - Multi-role support in future enhancements
 */
export const x_2009786_vaccinat_user_role = Table({
  name: 'x_2009786_vaccinat_user_role',
  label: 'User Role',
  schema: {
    user: ReferenceColumn({
      label: 'User',
      referenceTable: 'sys_user',
      mandatory: true
    }),
    role: ChoiceColumn({
      label: 'Role',
      choices: {
        citizen: { label: 'Citizen', sequence: 0 },
        clinic_staff: { label: 'Clinic Staff', sequence: 1 },
        provider: { label: 'Provider', sequence: 2 }
      },
      dropdown: 'dropdown_with_none',
      mandatory: true
    }),
    active: BooleanColumn({
      label: 'Active',
      default: true,
      mandatory: true
    })
  },
  allow_web_service_access: true,
  extensible: true,
  display: 'user'
})
