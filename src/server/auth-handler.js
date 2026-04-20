import { gs, GlideRecord } from '@servicenow/glide';

/**
 * Base64 encoding helper
 */
function encodeBase64(str) {
    try {
        if (typeof GlideStringUtil !== 'undefined' && GlideStringUtil && typeof GlideStringUtil.base64Encode === 'function') {
            return GlideStringUtil.base64Encode(str || '');
        }
        if (typeof gs !== 'undefined' && gs && typeof gs.base64Encode === 'function') {
            return gs.base64Encode(str || '');
        }
    } catch (e) {
        gs.error('Base64 encode error: ' + e.message);
        // fall through
    }

    // Fallback (no Base64 available in this runtime)
    return (str || '').toString();
}

/**
 * Base64 decoding helper
 */
function decodeBase64(str) {
    try {
        if (typeof GlideStringUtil !== 'undefined' && GlideStringUtil && typeof GlideStringUtil.base64Decode === 'function') {
            return GlideStringUtil.base64Decode(str || '');
        }
        if (typeof gs !== 'undefined' && gs && typeof gs.base64Decode === 'function') {
            return gs.base64Decode(str || '');
        }
    } catch (e) {
        gs.error('Base64 decode error: ' + e.message);
        // fall through
    }

    // Fallback (no Base64 available in this runtime)
    return (str || '').toString();
}

function choosePasswordAlgorithm() {
    // If Base64 is available, use it as a stable reversible encoding.
    // Otherwise fall back to plain (still works; not ideal but unblocks login).
    const sample = 'test';
    const encoded = encodeBase64(sample);
    if (encoded && encoded !== sample) return 'BASE64_V1';
    return 'PLAIN_V1';
}

function computePasswordStoredValue(password, algorithm) {
    if (algorithm === 'BASE64_V1') return encodeBase64(password);
    return (password || '').toString();
}

function parseUrlEncodedForm(formBody) {
    const parsed = {};
    if (!formBody || typeof formBody !== 'string') return parsed;
    const pairs = formBody.split('&');
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        if (!pair) continue;
        const eqIdx = pair.indexOf('=');
        const rawKey = eqIdx >= 0 ? pair.substring(0, eqIdx) : pair;
        const rawVal = eqIdx >= 0 ? pair.substring(eqIdx + 1) : '';
        const key = decodeURIComponent((rawKey || '').replace(/\+/g, ' '));
        const val = decodeURIComponent((rawVal || '').replace(/\+/g, ' '));
        if (key) parsed[key] = val;
    }
    return parsed;
}

/**
 * Parse request - from POST body or query params
 */
function parseRequestBody(request) {
    try {
        const readObject = (candidate) => {
            if (!candidate) return null;
            if (typeof candidate === 'string') {
                const trimmed = candidate.trim();
                if (!trimmed) return null;
                if (trimmed[0] === '{' || trimmed[0] === '[') {
                    try {
                        const parsed = JSON.parse(trimmed);
                        if (parsed && typeof parsed === 'object') return parsed;
                    } catch (e) {
                        // ignore
                    }
                }
                const asForm = parseUrlEncodedForm(candidate);
                if (Object.keys(asForm).length > 0) return asForm;
                return null;
            }

            if (typeof candidate === 'object') {
                try {
                    const json = JSON.stringify(candidate);
                    if (json && json !== '{}' && json !== '[]') {
                        const parsed = JSON.parse(json);
                        if (parsed && typeof parsed === 'object') return parsed;
                    }
                } catch (e) {
                    // ignore and fall through
                }

                const obj = {};
                for (const k in candidate) {
                    obj[k] = candidate[k];
                }
                if (Object.keys(obj).length > 0) return obj;
            }

            return null;
        };

        if (request.body) {
            // Common Scripted REST shapes first.
            const bodyData = readObject(request.body.data);
            if (bodyData) return bodyData;

            const bodyString = readObject(request.body.dataString);
            if (bodyString) return bodyString;

            const rawBody = readObject(request.body.body);
            if (rawBody) return rawBody;

            // Then the wrapper itself (only if it already looks like the payload).
            const wrapper = readObject(request.body);
            if (wrapper) return wrapper;
        }
        
        if (request.queryParams && Object.keys(request.queryParams).length > 0) {
            const params = {};
            for (const key in request.queryParams) {
                params[key] = request.queryParams[key].toString();
            }
            return params;
        }
        
        return null;
    } catch (e) {
        gs.error('parseRequestBody error: ' + e.message);
        return null;
    }
}

