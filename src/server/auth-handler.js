import { gs, GlideRecord } from '@servicenow/glide';

/**
 * Base64 encoding helper
 */
function encodeBase64(str) {
    try {
        const bytes = str ? new java.lang.String(str).getBytes('UTF-8') : [];
        return java.util.Base64.getEncoder().encodeToString(bytes);
    } catch (e) {
        gs.error('Base64 encode error: ' + e.message);
        return str;
    }
}

/**
 * Base64 decoding helper
 */
function decodeBase64(str) {
    try {
        const decodedBytes = java.util.Base64.getDecoder().decode(str);
        return new java.lang.String(decodedBytes, 'UTF-8');
    } catch (e) {
        gs.error('Base64 decode error: ' + e.message);
        return str;
    }
}

function sha256Base64(str) {
    const md = java.security.MessageDigest.getInstance('SHA-256');
    const bytes = new java.lang.String(str).getBytes('UTF-8');
    const digest = md.digest(bytes);
    return java.util.Base64.getEncoder().encodeToString(digest);
}

function generateSalt() {
    try {
        if (typeof gs.generateGUID === 'function') {
            return gs.generateGUID();
        }
    } catch (e) {
        // ignore
    }
    return java.util.UUID.randomUUID().toString();
}

function computePasswordHash(password, salt) {
    return sha256Base64(salt + ':' + password);
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
        if (request.body) {
            // Fluent / Scripted REST can give us a string body for x-www-form-urlencoded
            if (typeof request.body === 'string') {
                const asForm = parseUrlEncodedForm(request.body);
                if (Object.keys(asForm).length > 0) return asForm;
            }

            // Some runtimes wrap the raw body in request.body.data
            if (request.body.data && typeof request.body.data === 'string') {
                const asForm = parseUrlEncodedForm(request.body.data);
                if (Object.keys(asForm).length > 0) return asForm;
            }

            // If it's already an object (e.g., JSON)
            if (typeof request.body === 'object' && Object.keys(request.body).length > 0) {
                return request.body;
            }
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
            const salt = creds.getValue('password_salt') || '';
            const storedHash = creds.getValue('password_hash') || '';
            credentialAlgorithm = creds.getValue('algorithm') || '';

            const computed = computePasswordHash(password, salt);
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
                    const salt = generateSalt();
                    const hash = computePasswordHash(password, salt);
                    const newCred = new GlideRecord('x_2009786_vaccinat_user_credential');
                    newCred.initialize();
                    newCred.setValue('username', user.getValue('user_name'));
                    newCred.setValue('user', user.getUniqueValue());
                    newCred.setValue('password_salt', salt);
                    newCred.setValue('password_hash', hash);
                    newCred.setValue('algorithm', 'SHA256_BASE64_SALT_PREFIX_V1');
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
            response.setStatus(409);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Username already exists'
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

        // Create credential record (salted hash)
        const salt = generateSalt();
        const hash = computePasswordHash(data.password, salt);
        const cred = new GlideRecord('x_2009786_vaccinat_user_credential');
        cred.initialize();
        cred.setValue('username', data.username);
        cred.setValue('user', userId);
        cred.setValue('password_salt', salt);
        cred.setValue('password_hash', hash);
        cred.setValue('algorithm', 'SHA256_BASE64_SALT_PREFIX_V1');
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
        
        if (!data || !data.userId || !data.vaccine || !data.date) {
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
        booking.setValue('reference_number', refNumber);
        booking.setValue('sys_user_id', data.userId);
        booking.setValue('vaccine_type', data.vaccine);
        booking.setValue('booking_date', data.date);
        booking.setValue('clinic_id', data.clinicId || '');
        booking.setValue('status', 'confirmed');
        
        const bookingId = booking.insert();
        
        response.setStatus(200);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'success',
            booking: {
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
        
        if (!data || !data.referenceNumber) {
            response.setStatus(400);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Missing reference number'
            }));
            return;
        }
        
        const booking = new GlideRecord('x_2009786_vaccinat_citizen_booking');
        booking.addQuery('reference_number', data.referenceNumber);
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
                reference_number: booking.getValue('reference_number'),
                vaccine_type: booking.getValue('vaccine_type'),
                booking_date: booking.getValue('booking_date'),
                status: booking.getValue('status'),
                clinic_id: booking.getValue('clinic_id')
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
        if (userId) {
            booking.addQuery('sys_user_id', userId);
        }
        booking.query();
        
        while (booking.next()) {
            stats.total_bookings++;
            const status = booking.getValue('status');
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
