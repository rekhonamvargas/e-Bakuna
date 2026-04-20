import { gs, GlideRecord } from '@servicenow/glide';

/**
 * Credential Storage Service
 * Stores and verifies user credentials in a dedicated table
 * This is bulletproof - uses simple table storage instead of relying on sys_user fields
 */

/**
 * Store user credentials
 * @param {string} userId - sys_user ID
 * @param {string} username - username
 * @param {string} password - plain password
 * @returns {boolean} success
 */
export function storeCredentials(userId, username, password) {
    try {
        // Check if credentials already exist
        const existing = new GlideRecord('x_2009786_vaccinat_credentials');
        existing.addQuery('sys_user_id', userId);
        existing.query();
        
        let credRecord;
        if (existing.next()) {
            credRecord = existing;
            gs.info('STORE: Updating existing credentials for ' + username);
        } else {
            credRecord = new GlideRecord('x_2009786_vaccinat_credentials');
            credRecord.initialize();
            gs.info('STORE: Creating new credentials record for ' + username);
        }
        
        credRecord.setValue('sys_user_id', userId);
        credRecord.setValue('username', username);
        credRecord.setValue('password', password);
        credRecord.setValue('created_date', new Date().toISOString());
        
        const result = credRecord.update() || credRecord.insert();
        gs.info('STORE: Credentials stored - result=' + result);
        
        return !!result;
    } catch (e) {
        gs.error('STORE ERROR: ' + e.message);
        return false;
    }
}

/**
 * Verify credentials
 * @param {string} username - username/email
 * @param {string} password - plain password
 * @returns {object} user record if valid, null if invalid
 */
export function verifyCredentials(username, password) {
    try {
        gs.info('VERIFY: Checking credentials for [' + username + ']');
        
        // First find the credentials record
        const credRecord = new GlideRecord('x_2009786_vaccinat_credentials');
        credRecord.addQuery('username', username);
        credRecord.query();
        
        if (!credRecord.next()) {
            gs.info('VERIFY: No credentials found for ' + username);
            return null;
        }
        
        const storedPassword = credRecord.getValue('password') || '';
        gs.info('VERIFY: Password lengths - received=' + password.length + ', stored=' + storedPassword.length);
        
        // Direct comparison
        if (storedPassword !== password) {
            gs.error('VERIFY: Password mismatch');
            return null;
        }
        
        gs.info('VERIFY: Password verified!');
        
        // Now get the user record
        const userId = credRecord.getValue('sys_user_id');
        const user = new GlideRecord('sys_user');
        user.get(userId);
        
        return user;
    } catch (e) {
        gs.error('VERIFY ERROR: ' + e.message);
        return null;
    }
}