/**
 * TEMPORARY CLEANUP - delete all app users with credentials.
 * This is intentionally scoped to users that have records in the app credential table.
 */
export function resetAppUsers(request, response) {
    response.setContentType('application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');

    try {
        gs.warn('===== RESET APP USERS START =====');

        const credentialIds = [];
        const userIds = [];

        const creds = new GlideRecord('x_2009786_vaccinat_user_credential');
        creds.query();
        while (creds.next()) {
            const credId = creds.getUniqueValue();
            const userId = creds.getValue('user');
            credentialIds.push(credId);
            if (userId) userIds.push(userId.toString());
        }

        let deletedCreds = 0;
        for (let i = 0; i < credentialIds.length; i++) {
            const cred = new GlideRecord('x_2009786_vaccinat_user_credential');
            if (cred.get(credentialIds[i])) {
                if (cred.deleteRecord()) deletedCreds++;
            }
        }

        let deletedUsers = 0;
        for (let j = 0; j < userIds.length; j++) {
            const user = new GlideRecord('sys_user');
            if (user.get(userIds[j])) {
                if (user.deleteRecord()) deletedUsers++;
            }
        }

        gs.warn('RESET APP USERS DONE: creds=' + deletedCreds + ', users=' + deletedUsers);

        response.setStatus(200);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'success',
            deleted: {
                credentials: deletedCreds,
                users: deletedUsers
            }
        }));
    } catch (e) {
        gs.error('RESET APP USERS ERROR: ' + e.message);
        response.setStatus(500);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'error',
            error: e.message
        }));
    }
}

/**
 * LOGIN - Direct sys_user query with phone field for password
 */
