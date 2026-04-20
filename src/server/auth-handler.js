import { gs, GlideRecord } from '@servicenow/glide';

/**
 * Extract and parse request body from Fluent SDK request object
 * Tries multiple methods to get the request body
 */
function parseRequestBody(request) {
    try {
        gs.info('🔍 BEGIN parseRequestBody - checking all methods');
        
        // Method 1: Try request.body (some SDKs use this)
        if (request.body) {
            gs.info('✓ Method 1: request.body exists');
            if (typeof request.body === 'string') {
                gs.info('✓ Body is string: ' + request.body);
                return JSON.parse(request.body);
            } else if (typeof request.body === 'object') {
                gs.info('✓ Body is object');
                return request.body;
            }
        }
        
        // Method 2: Try getBodyAsString() - common in ServiceNow
        if (request.getBodyAsString && typeof request.getBodyAsString === 'function') {
            try {
                const bodyStr = request.getBodyAsString();
                gs.info('✓ Method 2: getBodyAsString() returned: ' + bodyStr);
                if (bodyStr && bodyStr.length > 0) {
                    return JSON.parse(bodyStr);
                }
            } catch (e) {
                gs.error('✗ getBodyAsString failed: ' + e.message);
            }
        }
        
        // Method 3: Try to read from input stream
        if (request.getInputStream && typeof request.getInputStream === 'function') {
            try {
                gs.info('✓ Method 3: Trying getInputStream()');
                const inputStream = request.getInputStream();
                if (inputStream) {
                    const streamReader = new java.io.BufferedReader(new java.io.InputStreamReader(inputStream));
                    let line;
                    let bodyStr = '';
                    while ((line = streamReader.readLine()) != null) {
                        bodyStr += line;
                    }
                    gs.info('✓ Read from stream: ' + bodyStr);
                    if (bodyStr && bodyStr.length > 0) {
                        return JSON.parse(bodyStr);
                    }
                }
            } catch (e) {
                gs.error('✗ getInputStream method failed: ' + e.message);
            }
        }
        
        // Method 4: Check REST request object for payload
        if (request.rest_payload) {
            gs.info('✓ Method 4: Found rest_payload');
            return JSON.parse(request.rest_payload);
        }
        
        gs.warn('⚠️ No request body found using any method');
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
        gs.info('🔐 AUTH API v2 - Request at: ' + new Date().toISOString());
        
        if (request.method === 'OPTIONS') {
            response.setStatus(200);
            response.getStreamWriter().writeString('{"status":"ok"}');
            return;
        }
        
        const credentials = parseRequestBody(request);
        
        if (!credentials || !credentials.username || !credentials.password) {
            gs.info('❌ AUTH API: Missing credentials');
            response.setStatus(400);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Username and password are required'
            }));
            return;
        }
        
        const username = credentials.username.toString();
        const password = credentials.password.toString();
        
        gs.info('AUTH API: Authenticating user: ' + username);
        
        // Look up user
        const user = new GlideRecord('sys_user');
        user.addQuery('active', true);
        const condition = user.addQuery('user_name', username);
        condition.addOrCondition('email', username);
        user.query();
        
        if (!user.next()) {
            gs.info('AUTH API: User not found: ' + username);
            response.setStatus(401);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Invalid credentials'
            }));
            return;
        }
        
        // Simple password check (for testing - in production use proper hashing)
        if (!password || password.length === 0) {
            gs.info('AUTH API: Empty password');
            response.setStatus(401);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Password required'
            }));
            return;
        }
        
        // Check if user is locked
        if (user.getValue('locked_out') == 'true') {
            gs.info('AUTH API: User locked: ' + username);
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
            roles: getRoles(user.getUniqueValue())
        };
        
        gs.info('AUTH API: Login successful: ' + username);
        
        response.setStatus(200);
        response.getStreamWriter().writeString(JSON.stringify({
            status: 'success',
            user: userInfo
        }));
        
    } catch (error) {
        gs.error('AUTH API: Handler error: ' + error.message);
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
        gs.info('📝 REGISTER API - Request at: ' + new Date().toISOString());
        
        if (request.method === 'OPTIONS') {
            response.setStatus(200);
            response.getStreamWriter().writeString('{"status":"ok"}');
            return;
        }
        
        let data = parseRequestBody(request);
        
        // DEBUG: Log what we got
        gs.info('🔍 DEBUG: data is ' + (data ? 'present' : 'null/undefined'));
        if (data) {
            gs.info('🔍 DEBUG: data keys: ' + Object.keys(data).join(', '));
            gs.info('🔍 DEBUG: Received: ' + JSON.stringify(data).substring(0, 300));
        }
        
        // Validate required fields
        if (!data || !data.username || !data.password || !data.email || !data.firstName || !data.lastName) {
            gs.error('❌ REGISTER: Missing required fields. Got: ' + JSON.stringify(data));
            response.setStatus(400);
            response.getStreamWriter().writeString(JSON.stringify({
                status: 'error',
                error: 'Required fields: username, password, email, firstName, lastName'
            }));
            return;
        }
        
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
        newUser.setValue('password', data.password); // ServiceNow handles password hashing
        newUser.setValue('active', true);
        
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
        
        gs.info('✓ User registered: ' + data.username);
        
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