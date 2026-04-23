import '@servicenow/sdk/global'

/**
 * ACLs for e-Bakuna vaccination system
 * 
 * NOTE: ServiceNow Fluent SDK does not provide direct table ACL definitions.
 * ACLs must be created in the ServiceNow platform UI or via server-side APIs.
 * For now, this file is reserved for future ACL definitions when SDK support is added.
 * 
 * The following roles are defined in index.now.ts:
 *   - x_2009786_vaccinat.citizen
 *   - x_2009786_vaccinat.clinic_staff
 *   - x_2009786_vaccinat.provider
 * 
 * Recommended ACLs to create in ServiceNow UI:
 * 
 * CLINIC table (x_2009786_vaccinat_clinic):
 *   - provider: create, read, write
 *   - clinic_staff: read, write
 *   - citizen: read
 * 
 * CLINIC SCHEDULE table (x_2009786_vaccinat_clinic_schedule):
 *   - provider: create, read, write
 *   - clinic_staff: read, write
 *   - citizen: read
 * 
 * APPOINTMENT table (x_2009786_vaccinat_appointment):
 *   - citizen: create
 *   - citizen: read (condition: citizen=javascript:gs.getUserID())
 *   - clinic_staff: read, write
 *   - provider: read, write
 * 
 * MEDICAL RECORD table (x_2009786_vaccinat_medical_record):
 *   - citizen: create
 *   - citizen: read (condition: citizen=javascript:gs.getUserID())
 *   - clinic_staff: create, read, write
 *   - provider: read, write
 *
 * USER ROLE table (x_2009786_vaccinat_user_role):
 *   - admin: create, read, write
 */