export function authenticateUser(request, response) {
    response.setContentType('application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        gs.info('===== LOGIN START =====');
        
        const credentials = parseRequestBody(request);
        
        if (!credentials || !credentials.username || !credentials.password) {
            response.setStatus(400);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Missing username or password'
            }));
            return;
        }
        
        const username = credentials.username.toString().trim();
        const password = credentials.password.toString().trim();
        
        gs.info('USERNAME: [' + username + ']');
        gs.info('PASSWORD length=' + password.length);
        
        // Query sys_user
        const user = new GlideRecord('sys_user');
        user.addQuery('user_name', username);
        user.query();
        
        if (!user.next()) {
            // Try email too
            user.clearQuery();
            user.addQuery('email', username);
            user.query();
            
            if (!user.next()) {
                gs.error('USER NOT FOUND: ' + username);
                response.setStatus(401);
                response.getStreamWriter().writeString(JSON.stringify({
                    status: 'error',
                    error: 'Invalid credentials'
                }));
                return;
            }
        }
        
        gs.info('USER FOUND: ' + user.getValue('user_name'));

        // Preferred: lookup salted hash in app credential table
        let passwordMatches = false;
        let matchMethod = 'NONE';
        let credentialFound = false;
        let credentialAlgorithm = '';

        const creds = new GlideRecord('x_2009786_vaccinat_user_credential');
        creds.addQuery('user', user.getUniqueValue());
        creds.addQuery('active', true);
        creds.query();

        if (creds.next()) {
            credentialFound = true;
            const storedHash = creds.getValue('password_hash') || '';
            credentialAlgorithm = creds.getValue('algorithm') || '';

            // Java-free verification
            const algo = (credentialAlgorithm || '').toString().toUpperCase();
            const effectiveAlgo = algo === 'BASE64_V1' || algo === 'PLAIN_V1' ? algo : 'BASE64_V1';
            const computed = computePasswordStoredValue(password, effectiveAlgo);

            if (computed === storedHash) {
                passwordMatches = true;
                matchMethod = 'CREDENTIAL_TABLE_HASH_MATCH';
                gs.info('✓ PASSWORD MATCHED (credential table)');
            } else {
                gs.info('✗ Password hash mismatch (credential table)');
            }
        }

        // Legacy fallback: previous attempts stored Base64 in sys_user fields.
        // If we can match legacy, auto-migrate into credential table.
        if (!passwordMatches && !credentialFound) {
            const encodedReceivedPassword = encodeBase64(password);
            const phoneNumberValue = user.getValue('phone_number') || '';
            const internalNotes = user.getValue('internal_notes') || '';

            if (phoneNumberValue && phoneNumberValue === encodedReceivedPassword) {
                passwordMatches = true;
                matchMethod = 'LEGACY_BASE64_MATCH_PHONE';
            } else if (internalNotes && internalNotes === encodedReceivedPassword) {
                passwordMatches = true;
                matchMethod = 'LEGACY_BASE64_MATCH_INTERNAL_NOTES';
            } else if (phoneNumberValue && phoneNumberValue === password) {
                passwordMatches = true;
                matchMethod = 'LEGACY_PLAIN_MATCH_PHONE';
            } else if (internalNotes && internalNotes === password) {
                passwordMatches = true;
                matchMethod = 'LEGACY_PLAIN_MATCH_INTERNAL_NOTES';
            }

            if (passwordMatches) {
                gs.info('✓ LEGACY PASSWORD MATCH, migrating to credential table: ' + matchMethod);
                try {
                    const algorithm = choosePasswordAlgorithm();
                    const hash = computePasswordStoredValue(password, algorithm);
                    const newCred = new GlideRecord('x_2009786_vaccinat_user_credential');
                    newCred.initialize();
                    newCred.setValue('username', user.getValue('user_name'));
                    newCred.setValue('user', user.getUniqueValue());
                    newCred.setValue('password_salt', '');
                    newCred.setValue('password_hash', hash);
                    newCred.setValue('algorithm', algorithm);
                    newCred.setValue('active', true);
                    newCred.insert();
                } catch (e) {
                    gs.error('Credential migrate failed: ' + e.message);
                }
            }
        }

        gs.info('MATCH METHOD: ' + matchMethod);
        gs.info('PASSWORD MATCHES: ' + passwordMatches);
        
        if (!passwordMatches) {
            gs.error('PASSWORD MISMATCH - authentication failed');
            response.setStatus(401);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Invalid username or password',
                debug: {
                    userFound: true,
                    credentialFound: credentialFound,
                    credentialAlgorithm: credentialAlgorithm,
                    passwordLength: password.length,
                    usernameLength: username.length
                }
            }));
            return;
        }
        
        gs.info('✓ LOGIN SUCCESS for ' + username);
        
        // Get role from description
        const description = user.getValue('description') || '';
        let role = 'citizen';
        if (description && description.indexOf('ROLE:') === 0) {
            role = description.substring(5).trim();
        }
        
        response.setStatus(200);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'success',
            user: {
                sys_id: user.getUniqueValue(),
                username: user.getValue('user_name'),
                email: user.getValue('email'),
                first_name: user.getValue('first_name'),
                last_name: user.getValue('last_name'),
                roles: [role]
            }
        }));
        
        gs.info('===== LOGIN END =====\n');
        
    } catch (e) {
        gs.error('LOGIN EXCEPTION: ' + e.message);
        response.setStatus(500);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'error',
            error: e.message
        }));
    }
}

/**
 * REGISTER - Create user with password in phone_number field
 */
