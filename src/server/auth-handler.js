import { gs, GlideRecord } from '@servicenow/glide';

/**
 * Extract request body - from POST body or query params
 */
function parseRequestBody(request) {
    try {
        // Try POST body first
        if (request.body && Object.keys(request.body).length > 0) {
            gs.info('✓ Data from POST body');
            return request.body;
        }
        
        // Try query parameters (workaround for body parsing issues)
        if (request.queryParams && Object.keys(request.queryParams).length > 0) {
            gs.info('✓ Data from queryParams');
            return request.queryParams;
        }
        
        // Try stream
        if (request.getInputStream && typeof request.getInputStream === 'function') {
            try {
                const inputStream = request.getInputStream();
                if (inputStream && inputStream.available && inputStream.available() > 0) {
                    const scanner = new java.util.Scanner(inputStream).useDelimiter("\\A");
                    const bodyStr = scanner.hasNext() ? scanner.next() : "";
                    if (bodyStr && bodyStr.trim().length > 0) {
                        gs.info('✓ Data from stream');
                        return JSON.parse(bodyStr);
                    }
                }
            } catch (e) {
                gs.warn('Stream read failed');
            }
        }
        
        return null;
    } catch (e) {
        gs.error('❌ parseRequestBody error: ' + e.message);
        return null;
    }
}

/**
 * Authentication handler with login and registration support
 * @param {Object} request - REST API request
 * @param {Object} response - REST API response  
 */
export function authenticateUser(request, response) {
    response.setContentType('application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    
    try {
        gs.info('🔐 LOGIN - ' + new Date().toISOString());
        
        if (request.method === 'OPTIONS') {
            response.setStatus(200);
            response.getStreamWriter().writeString('{"status":"ok"}');
            return;
        }
        
        const credentials = parseRequestBody(request);
        
        if (!credentials || !credentials.username || !credentials.password) {
            response.setStatus(400);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Username and password are required'
            }));
            return;
        }
        
        const username = credentials.username.toString();
        const password = credentials.password.toString();
        
        gs.info('LOGIN: Authenticating user: ' + username);
        gs.info('LOGIN: Received password length: ' + password.length);
        
        // Look up user
        const user = new GlideRecord('sys_user');
        user.addQuery('active', true);
        const condition = user.addQuery('user_name', username);
        condition.addOrCondition('email', username);
        user.query();
        
        if (!user.next()) {
            gs.info('LOGIN: User not found: ' + username);
            response.setStatus(401);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Invalid credentials'
            }));
            return;
        }
        
        // Retrieve stored credentials from description field
        // Format (JSON): {"creds":{"u":"username","p":"password"},"role":"citizen"}
        const description = user.getValue('description') || '';
        gs.info('LOGIN: Description field present: ' + (description.length > 0));
        
        let storedPassword = '';
        try {
            if (description.startsWith('{')) {
                const credsObj = JSON.parse(description);
                storedPassword = credsObj.creds.p || '';
                gs.info('LOGIN: Extracted password from JSON - length: ' + storedPassword.length);
            }
        } catch (e) {
            gs.warn('LOGIN: Failed to parse JSON credentials: ' + e.message);
        }
        
        gs.info('LOGIN: Password check - received: ' + password.length + ' chars, stored: ' + storedPassword.length + ' chars');
        
        if (!storedPassword || storedPassword !== password) {
            gs.error('LOGIN: Password mismatch - received vs stored does not match');
            response.setStatus(401);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Invalid username or password'
            }));
            return;
        }
        
        gs.info('LOGIN: ✓ Password verified for ' + username);
        
        // Check if user is locked
        if (user.getValue('locked_out') == 'true') {
            gs.info('LOGIN: User locked: ' + username);
            response.setStatus(401);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Account is locked'
            }));
            return;
        }
        
        // Build response
        const userInfo = {
            sys_id: user.getUniqueValue(),
            user_name: user.getValue('user_name'),
            first_name: user.getValue('first_name') || '',
            last_name: user.getValue('last_name') || '',
            email: user.getValue('email') || '',
            description: user.getValue('description') || '',
            roles: getRoles(user.getUniqueValue())
        };
        
        gs.info('LOGIN: Success for ' + username);
        
        response.setStatus(200);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'success',
            user: userInfo
        }));
        
    } catch (error) {
        gs.error('LOGIN ERROR: ' + error.message);
        response.setStatus(500);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'error',
            error: 'Server error: ' + error.message
        }));
    }
}

