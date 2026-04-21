import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'

/**
 * Application Menu + Modules (Navigation)
 */
export const eBakunaMenu = ApplicationMenu({
  $id: Now.ID['ebakuna_app_menu'],
  title: 'e-Bakuna',
  active: true,
  name: 'x_2009786_vaccinat.e_bakuna',
  order: 100,
})

export const marketResearchModule = Record({
  $id: Now.ID['ebakuna_market_research_module'],
  table: 'sys_app_module',
  data: {
    title: 'Market Research',
    application: eBakunaMenu,
    active: true,
    link_type: 'LIST',
    name: 'x_2009786_vaccinat_market_research',
    order: 100,
  },
})

export const emailDataModule = Record({
  $id: Now.ID['ebakuna_email_data_module'],
  table: 'sys_app_module',
  data: {
    title: 'Email Data',
    application: eBakunaMenu,
    active: true,
    link_type: 'LIST',
    name: 'x_2009786_vaccinat_email_data',
    order: 110,
  },
})
