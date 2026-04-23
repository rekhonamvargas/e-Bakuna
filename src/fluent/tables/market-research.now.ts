import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, ChoiceColumn, BooleanColumn } from '@servicenow/sdk/core'

/**
 * Market Research - Stores parsed market research signals extracted from emails.
 * Includes a recursion guard field used by the parser business rule.
 */
export const x_2009786_vaccinat_market_research = Table({
    name: 'x_2009786_vaccinat_market_research',
    label: 'Market Research',
    schema: {
        source_email: ReferenceColumn({
            label: 'Source Email',
            referenceTable: 'sys_email',
            mandatory: false,
            attributes: {
                encode_utf8: false,
            },
        }),
        email_from: StringColumn({
            label: 'Email From',
            maxLength: 255,
            mandatory: false,
        }),
        email_subject: StringColumn({
            label: 'Email Subject',
            maxLength: 255,
            mandatory: false,
        }),
        raw_body: StringColumn({
            label: 'Raw Body',
            maxLength: 4000,
            mandatory: false,
        }),
        topic: StringColumn({
            label: 'Topic',
            maxLength: 255,
            mandatory: false,
        }),
        summary: StringColumn({
            label: 'Summary',
            maxLength: 1000,
            mandatory: false,
        }),
        parsing_guard: BooleanColumn({
            label: 'Parsing Guard',
            mandatory: true,
            default: false,
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                new: { label: 'New', sequence: 0 },
                parsed: { label: 'Parsed', sequence: 1 },
                error: { label: 'Error', sequence: 2 },
            },
            dropdown: 'dropdown_with_none',
            default: 'new',
            mandatory: true,
        }),
    },
    allowWebServiceAccess: true,
    extensible: true,
    display: 'topic',
    index: [
        {
            name: 'index',
            unique: false,
            element: 'source_email',
        },
    ],
})