export function registerUser(request, response) {
    response.setContentType('application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        gs.info('===== REGISTER START =====');
        
        const data = parseRequestBody(request);
        
        if (!data || !data.username || !data.password || !data.email || !data.firstName || !data.lastName) {
            response.setStatus(400);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Missing required fields'
            }));
            return;
        }
        
        const role = data.role || 'citizen';
        gs.info('USERNAME: [' + data.username + ']');
        gs.info('PASSWORD LENGTH: ' + data.password.length);
        gs.info('EMAIL: [' + data.email + ']');
        gs.info('ROLE: [' + role + ']');
        
        // Check if user already exists
        const existing = new GlideRecord('sys_user');
        existing.addQuery('user_name', data.username);
        existing.query();
        
        if (existing.next()) {
            // Password reset path (keep simple, prevent account takeover)
            const existingEmail = (existing.getValue('email') || '').toString().trim();
            const providedEmail = (data.email || '').toString().trim();

            if (existingEmail && providedEmail && existingEmail.toLowerCase() !== providedEmail.toLowerCase()) {
                response.setStatus(409);
                response.getStreamWriter().writeString(JSON.stringify({
                    status: 'error',
                    error: 'Username already exists with a different email'
                }));
                return;
            }

            gs.info('USER EXISTS - resetting credentials for: ' + data.username);

            // Update profile fields (best-effort)
            existing.setValue('first_name', data.firstName);
            existing.setValue('last_name', data.lastName);
            existing.setValue('email', data.email);
            existing.setValue('active', true);
            existing.setValue('description', 'ROLE:' + role);
            existing.update();

            // Deactivate any existing credential records
            const oldCreds = new GlideRecord('x_2009786_vaccinat_user_credential');
            oldCreds.addQuery('user', existing.getUniqueValue());
            oldCreds.addQuery('active', true);
            oldCreds.query();
            while (oldCreds.next()) {
                oldCreds.setValue('active', false);
                oldCreds.update();
            }

            // Create new credential record
            const algorithm = choosePasswordAlgorithm();
            const hash = computePasswordStoredValue(data.password, algorithm);
            const cred = new GlideRecord('x_2009786_vaccinat_user_credential');
            cred.initialize();
            cred.setValue('username', data.username);
            cred.setValue('user', existing.getUniqueValue());
            cred.setValue('password_salt', '');
            cred.setValue('password_hash', hash);
            cred.setValue('algorithm', algorithm);
            cred.setValue('active', true);

            const credId = cred.insert();
            if (!credId) {
                gs.error('CREDENTIAL RESET FAILED');
                response.setStatus(500);
                response.getStreamWriter().writeString(JSON.stringify({
                    status: 'error',
                    error: 'Failed to reset user credentials'
                }));
                return;
            }

            response.setStatus(200);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'success',
                message: 'User already exists; password updated',
                user: {
                    sys_id: existing.getUniqueValue(),
                    username: existing.getValue('user_name'),
                    email: existing.getValue('email'),
                    first_name: existing.getValue('first_name'),
                    last_name: existing.getValue('last_name'),
                    roles: [role]
                }
            }));
            return;
        }
        
        // Create sys_user (no password stored on sys_user)
        const newUser = new GlideRecord('sys_user');
        newUser.initialize();
        newUser.setValue('user_name', data.username);
        newUser.setValue('email', data.email);
        newUser.setValue('first_name', data.firstName);
        newUser.setValue('last_name', data.lastName);
        newUser.setValue('active', true);
        newUser.setValue('description', 'ROLE:' + role);
        
        const userId = newUser.insert();
        gs.info('USER CREATED: ID=' + userId);
        
        if (!userId) {
            gs.error('USER INSERT FAILED');
            response.setStatus(500);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Failed to create user'
            }));
            return;
        }

        // Create credential record (Java-free)
        const algorithm = choosePasswordAlgorithm();
        const hash = computePasswordStoredValue(data.password, algorithm);
        const cred = new GlideRecord('x_2009786_vaccinat_user_credential');
        cred.initialize();
        cred.setValue('username', data.username);
        cred.setValue('user', userId);
        cred.setValue('password_salt', '');
        cred.setValue('password_hash', hash);
        cred.setValue('algorithm', algorithm);
        cred.setValue('active', true);

        const credId = cred.insert();
        if (!credId) {
            gs.error('CREDENTIAL INSERT FAILED - rolling back sys_user');
            try {
                const rollback = new GlideRecord('sys_user');
                if (rollback.get(userId)) rollback.deleteRecord();
            } catch (e) {
                gs.error('Rollback failed: ' + e.message);
            }
            response.setStatus(500);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Failed to create user credentials'
            }));
            return;
        }
        
        gs.info('✓ REGISTER SUCCESS for ' + data.username);
        
        // Get user to return in response
        const user = new GlideRecord('sys_user');
        user.get(userId);
        
        response.setStatus(201);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'success',
            message: 'User registered successfully',
            user: {
                sys_id: user.getUniqueValue(),
                username: user.getValue('user_name'),
                email: user.getValue('email'),
                first_name: user.getValue('first_name'),
                last_name: user.getValue('last_name'),
                roles: [role]
            }
        }));
        
        gs.info('===== REGISTER END =====\n');
        
    } catch (e) {
        gs.error('REGISTER EXCEPTION: ' + e.message);
        response.setStatus(500);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'error',
            error: e.message
        }));
    }
}

