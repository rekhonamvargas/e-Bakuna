import '@servicenow/sdk/global'
import {
  Table,
  StringColumn,
  DateTimeColumn,
  ReferenceColumn,
  ChoiceColumn,
} from '@servicenow/sdk/core'

/**
 * Email Data - Raw inbound email archive for downstream parsing.
 */
export const x_2009786_vaccinat_email_data = Table({
  name: 'x_2009786_vaccinat_email_data',
  label: 'Email Data',
  schema: {
    inbound_email: ReferenceColumn({
      label: 'Inbound Email',
      referenceTable: 'sys_email',
      mandatory: false,
    }),
    from_address: StringColumn({
      label: 'From',
      maxLength: 255,
      mandatory: false,
    }),
    subject: StringColumn({
      label: 'Subject',
      maxLength: 255,
      mandatory: false,
    }),
    body_text: StringColumn({
      label: 'Body Text',
      maxLength: 4000,
      mandatory: false,
    }),
    received_at: DateTimeColumn({
      label: 'Received At',
      mandatory: false,
    }),
    processing_state: ChoiceColumn({
      label: 'Processing State',
      choices: {
        new: { label: 'New', sequence: 0 },
        archived: { label: 'Archived', sequence: 1 },
        error: { label: 'Error', sequence: 2 },
      },
      dropdown: 'dropdown_with_none',
      default: 'new',
      mandatory: true,
    }),
  },
  allow_web_service_access: true,
  extensible: true,
  display: 'subject',
})
