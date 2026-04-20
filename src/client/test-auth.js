// Test file to verify authentication API functionality
// This can be run in browser console for debugging

async function testAuthenticationAPI() {
    console.log('🧪 Testing Authentication API...');
    
    const testEndpoint = '/api/x_2009786_vaccinat/v1/ebakuna_auth/login';
    
    // Test 1: Check if endpoint is accessible
    console.log('\n1️⃣ Testing endpoint accessibility...');
    try {
        const optionsResponse = await fetch(testEndpoint, {
            method: 'OPTIONS',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ OPTIONS request status:', optionsResponse.status);
        console.log('✅ CORS headers:', Object.fromEntries(optionsResponse.headers.entries()));
    } catch (error) {
        console.error('❌ OPTIONS request failed:', error);
    }
    
    // Test 2: Try login with test user
    console.log('\n2️⃣ Testing login with test user...');
    const testCredentials = {
        username: 'survey.user@email.com',
        password: '3FSkzslIJ1'
    };
    
    try {
        const loginResponse = await fetch(testEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(testCredentials)
        });
        
        console.log('📊 Login response status:', loginResponse.status);
        console.log('📊 Login response headers:', Object.fromEntries(loginResponse.headers.entries()));
        
        const responseText = await loginResponse.text();
        console.log('📊 Raw response:', responseText);
        
        try {
            const responseData = JSON.parse(responseText);
            console.log('📊 Parsed response:', responseData);
            
            if (loginResponse.ok) {
                console.log('✅ Login successful!');
                return responseData;
            } else {
                console.error('❌ Login failed:', responseData.error);
                return { success: false, error: responseData.error };
            }
        } catch (parseError) {
            console.error('❌ Failed to parse response as JSON:', parseError);
            return { success: false, error: 'Invalid JSON response', rawResponse: responseText };
        }
    } catch (error) {
        console.error('❌ Login request failed:', error);
        return { success: false, error: error.message };
    }
}

// Test registration functionality
async function testRegistration() {
    console.log('\n🧪 Testing User Registration...');
    
    const testUser = {
        email: `test.user.${Date.now()}@example.com`,
        first_name: 'Test',
        last_name: 'User',
        password: 'TestPassword123'
    };
    
    try {
        // First get CSRF token
        const tokenResponse = await fetch('/api/now/ui/user/current_user', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        
        let csrfToken = window.g_ck;
        if (tokenResponse.ok) {
            const tokenData = await tokenResponse.json();
            if (tokenData?.result?.g_ck) {
                csrfToken = tokenData.result.g_ck;
                window.g_ck = csrfToken;
            }
        }
        
        console.log('🎫 Using CSRF token:', csrfToken ? 'Available' : 'Missing');
        
        // Create user
        const createUserResponse = await fetch('/api/now/table/sys_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-UserToken': csrfToken
            },
            body: JSON.stringify({
                user_name: testUser.email,
                email: testUser.email,
                first_name: testUser.first_name,
                last_name: testUser.last_name,
                user_password: testUser.password,
                active: true
            })
        });
        
        console.log('👤 Create user response status:', createUserResponse.status);
        
        const createUserText = await createUserResponse.text();
        console.log('👤 Create user raw response:', createUserText);
        
        if (createUserResponse.ok) {
            const userData = JSON.parse(createUserText);
            console.log('✅ User created successfully:', userData.result);
            
            // Now test login with the new user
            console.log('\n🔐 Testing login with new user...');
            const loginResult = await fetch('/api/x_2009786_vaccinat/v1/ebakuna_auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: testUser.email,
                    password: testUser.password
                })
            });
            
            const loginText = await loginResult.text();
            console.log('🔐 New user login response:', loginText);
            
            return {
                success: true,
                user: userData.result,
                loginTest: loginResult.ok ? JSON.parse(loginText) : loginText
            };
        } else {
            const errorData = JSON.parse(createUserText);
            console.error('❌ User creation failed:', errorData);
            return { success: false, error: errorData };
        }
        
    } catch (error) {
        console.error('❌ Registration test failed:', error);
        return { success: false, error: error.message };
    }
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Starting Authentication & Registration Tests...');
    
    const authTest = await testAuthenticationAPI();
    const regTest = await testRegistration();
    
    console.log('\n📋 TEST SUMMARY:');
    console.log('Authentication Test:', authTest.success ? '✅ PASSED' : '❌ FAILED');
    console.log('Registration Test:', regTest.success ? '✅ PASSED' : '❌ FAILED');
    
    return { authentication: authTest, registration: regTest };
}

// Make functions available globally
if (typeof window !== 'undefined') {
    window.testAuth = testAuthenticationAPI;
    window.testRegistration = testRegistration;
    window.runAllTests = runAllTests;
}

// Auto-run if in browser
if (typeof window !== 'undefined' && window.location) {
    console.log('🔧 Auth test functions loaded. Run in console:');
    console.log('- window.testAuth() for login test');
    console.log('- window.testRegistration() for registration test');
    console.log('- window.runAllTests() for complete test suite');
}