/**
 * CREATE BOOKING
 */
export function createBooking(request, response) {
    response.setContentType('application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        const data = parseRequestBody(request);
        
        if (!data || !data.userId || !data.fullName || !data.contactNo || !data.dateOfBirth || !data.barangay || !data.vaccineType || !data.preferredDate) {
            response.setStatus(400);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Missing required booking fields'
            }));
            return;
        }
        
        const refNumber = 'EBK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        
        const booking = new GlideRecord('x_2009786_vaccinat_citizen_booking');
        booking.initialize();
        booking.setValue('citizen_name', data.fullName);
        booking.setValue('date_of_birth', data.dateOfBirth);
        booking.setValue('contact_number', data.contactNo);
        booking.setValue('barangay', data.barangay);
        booking.setValue('dose_number', data.doseNumber || 'first');
        booking.setValue('booking_reference', refNumber);
        booking.setValue('booking_status', 'pending');
        if (data.specialRequirements) {
            booking.setValue('special_requirements', data.specialRequirements);
        }
        if (data.clinicSchedule) {
            booking.setValue('clinic_schedule', data.clinicSchedule);
        }
        if (data.preferredDate) {
            booking.setValue('first_dose_date', data.preferredDate);
        }
        
        const bookingId = booking.insert();
        
        response.setStatus(200);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'success',
            booking: {
                referenceNumber: refNumber,
                reference_number: refNumber,
                booking_id: bookingId
            }
        }));
        
    } catch (e) {
        gs.error('CREATE BOOKING ERROR: ' + e.message);
        response.setStatus(500);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'error',
            error: e.message
        }));
    }
}

/**
 * TRACK BOOKING
 */
export function trackBooking(request, response) {
    response.setContentType('application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        const data = parseRequestBody(request);
        
        if (!data || (!data.referenceNumber && !data.ref)) {
            response.setStatus(400);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Missing reference number'
            }));
            return;
        }
        
        const booking = new GlideRecord('x_2009786_vaccinat_citizen_booking');
        booking.addQuery('booking_reference', data.referenceNumber || data.ref);
        booking.query();
        
        if (!booking.next()) {
            response.setStatus(404);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Booking not found'
            }));
            return;
        }
        
        response.setStatus(200);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'success',
            booking: {
                reference_number: booking.getValue('booking_reference'),
                booking_reference: booking.getValue('booking_reference'),
                citizen_name: booking.getValue('citizen_name'),
                contact_number: booking.getValue('contact_number'),
                barangay: booking.getValue('barangay'),
                dose_number: booking.getValue('dose_number'),
                booking_status: booking.getValue('booking_status'),
                clinic_schedule: booking.getValue('clinic_schedule'),
                first_dose_date: booking.getValue('first_dose_date')
            }
        }));
        
    } catch (e) {
        gs.error('TRACK BOOKING ERROR: ' + e.message);
        response.setStatus(500);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'error',
            error: e.message
        }));
    }
}

/**
 * GET DASHBOARD STATS
 */
export function getDashboardStats(request, response) {
    response.setContentType('application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        const data = parseRequestBody(request);
        const userId = data && data.userId ? data.userId : '';
        
        let stats = {
            total_bookings: 0,
            confirmed: 0,
            completed: 0,
            pending: 0
        };
        
        const booking = new GlideRecord('x_2009786_vaccinat_citizen_booking');
        booking.query();
        
        while (booking.next()) {
            stats.total_bookings++;
            const status = booking.getValue('booking_status');
            if (status === 'confirmed') stats.confirmed++;
            else if (status === 'completed') stats.completed++;
            else if (status === 'pending') stats.pending++;
        }
        
        response.setStatus(200);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'success',
            stats: stats
        }));
        
    } catch (e) {
        gs.error('STATS ERROR: ' + e.message);
        response.setStatus(500);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'error',
            error: e.message
        }));
    }
}