function getRoles(userId) {
    const roles = [];
    try {
        // Get user to check description field for role
        const userGr = new GlideRecord('sys_user');
        userGr.get(userId);
        const description = userGr.getValue('description') || '';
        
        // Extract role from JSON description
        if (description.startsWith('{')) {
            const credObj = JSON.parse(description);
            if (credObj.role) {
                roles.push(credObj.role);
                gs.info('getRoles: Found role - ' + credObj.role);
            }
        }
        
        // Also check sys_user_has_role table for standard roles
        const userRoles = new GlideRecord('sys_user_has_role');
        userRoles.addQuery('user', userId);
        userRoles.query();
        
        while (userRoles.next()) {
            const roleGr = new GlideRecord('sys_user_role');
            if (roleGr.get(userRoles.getValue('role'))) {
                roles.push(roleGr.getValue('name'));
            }
        }
    } catch (e) {
        gs.error('AUTH API: Role fetch error: ' + e.message);
    }
    return roles;
}

/**
 * Register a new user
 * @param {Object} request - REST API request
 * @param {Object} response - REST API response
 */
export function registerUser(request, response) {
    response.setContentType('application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    
    try {
        gs.info('📝 REGISTER - ' + new Date().toISOString());
        
        if (request.method === 'OPTIONS') {
            response.setStatus(200);
            response.getStreamWriter().writeString('{"status":"ok"}');
            return;
        }
        
        let data = parseRequestBody(request);
        
        // Validate required fields
        if (!data || !data.username || !data.password || !data.email || !data.firstName || !data.lastName) {
            response.setStatus(400);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Required fields: username, password, email, firstName, lastName'
            }));
            return;
        }
        
        const role = data.role || 'citizen';
        
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
        
        // Check if email already exists
        const existingEmail = new GlideRecord('sys_user');
        existingEmail.addQuery('email', data.email);
        existingEmail.query();
        
        if (existingEmail.next()) {
            response.setStatus(409);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Email already registered'
            }));
            return;
        }
        
        // Create new user
        const newUser = new GlideRecord('sys_user');
        newUser.initialize();
        newUser.setValue('user_name', data.username);
        newUser.setValue('email', data.email);
        newUser.setValue('first_name', data.firstName);
        newUser.setValue('last_name', data.lastName);
        newUser.setValue('active', true);
        
        // Store credentials in description field as JSON
        // Format: {"creds":{"u":"username","p":"password"},"role":"citizen"}
        const credObj = {
            creds: { u: data.username, p: data.password },
            role: role
        };
        const credString = JSON.stringify(credObj);
        newUser.setValue('description', credString);
        
        gs.info('REGISTER: Storing credentials for ' + data.username);
        
        const userId = newUser.insert();
        
        if (!userId) {
            gs.error('Failed to create user: ' + data.username);
            response.setStatus(500);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Failed to create user'
            }));
            return;
        }
        
        gs.info('✓ User registered: ' + data.username + ' (ID: ' + userId + ')');
        
        // Verify the user was created and password was saved
        const verifyUser = new GlideRecord('sys_user');
        verifyUser.get(userId);
        const savedCreds = verifyUser.getValue('description') || '';
        gs.info('REGISTER: Verification - credentials saved: ' + (savedCreds.length > 0));
        
        // Fetch the new user to return complete info
        const user = new GlideRecord('sys_user');
        user.get(userId);
        
        const userInfo = {
            sys_id: user.getUniqueValue(),
            user_name: user.getValue('user_name'),
            first_name: user.getValue('first_name'),
            last_name: user.getValue('last_name'),
            email: user.getValue('email'),
            roles: getRoles(userId)
        };
        
        response.setStatus(201);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'success',
            message: 'User registered successfully',
            user: userInfo
        }));
        
    } catch (error) {
        gs.error('REGISTER API: Error - ' + error.message);
        response.setStatus(500);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'error',
            error: 'Server error: ' + error.message
        }));
    }
}

/**
 * Create a new booking request
 * @param {Object} request - REST API request
 * @param {Object} response - REST API response
 */
