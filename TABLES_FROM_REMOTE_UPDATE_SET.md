# e-Bakuna Table Guide (from Remote Update Set)

Source update set:
- Name: `e-Bakuna_AQUINO_Increment1_Initial_Tables`
- Scope: `x_2011953_e_bakuna`
- Remote update set sys_id: `3d49fbee5318471029f950c0a0490e67`

This file summarizes the table structure found in the XML you shared so it can be used as the schema guide.

## Core tables detected

1. `x_2011953_e_bakuna_clinic` (Clinic)
2. `x_2011953_e_bakuna_schedule` (Schedule)
3. `x_2011953_e_bakuna_appointment` (Appointment)
4. `x_2011953_e_bakuna_medical_record` (Medical Record)

## 1) Clinic table

Table: `x_2011953_e_bakuna_clinic`

Detected fields:
- `clinic_name` (string, mandatory)
- `address` (string, mandatory)
- `barangay` (choice, mandatory)
- `clinic_type` (choice, mandatory)
- `provider` (reference -> `sys_user`, mandatory)
- `contact_number` (string, mandatory)
- `status` (choice, mandatory)

Detected choice sets:
- `clinic_type`: `rhu`, `cho`, `private`
- `status`: `active`, `inactive`
- `barangay`: large predefined list of Cebu barangays (many values in update set)

## 2) Schedule table

Table: `x_2011953_e_bakuna_schedule`

Detected fields:
- `clinic` (reference -> `x_2011953_e_bakuna_clinic`, mandatory)
- `start_date_time` (glide_date_time, mandatory)
- `end_date_time` (glide_date_time, mandatory)
- `max_capacity` (integer, mandatory)
- `remaining_slots` (integer, mandatory)
- `vaccine_brand` (choice, mandatory)
- `status` (choice, mandatory)

Detected choice sets:
- `status`: `open`, `full`, `cancelled`
- `vaccine_brand`: includes values such as `pfizer`, `moderna`, `astrazeneca`, `sinovac`, `sinopharm`, `johnson_johnson`, `novavax`, `sputnik`, `covaxin`

## 3) Appointment table

Table: `x_2011953_e_bakuna_appointment`

Detected fields:
- `citizen` (reference, mandatory)
- `schedule_slot` (reference -> `x_2011953_e_bakuna_schedule`, mandatory)
- `dose_number` (choice, mandatory)
- `status` (choice, mandatory)

Detected choice sets:
- `dose_number`: `1st`, `2nd`, `booster`
- `status`: includes `completed`, `no_show`, `confirmed` (full set should be verified directly in instance list view)

## 4) Medical Record table

Table: `x_2011953_e_bakuna_medical_record`

Detected fields:
- `appointment` (reference -> `x_2011953_e_bakuna_appointment`, mandatory)
- `citizen` (reference, mandatory)
- `allergies` (string, mandatory)
- `symptoms` (string, mandatory)
- `follow_up_date` (glide_date, mandatory)
- `consent_signed` (boolean, mandatory)
- `hd_fever_cough_cold` (boolean, mandatory)
- `hd_anaphylaxis_history` (boolean, mandatory)
- `hd_recent_vaccine` (boolean, mandatory)
- `hd_covid_contact` (boolean, mandatory)
- `hd_pregnant_breastfeeding` (boolean, mandatory)

## Security/ACL patterns detected

Across all 4 core tables, the update set includes record ACLs and role mappings for:
- app admin role
- citizen role
- clinic staff role
- provider role

## Notes for your current project

Your current repo table files use scope `x_2009786_vaccinat_*` and include an additional table:
- `x_2009786_vaccinat_citizen_booking`

To avoid breaking your current backend scripts, keep that table for now, then align fields gradually to this guide.

## Suggested migration order

1. Align clinic schema and choices
2. Align schedule schema and choices
3. Align appointment references (`citizen`, `schedule_slot`)
4. Align medical record health declaration fields
5. Regenerate keys/build artifacts
6. Update script logic only after table names/fields are finalized
