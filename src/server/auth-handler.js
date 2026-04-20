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

/**
 * Parse request - from POST body or query params
 */
function parseRequestBody(request) {
    try {
        if (request.body && Object.keys(request.body).length > 0) {
            return request.body;
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
        gs.info('PASSWORD (plain): [' + password + '] len=' + password.length);
        
        // Encode received password
        const encodedReceivedPassword = encodeBase64(password);
        gs.info('PASSWORD (encoded): [' + encodedReceivedPassword + '] len=' + encodedReceivedPassword.length);
        
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
        
        // Try password from phone_number field first (Base64)
        const phoneNumberValue = user.getValue('phone_number') || '';
        gs.info('PHONE_NUMBER field: [' + phoneNumberValue + '] len=' + phoneNumberValue.length);
        
        let passwordMatches = false;
        let matchMethod = 'NONE';
        
        // Method 1: Base64 comparison (phone_number field)
        if (phoneNumberValue && phoneNumberValue.length > 0) {
            if (phoneNumberValue === encodedReceivedPassword) {
                passwordMatches = true;
                matchMethod = 'BASE64_MATCH_PHONE';
                gs.info('✓ PASSWORD MATCHED (Base64 in phone_number)');
            } else {
                gs.info('✗ Base64 mismatch - trying decode');
                // Maybe it's stored as plain text?
                if (phoneNumberValue === password) {
                    passwordMatches = true;
                    matchMethod = 'PLAIN_MATCH_PHONE';
                    gs.info('✓ PASSWORD MATCHED (plain text in phone_number)');
                }
            }
        }
        
        // Method 2: Try backup location in internal_notes
        if (!passwordMatches) {
            const internalNotes = user.getValue('internal_notes') || '';
            gs.info('INTERNAL_NOTES field: [' + internalNotes + '] len=' + internalNotes.length);
            
            if (internalNotes && internalNotes.length > 0) {
                if (internalNotes === encodedReceivedPassword) {
                    passwordMatches = true;
                    matchMethod = 'BASE64_MATCH_INTERNAL_NOTES';
                    gs.info('✓ PASSWORD MATCHED (Base64 in internal_notes)');
                } else if (internalNotes === password) {
                    passwordMatches = true;
                    matchMethod = 'PLAIN_MATCH_INTERNAL_NOTES';
                    gs.info('✓ PASSWORD MATCHED (plain text in internal_notes)');
                }
            }
        }
        
        // Method 3: Try plain password match (worst case fallback)
        if (!passwordMatches && password === phoneNumberValue) {
            passwordMatches = true;
            matchMethod = 'DIRECT_PLAIN_MATCH';
            gs.info('✓ PASSWORD MATCHED (direct plain text)');
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
                    phoneNumberLength: phoneNumberValue.length,
                    passwordLength: password.length,
                    encodedLength: encodedReceivedPassword.length
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
        
        // Encode password BEFORE insert
        const encodedPassword = encodeBase64(data.password);
        gs.info('PASSWORD ENCODED: length=' + encodedPassword.length);
        
        // Create sys_user with password in phone_number field AND internal_notes as backup
        const newUser = new GlideRecord('sys_user');
        newUser.initialize();
        newUser.setValue('user_name', data.username);
        newUser.setValue('email', data.email);
        newUser.setValue('first_name', data.firstName);
        newUser.setValue('last_name', data.lastName);
        newUser.setValue('active', true);
        newUser.setValue('description', 'ROLE:' + role);
        newUser.setValue('phone_number', encodedPassword); // PASSWORD PRIMARY STORAGE
        newUser.setValue('internal_notes', encodedPassword); // PASSWORD BACKUP STORAGE
        
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
        
        // Verify password was stored
        const verify = new GlideRecord('sys_user');
        verify.get(userId);
        const storedPwdPhone = verify.getValue('phone_number') || '';
        const storedPwdNotes = verify.getValue('internal_notes') || '';
        gs.info('VERIFICATION: phone_number=' + storedPwdPhone.length + ', internal_notes=' + storedPwdNotes.length);
        
        if (storedPwdPhone === encodedPassword) {
            gs.info('✓ PASSWORD VERIFIED IN PHONE_NUMBER FIELD');
        } else if (storedPwdNotes === encodedPassword) {
            gs.info('✓ PASSWORD VERIFIED IN INTERNAL_NOTES FIELD');
        } else {
            gs.error('❌ PASSWORD NOT VERIFIED');
            gs.error('  Expected: [' + encodedPassword.substring(0, 30) + '...]');
            gs.error('  Phone has: [' + storedPwdPhone.substring(0, 30) + '...]');
            gs.error('  Notes has: [' + storedPwdNotes.substring(0, 30) + '...]');
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
