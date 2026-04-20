import { gs, GlideRecord } from '@servicenow/glide';

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
        
        let credentials = null;
        
        // TRY METHOD 1: Direct request.body (string)
        if (request.body && typeof request.body === 'string') {
            gs.info('✓ Method 1: request.body is string');
            try {
                credentials = JSON.parse(request.body);
            } catch (e) {
                gs.error('✗ Failed to parse body string: ' + e.message);
            }
        }
        // TRY METHOD 2: request.body as object
        else if (request.body && typeof request.body === 'object') {
            gs.info('✓ Method 2: request.body is object');
            credentials = request.body;
        }
        // TRY METHOD 3: Try to access via getParameter/getBodyAsString
        else {
            gs.warn('request.body not string/object, trying alternative methods');
            if (typeof request.getBodyAsString === 'function') {
                try {
                    const bodyStr = request.getBodyAsString();
                    gs.info('✓ Method 3: getBodyAsString() returned: ' + bodyStr.substring(0, 100));
                    credentials = JSON.parse(bodyStr);
                } catch (e) {
                    gs.error('✗ getBodyAsString failed: ' + e.message);
                }
            }
        }
        
        gs.info('Parsed credentials: ' + (credentials ? JSON.stringify(credentials).substring(0, 100) : 'null'));
        
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
        
        let data = null;
        
        if (request.body && typeof request.body === 'string') {
            try {
                data = JSON.parse(request.body);
            } catch (e) {
                gs.error('✗ Failed to parse body: ' + e.message);
            }
        } else if (request.body && typeof request.body === 'object') {
            data = request.body;
        } else if (typeof request.getBodyAsString === 'function') {
            try {
                const bodyStr = request.getBodyAsString();
                data = JSON.parse(bodyStr);
            } catch (e) {
                gs.error('✗ getBodyAsString failed: ' + e.message);
            }
        }
        
        // Validate required fields
        if (!data || !data.username || !data.password || !data.email || !data.firstName || !data.lastName) {
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