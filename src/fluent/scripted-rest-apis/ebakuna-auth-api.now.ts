import '@servicenow/sdk/global'
import { RestApi } from '@servicenow/sdk/core'
import { authenticateUser, registerUser, createBooking, trackBooking } from '../../server/auth-handler.js'

/**
 * Scripted REST API for eBakuna Authentication
 * Provides login and registration endpoints
 */
RestApi({
    $id: Now.ID['ebakuna_auth_api'],
    name: 'eBakuna Authentication API',
    service_id: 'ebakuna_auth',
    short_description: 'Authentication and registration API for eBakuna vaccination system',
    active: true,
    consumes: 'application/json',
    produces: 'application/json',
    enforce_acl: [],
    routes: [
        {
            $id: Now.ID['ebakuna_auth_login_route'],
            name: 'Login',
            path: '/login',
            method: 'POST',
            script: authenticateUser,
            short_description: 'Authenticate user credentials and return user profile with roles',
            version: 1,
            consumes: 'application/json',
            produces: 'application/json',
            authentication: false,
            authorization: false,
            internalRole: false,
            enforce_acl: [],
            request_example: JSON.stringify({
                username: "user@example.com",
                password: "password123"
            })
        },
        {
            $id: Now.ID['ebakuna_auth_register_route'],
            name: 'Register',
            path: '/register',
            method: 'POST',
            script: registerUser,
            short_description: 'Register a new user account',
            version: 1,
            consumes: 'application/json',
            produces: 'application/json',
            authentication: false,
            authorization: false,
            internalRole: false,
            enforce_acl: [],
            request_example: JSON.stringify({
                username: "newuser",
                password: "password123",
                email: "user@example.com",
                firstName: "John",
                lastName: "Doe"
            })
        },
        {
            $id: Now.ID['ebakuna_booking_create_route'],
            name: 'Booking',
            path: '/booking',
            method: 'POST',
            script: createBooking,
            short_description: 'Create a new vaccination booking request',
            version: 1,
            consumes: 'application/json',
            produces: 'application/json',
            authentication: false,
            authorization: false,
            internalRole: false,
            enforce_acl: [],
            request_example: JSON.stringify({
                fullName: "John Doe",
                contactNo: "09123456789",
                dateOfBirth: "1990-05-15",
                barangay: "Cebu City",
                vaccineType: "Pfizer",
                preferredDate: "2024-01-20",
                doseNumber: "1",
                healthUnit: "Barangay Clinic",
                referenceNumber: "EBK-12345"
            })
        },
        {
            $id: Now.ID['ebakuna_booking_track_route'],
            name: 'Track',
            path: '/track',
            method: 'GET',
            script: trackBooking,
            short_description: 'Track booking status by reference number',
            version: 1,
            consumes: 'application/json',
            produces: 'application/json',
            authentication: false,
            authorization: false,
            internalRole: false,
            enforce_acl: []
    },
    ],
    versions: [{
        $id: Now.ID['ebakuna_auth_version_1'],
        version: 1
    }]
})
