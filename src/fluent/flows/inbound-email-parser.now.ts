import '@servicenow/sdk/global'
import { Flow, wfa, action, trigger } from '@servicenow/sdk/automation'

/**
 * Inbound Email Parser (Flow)
 * - Triggered by inbound emails
 * - Archives key email properties into Email Data
 */
export const inboundEmailParserFlow = Flow(
    {
        $id: Now.ID['inbound_email_parser_flow'],
        name: 'Inbound Email Parser',
        description: 'Archives inbound emails into Email Data for downstream parsing.',
        runAs: 'system',
        flowPriority: 'LOW',
        protection: '',
    },
    wfa.trigger(
        trigger.application.inboundEmail,
        { $id: Now.ID['inbound_email_parser_trigger'] },
        {
            // Keep conditions empty by default (qualify later if needed).
            email_conditions: '',
            target_table: '',
        }
    ),
    (params) => {
        wfa.action(
            action.core.createRecord,
            {
                $id: Now.ID['archive_inbound_email'],
            },
            {
                table_name: 'x_2009786_vaccinat_email_data',
                values: TemplateValue({
                    inbound_email: wfa.dataPill(params.trigger.inbound_email, 'reference'),
                    from_address: wfa.dataPill(params.trigger.from_address, 'string'),
                    subject: wfa.dataPill(params.trigger.subject, 'string'),
                    body_text: wfa.dataPill(params.trigger.body_text, 'string'),
                    processing_state: 'new',
                }),
            }
        )
    }
)
