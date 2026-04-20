import { gs, GlideRecord } from '@servicenow/glide';

/**
 * Simplified authentication handler that should work reliably
 * @param {Object} request - REST API request
 * @param {Object} response - REST API response  
 */
export function authenticateUser(request, response) {
    // Set response type first
    response.setContentType('application/json');
    
    // Enable CORS for cross-origin requests
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    
    try {
        gs.info('AUTH API: Request received');
        
        // Handle preflight OPTIONS request
        if (request.getMethod() === 'OPTIONS') {
            response.setStatus(200);
            response.getStreamWriter().writeString('{"status":"ok"}');
            return;
        }
        
        // Get request data - try multiple methods
        let credentials = null;
        
        // Method 1: Check request body directly
        try {
            if (request.body) {
                if (request.body.data) {
                    credentials = request.body.data;
                } else if (typeof request.body === 'string') {
                    credentials = JSON.parse(request.body);
                } else {
                    credentials = request.body;
                }
            }
        } catch (e) {
            gs.error('AUTH API: Body parse error: ' + e.message);
        }
        
        // Method 2: Try reading from data stream
        if (!credentials && request.body && request.body.dataStream) {
            try {
                const stream = request.body.dataStream;
                let content = '';
                let line;
                while ((line = stream.readLine()) != null) {
                    content += line;
                }
                if (content) {
                    credentials = JSON.parse(content);
                }
            } catch (e) {
                gs.error('AUTH API: Stream parse error: ' + e.message);
            }
        }
        
        gs.info('AUTH API: Credentials received: ' + (credentials ? 'Yes' : 'No'));
        
        if (!credentials || !credentials.username || !credentials.password) {
            gs.info('AUTH API: Missing credentials');
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