import '@servicenow/sdk/global'
import { 
  Table, 
  StringColumn, 
  ChoiceColumn,
  ReferenceColumn
} from '@servicenow/sdk/core'

/**
 * Clinic Table - Healthcare facility management
 */
export const x_2009786_vaccinat_clinic = Table({
  name: 'x_2009786_vaccinat_clinic',
  label: 'Clinic',
  schema: {
    clinic_name: StringColumn({
      label: 'Clinic Name',
      maxLength: 150,
      mandatory: true
    }),
    address: StringColumn({
      label: 'Address',
      maxLength: 255,
      mandatory: true
    }),
    barangay: ChoiceColumn({
      label: 'Barangay',
      choices: {
        adlaon: { label: 'Adlaon', sequence: 0 },
        agsungot: { label: 'Agsungot', sequence: 1 },
        apas: { label: 'Apas', sequence: 2 },
        bacayan: { label: 'Bacayan', sequence: 3 },
        banilad: { label: 'Banilad', sequence: 4 },
        binaliw: { label: 'Binaliw', sequence: 5 },
        bonbon: { label: 'Bonbon', sequence: 6 },
        budla_an: { label: 'Budla-an', sequence: 7 },
        busay: { label: 'Busay', sequence: 8 },
        cambinocot: { label: 'Cambinocot', sequence: 9 },
        guba: { label: 'Guba', sequence: 10 },
        kalunasan: { label: 'Kalunasan', sequence: 11 },
        lusaran: { label: 'Lusaran', sequence: 12 },
        mabini: { label: 'Mabini', sequence: 13 },
        malubog: { label: 'Malubog', sequence: 14 },
        pamutan: { label: 'Pamutan', sequence: 15 },
        paril: { label: 'Paril', sequence: 16 },
        pit_os: { label: 'Pit-os', sequence: 17 },
        pulangbato: { label: 'Pulangbato', sequence: 18 },
        pung_ol_sibugay: { label: 'Pung-ol-Sibugay', sequence: 19 },
        san_jose: { label: 'San Jose', sequence: 20 },
        sapangdaku: { label: 'Sapangdaku', sequence: 21 },
        sinsin: { label: 'Sinsin', sequence: 22 },
        sirao: { label: 'Sirao', sequence: 23 },
        sudlon_i: { label: 'Sudlon I', sequence: 24 },
        sudlon_ii: { label: 'Sudlon II', sequence: 25 },
        tabunan: { label: 'Tabunan', sequence: 26 },
        tagbao: { label: 'Tagbao', sequence: 27 },
        talamban: { label: 'Talamban', sequence: 28 },
        taptap: { label: 'Taptap', sequence: 29 },
        toong: { label: 'Toong', sequence: 30 },
        camputhaw: { label: 'Camputhaw', sequence: 31 },
        carreta: { label: 'Carreta', sequence: 32 },
        cogon_ramos: { label: 'Cogon Ramos', sequence: 33 },
        day_as: { label: 'Day-as', sequence: 34 },
        ermita: { label: 'Ermita', sequence: 35 },
        hippodromo: { label: 'Hippodromo', sequence: 36 },
        kalubihan: { label: 'Kalubihan', sequence: 37 },
        kamagayan: { label: 'Kamagayan', sequence: 38 },
        kasambagan: { label: 'Kasambagan', sequence: 39 },
        lahug: { label: 'Lahug', sequence: 40 },
        lorega_san_miguel: { label: 'Lorega San Miguel', sequence: 41 },
        luz: { label: 'Luz', sequence: 42 },
        mabolo: { label: 'Mabolo', sequence: 43 },
        pari_an: { label: 'Pari-an', sequence: 44 },
        tejero: { label: 'Tejero', sequence: 45 },
        babag: { label: 'Babag', sequence: 46 },
        basak_pardo: { label: 'Basak Pardo', sequence: 47 },
        basak_san_nicolas: { label: 'Basak San Nicolas', sequence: 48 },
        buhisan: { label: 'Buhisan', sequence: 49 },
        bulacao: { label: 'Bulacao', sequence: 50 },
        buot_taup_pardo: { label: 'Buot-Taup Pardo', sequence: 51 },
        calamba: { label: 'Calamba', sequence: 52 },
        cogon_pardo: { label: 'Cogon Pardo', sequence: 53 },
        duljo_fatima: { label: 'Duljo-Fatima', sequence: 54 },
        guadalupe: { label: 'Guadalupe', sequence: 55 },
        inayawan: { label: 'Inayawan', sequence: 56 },
        kinasang_an_pardo: { label: 'Kinasang-an Pardo', sequence: 57 },
        labangon: { label: 'Labangon', sequence: 58 },
        mambaling: { label: 'Mambaling', sequence: 59 },
        pahina_central: { label: 'Pahina Central', sequence: 60 },
        pahina_san_nicolas: { label: 'Pahina San Nicolas', sequence: 61 },
        pasil: { label: 'Pasil', sequence: 62 },
        punta_princesa: { label: 'Punta Princesa', sequence: 63 },
        quiot_pardo: { label: 'Quiot Pardo', sequence: 64 },
        san_antonio: { label: 'San Antonio', sequence: 65 },
        san_nicolas_central: { label: 'San Nicolas Central', sequence: 66 },
        san_roque: { label: 'San Roque', sequence: 67 },
        santa_cruz: { label: 'Santa Cruz', sequence: 68 },
        sawang_calero: { label: 'Sawang Calero', sequence: 69 },
        sibugay: { label: 'Sibugay', sequence: 70 },
        suba_san_nicolas: { label: 'Suba San Nicolas', sequence: 71 },
        t_padilla: { label: 'T. Padilla', sequence: 72 },
        taboan: { label: 'Taboan', sequence: 73 },
        tisa: { label: 'Tisa', sequence: 74 },
        zapatera: { label: 'Zapatera', sequence: 75 }
      },
      dropdown: 'dropdown_with_none',
      mandatory: true
    }),
    clinic_type: ChoiceColumn({
      label: 'Clinic Type',
      choices: {
        rhu: { label: 'RHU', sequence: 0 },
        cho: { label: 'CHO', sequence: 1 },
        private: { label: 'Private', sequence: 2 }
      },
      dropdown: 'dropdown_with_none',
      mandatory: true,
    }),
    provider: ReferenceColumn({
      label: 'Provider',
      referenceTable: 'sys_user',
      mandatory: true
    }),
    contact_number: StringColumn({
      label: 'Contact Number',
      maxLength: 20,
      mandatory: true
    }),
    status: ChoiceColumn({
      label: 'Status',
      choices: {
        active: { label: 'Active', sequence: 0 },
        inactive: { label: 'Inactive', sequence: 1 }
      },
      dropdown: 'dropdown_with_none',
      default: 'active',
      mandatory: true
    })
  },
  allow_web_service_access: true,
  extensible: true,
  display: 'clinic_name'
})