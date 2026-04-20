import '@servicenow/sdk/global'
import {
  Table,
  StringColumn,
  ReferenceColumn,
  BooleanColumn
} from '@servicenow/sdk/core'

/**
 * User Credential - Stores salted password hashes for app users.
 *
 * NOTE: We intentionally do NOT store passwords on sys_user fields
 * because those fields can be validated/sanitized by the platform.
 */
export const x_2009786_vaccinat_user_credential = Table({
  name: 'x_2009786_vaccinat_user_credential',
  label: 'User Credential',
  schema: {
    username: StringColumn({
      label: 'Username',
      maxLength: 120,
      mandatory: true
    }),
    user: ReferenceColumn({
      label: 'User',
      referenceTable: 'sys_user',
      mandatory: true
    }),
    password_salt: StringColumn({
      label: 'Password Salt',
      maxLength: 64,
      mandatory: true
    }),
    password_hash: StringColumn({
      label: 'Password Hash',
      maxLength: 128,
      mandatory: true
    }),
    algorithm: StringColumn({
      label: 'Algorithm',
      maxLength: 100,
      default: 'SHA256_BASE64_SALT_PREFIX_V1'
    }),
    active: BooleanColumn({
      label: 'Active',
      default: true
    })
  },
  allow_web_service_access: false,
  extensible: true,
  display: 'username'
})
