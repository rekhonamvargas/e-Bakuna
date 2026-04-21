import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import ebakunaPage from '../../client/ebakuna.html'

/**
 * E-Bakuna Vaccination Management Dashboard
 * Modern React-based interface for managing COVID-19 vaccinations
 */
export const ebakuna_dashboard = UiPage({
  $id: Now.ID['ebakuna_dashboard'],
  endpoint: 'x_2009786_vaccinat_ebakuna.do',
  description: 'E-Bakuna - Vaccination system for Cebu City Health Office',
  category: 'general',
  html: ebakunaPage,
  direct: true
})