export function createBooking(request, response) {
    response.setContentType('application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    
    try {
        gs.info('📅 CREATE BOOKING - ' + new Date().toISOString());
        
        if (request.method === 'OPTIONS') {
            response.setStatus(200);
            response.getStreamWriter().writeString('{"status":"ok"}');
            return;
        }
        
        let data = parseRequestBody(request);
        
        // Validate required fields (referenceNumber is optional - backend generates it)
        if (!data || !data.fullName || !data.vaccineType || !data.preferredDate) {
            response.setStatus(400);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Missing required booking fields: fullName, vaccineType, preferredDate'
            }));
            return;
        }
        
        // Generate unique reference number if not provided
        let refNum = data.referenceNumber;
        if (!refNum) {
            refNum = 'EBK-' + Math.floor(100000 + Math.random() * 900000);
        }
        
        // Create booking record in custom table
        // Note: This assumes x_2009786_vaccinat_citizen_booking table exists
        const booking = new GlideRecord('x_2009786_vaccinat_citizen_booking');
        booking.initialize();
        booking.setValue('full_name', data.fullName);
        booking.setValue('contact_no', data.contactNo || '');
        booking.setValue('date_of_birth', data.dateOfBirth || '');
        booking.setValue('barangay', data.barangay || '');
        booking.setValue('vaccine_type', data.vaccineType);
        booking.setValue('preferred_date', data.preferredDate);
        booking.setValue('dose_number', data.doseNumber || '1');
        booking.setValue('health_unit', data.healthUnit || '');
        booking.setValue('reference_number', refNum);
        booking.setValue('status', 'pending'); // pending, approved, rejected
        booking.setValue('created_date', new Date().toISOString());
        booking.setValue('user_id', data.user_id || '');
        
        const bookingId = booking.insert();
        
        if (!bookingId) {
            gs.error('Failed to create booking');
            response.setStatus(500);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Failed to create booking'
            }));
            return;
        }
        
        gs.info('✓ Booking created: ' + refNum + ' with ID: ' + bookingId);
        
        response.setStatus(201);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'success',
            message: 'Booking created successfully',
            referenceNumber: refNum,
            bookingId: bookingId
        }));
        
    } catch (error) {
        gs.error('CREATE BOOKING ERROR: ' + error.message);
        response.setStatus(500);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'error',
            error: 'Server error: ' + error.message
        }));
    }
}

/**
 * Track booking status by reference number
 * @param {Object} request - REST API request
 * @param {Object} response - REST API response
 */
export function trackBooking(request, response) {
    response.setContentType('application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    
    try {
        gs.info('🔍 TRACK BOOKING - ' + new Date().toISOString());
        
        if (request.method === 'OPTIONS') {
            response.setStatus(200);
            response.getStreamWriter().writeString('{"status":"ok"}');
            return;
        }
        
        const referenceNumber = request.queryParams?.referenceNumber || request.queryParams?.ref;
        
        if (!referenceNumber) {
            response.setStatus(400);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Reference number is required'
            }));
            return;
        }
        
        // Look up booking by reference number - try exact match first
        const booking = new GlideRecord('x_2009786_vaccinat_citizen_booking');
        booking.addQuery('reference_number', 'CONTAINS', referenceNumber);
        booking.orderByDesc('created_date');
        booking.query();
        
        if (!booking.next()) {
            gs.info('Booking not found: ' + referenceNumber);
            response.setStatus(404);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Booking not found. Reference: ' + referenceNumber,
                referenceNumber: referenceNumber
            }));
            return;
        }
        
        gs.info('✓ Booking found: ' + referenceNumber);
        
        const bookingInfo = {
            referenceNumber: booking.getValue('reference_number'),
            fullName: booking.getValue('full_name'),
            status: booking.getValue('status'),
            vaccineType: booking.getValue('vaccine_type'),
            preferredDate: booking.getValue('preferred_date'),
            createdDate: booking.getValue('created_date'),
            decisionNotes: booking.getValue('decision_notes') || ''
        };
        
        response.setStatus(200);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'success',
            booking: bookingInfo
        }));
        
    } catch (error) {
        gs.error('TRACK BOOKING ERROR: ' + error.message);
        response.setStatus(500);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'error',
            error: 'Server error: ' + error.message
        }));
    }
}

/**
 * Get dashboard statistics
 * @param {Object} request - REST API request
 * @param {Object} response - REST API response
 */
export function getDashboardStats(request, response) {
    response.setContentType('application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    
    try {
        gs.info('📊 DASHBOARD STATS - ' + new Date().toISOString());
        
        if (request.method === 'OPTIONS') {
            response.setStatus(200);
            response.getStreamWriter().writeString('{"status":"ok"}');
            return;
        }
        
        // Get total bookings
        const totalBookings = new GlideRecord('x_2009786_vaccinat_citizen_booking');
        totalBookings.query();
        const totalBookingsCount = totalBookings.getRowCount();
        
        // Get completed bookings
        const completedBookings = new GlideRecord('x_2009786_vaccinat_citizen_booking');
        completedBookings.addQuery('status', 'completed');
        completedBookings.query();
        const completedCount = completedBookings.getRowCount();
        
        // Get pending bookings
        const pendingBookings = new GlideRecord('x_2009786_vaccinat_citizen_booking');
        pendingBookings.addQuery('status', 'pending');
        pendingBookings.query();
        const pendingCount = pendingBookings.getRowCount();
        
        const stats = {
            totalBookings: totalBookingsCount,
            completedBookings: completedCount,
            pendingBookings: pendingCount
        };
        
        gs.info('✓ Dashboard stats retrieved');
        
        response.setStatus(200);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'success',
            data: stats
        }));
        
    } catch (error) {
        gs.error('DASHBOARD STATS ERROR: ' + error.message);
        response.setStatus(500);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'error',
            error: 'Server error: ' + error.message
        }));
    }
}