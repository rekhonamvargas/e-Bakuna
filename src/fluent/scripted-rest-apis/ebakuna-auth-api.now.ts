import '@servicenow/sdk/global'
import { RestApi } from '@servicenow/sdk/core'
import { authenticateUser } from '../../server/auth-handler.js'

/**
 * Scripted REST API for eBakuna Authentication
 * Combines login and profile retrieval in a single endpoint
 * to avoid CSRF token timing issues
 */
RestApi({
    $id: Now.ID['ebakuna_auth_api'],
    name: 'eBakuna Authentication API',
    service_id: 'ebakuna_auth',
    short_description: 'Combined authentication and profile retrieval API for eBakuna vaccination system',
    active: true,
    consumes: 'application/json',
    produces: 'application/json',
    enforce_acl: [], // Completely remove ACL enforcement
    routes: [{
        $id: Now.ID['ebakuna_auth_login_route'],
        name: 'Login and Get Profile',
        path: '/login',
        method: 'POST',
        script: authenticateUser,
        short_description: 'Authenticate user credentials and return user profile with roles',
        version: 1,
        consumes: 'application/json',
        produces: 'application/json',
        authentication: false, // No authentication required
        authorization: false, // No authorization required
        internalRole: false, // No internal role required
        enforce_acl: [], // No ACL enforcement on this route
        request_example: JSON.stringify({
            username: "john.doe@email.com",
            password: "password123"
        })
    }],
    versions: [{
        $id: Now.ID['ebakuna_auth_version_1'],
        version: 1
    }]
})