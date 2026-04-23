import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'

/**
 * Market Research Parser
 * Parses inbound/raw text fields into structured topic/summary.
 */
export const marketResearchParserBusinessRule = BusinessRule({
    $id: Now.ID['market_research_parser_br'],
    table: 'x_2009786_vaccinat_market_research',
    name: 'Market Research Parser',
    when: 'before',
    action: ['update', 'insert'],
    order: 100,
    active: true,
    script: Now.include('./market-research-parser.server.js'),
    description: 'Parses raw email fields and applies a recursion guard.',
})
