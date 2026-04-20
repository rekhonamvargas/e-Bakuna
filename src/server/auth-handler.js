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
 * LOGIN - Query credentials table directly
 */
export function authenticateUser(request, response) {
    response.setContentType('application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        gs.info('===== LOGIN START (v2) =====');
        
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
        gs.info('PASSWORD: [' + password.substring(0, 10) + '...]');
        
        // Encode received password
        const encodedReceivedPassword = encodeBase64(password);
        gs.info('ENCODED PASSWORD: [' + encodedReceivedPassword.substring(0, 20) + '...]');
        
        // Query credentials table DIRECTLY
        const creds = new GlideRecord('x_2009786_vaccinat_credentials');
        creds.addQuery('username', username);
        creds.query();
        
        if (!creds.next()) {
            gs.error('CREDENTIALS NOT FOUND for ' + username);
            response.setStatus(401);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Invalid credentials'
            }));
            return;
        }
        
        const storedEncodedPassword = creds.getValue('password') || '';
        gs.info('STORED ENCODED: [' + storedEncodedPassword.substring(0, 20) + '...]');
        
        // Direct comparison of Base64 values
        const passwordMatches = (encodedReceivedPassword === storedEncodedPassword);
        gs.info('PASSWORD MATCH: ' + passwordMatches);
        
        if (!passwordMatches) {
            gs.error('PASSWORD MISMATCH');
            response.setStatus(401);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Invalid username or password'
            }));
            return;
        }
        
        // Get user info
        const userId = creds.getValue('sys_user_id');
        const user = new GlideRecord('sys_user');
        user.get(userId);
        
        if (!user.isValid()) {
            gs.error('USER NOT FOUND: ' + userId);
            response.setStatus(401);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Invalid credentials'
            }));
            return;
        }
        
        gs.info('✓ LOGIN SUCCESS for ' + username);
        
        // Get role from description or default to citizen
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
 * REGISTER - Create user AND store credentials in separate table
 */
export function registerUser(request, response) {
    response.setContentType('application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        gs.info('===== REGISTER START (v2) =====');
        
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
        gs.info('PASSWORD: [' + data.password.substring(0, 10) + '...]');
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
        
        // Create sys_user
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
        
        // Encode password
        const encodedPassword = encodeBase64(data.password);
        gs.info('PASSWORD ENCODED: length=' + encodedPassword.length);
        
        // Store credentials in SEPARATE table
        const credRecord = new GlideRecord('x_2009786_vaccinat_credentials');
        credRecord.initialize();
        credRecord.setValue('username', data.username);
        credRecord.setValue('password', encodedPassword);
        credRecord.setValue('sys_user_id', userId);
        
        const credId = credRecord.insert();
        gs.info('CREDENTIALS STORED: ID=' + credId);
        
        if (!credId) {
            gs.error('CREDENTIALS INSERT FAILED');
            response.setStatus(500);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Failed to store credentials'
            }));
            return;
        }
        
        // Verify
        const verify = new GlideRecord('x_2009786_vaccinat_credentials');
        verify.get(credId);
        const storedPwd = verify.getValue('password') || '';
        gs.info('VERIFICATION: Stored password length=' + storedPwd.length);
        
        if (storedPwd === encodedPassword) {
            gs.info('✓ CREDENTIALS VERIFIED');
        } else {
            gs.error('❌ CREDENTIALS NOT VERIFIED');
        }
        
        gs.info('✓ REGISTER SUCCESS for ' + data.username);
        
        response.setStatus(201);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'success',
            message: 'User registered successfully',
            userId: userId
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
