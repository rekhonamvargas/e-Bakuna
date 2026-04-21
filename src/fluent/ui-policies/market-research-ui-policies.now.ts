import '@servicenow/sdk/global'
import { UiPolicy } from '@servicenow/sdk/core'

/**
 * UI Policies for Market Research
 */
export const marketResearchUiPolicy = UiPolicy({
  $id: Now.ID['market_research_ui_policy'],
  table: 'x_2009786_vaccinat_market_research',
  shortDescription: 'Hide internal parsing guard and lock email-derived fields',
  active: true,
  onLoad: true,
  reverseIfFalse: true,
  conditions: 'source_email!=NULL',
  actions: [
    {
      field: 'parsing_guard',
      visible: false,
      readOnly: true,
    },
    {
      field: 'email_from',
      readOnly: true,
    },
    {
      field: 'email_subject',
      readOnly: true,
    },
  ],
})
