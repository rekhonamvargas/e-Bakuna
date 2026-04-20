export class AuthService {
  constructor() {
    this.baseUrl = '/api/now';
    this.authApiUrl = '/api/x_2009786_vaccinat/v1/ebakuna_auth';
  }

  async login(username, password) {
    console.log('🔐 Logging in:', username);
    
    try {
      const requestData = {
        username: username.trim(),
        password: password
      };
      
      console.log('POST to:', `${this.authApiUrl}/login`);
      console.log('Payload:', requestData);
      
      const response = await fetch(`${this.authApiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error(`Invalid response: ${responseText}`);
      }

      if (!response.ok) {
        const errorMessage = responseData.error || `HTTP ${response.status}`;
        console.error('Login failed:', errorMessage);
        throw new Error(errorMessage);
      }

      if (responseData.status !== 'success' || !responseData.user) {
        console.error('Invalid response:', responseData);
        throw new Error('Invalid authentication response');
      }

      console.log('✓ Login successful:', responseData.user);
      return responseData.user;
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(userData) {
    console.log('📝 Registering user:', userData.username);
    
    try {
      const requestData = {
        username: userData.username.trim(),
        password: userData.password,
        email: userData.email.trim(),
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim()
      };
      
      console.log('POST to:', `${this.authApiUrl}/register`);
      console.log('Payload:', { ...requestData, password: '***' });
      
      const response = await fetch(`${this.authApiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error(`Invalid response: ${responseText}`);
      }

      if (!response.ok) {
        const errorMessage = responseData.error || `HTTP ${response.status}`;
        console.error('Registration failed:', errorMessage);
        throw new Error(errorMessage);
      }

      if (responseData.status !== 'success' || !responseData.user) {
        console.error('Invalid response:', responseData);
        throw new Error('Invalid registration response');
      }

      console.log('✓ Registration successful:', responseData.user);
      return responseData.user;
      
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
        console.groupEnd();
        throw new Error('Login failed: Invalid response');
      }

      console.log('✅ Login successful');
      console.groupEnd();
      return responseData.user;

    } catch (error) {
      console.error('❌ Login error:', error);
      console.groupEnd();
      throw error;
    }
  }

  async register(userData) {
    console.group('📝 Registration Process');
    console.log('User data:', { 
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name 
    });
    
    try {
      // Step 1: Get fresh CSRF token
      console.log('Step 1: Getting CSRF token...');
      await this.refreshCsrfToken();
      
      if (!window.g_ck) {
        throw new Error('Could not obtain CSRF token');
      }
      console.log('✅ CSRF token obtained');

      // Step 2: Check if user already exists
      console.log('Step 2: Checking if user exists...');
      const existingUserResponse = await fetch(
        `${this.baseUrl}/table/sys_user?sysparm_query=email=${encodeURIComponent(userData.email)}^ORuser_name=${encodeURIComponent(userData.email)}&sysparm_limit=1`, 
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'X-UserToken': window.g_ck
          }
        }
      );

      if (existingUserResponse.ok) {
        const existingData = await existingUserResponse.json();
        if (existingData.result && existingData.result.length > 0) {
          console.error('❌ User already exists');
          console.groupEnd();
          throw new Error('A user with this email already exists');
        }
      }
      console.log('✅ User does not exist, proceeding...');

      // Step 3: Create new user
      console.log('Step 3: Creating new user...');
      const userPayload = {
        user_name: userData.email,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        user_password: userData.password,
        active: true,
        password_needs_reset: false
      };

      console.log('User payload:', { ...userPayload, user_password: '***' });

      const userResponse = await fetch(`${this.baseUrl}/table/sys_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify(userPayload)
      });

      console.log('User creation response status:', userResponse.status);

      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        console.error('User creation failed:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          console.groupEnd();
          throw new Error(`Registration failed: ${errorText}`);
        }
        
        const errorMsg = errorData.error?.message || errorData.error?.detail || 'Registration failed';
        console.groupEnd();
        throw new Error(errorMsg);
      }

      const userResult = await userResponse.json();
      const newUser = userResult.result;
      console.log('✅ User created successfully:', newUser.sys_id);

      // Step 4: Assign default role (citizen)
      console.log('Step 4: Assigning citizen role...');
      try {
        await this.assignRole(newUser.sys_id, 'x_2009786_vaccinat.citizen');
        console.log('✅ Role assigned successfully');
      } catch (roleError) {
        console.warn('⚠️ Role assignment failed (user still created):', roleError.message);
      }

      console.log('✅ Registration completed successfully');
      console.groupEnd();

      return {
        sys_id: newUser.sys_id,
        user_name: newUser.user_name,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email
      };

    } catch (error) {
      console.error('❌ Registration error:', error);
      console.groupEnd();
      throw error;
    }
  }

  async assignRole(userId, roleName) {
    try {
      console.log('Assigning role:', roleName, 'to user:', userId);
      
      // First, try to find the role
      const roleResponse = await fetch(
        `${this.baseUrl}/table/sys_user_role?sysparm_query=name=${encodeURIComponent(roleName)}&sysparm_limit=1`, 
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'X-UserToken': window.g_ck
          }
        }
      );

      let roleId = null;
      if (roleResponse.ok) {
        const roleData = await roleResponse.json();
        if (roleData.result && roleData.result.length > 0) {
          roleId = roleData.result[0].sys_id;
          console.log('Found role sys_id:', roleId);
        }
      }

      if (!roleId) {
        console.warn('Role not found, creating role assignment with name:', roleName);
        // Create the role first
        const createRoleResponse = await fetch(`${this.baseUrl}/table/sys_user_role`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-UserToken': window.g_ck
          },
          body: JSON.stringify({
            name: roleName,
            description: 'eBakuna citizen role',
            active: true
          })
        });

        if (createRoleResponse.ok) {
          const newRoleData = await createRoleResponse.json();
          roleId = newRoleData.result.sys_id;
          console.log('Created new role:', roleId);
        } else {
          throw new Error('Could not create role');
        }
      }

      // Assign role to user
      const assignResponse = await fetch(`${this.baseUrl}/table/sys_user_has_role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify({
          user: userId,
          role: roleId
        })
      });

      if (!assignResponse.ok) {
        const errorText = await assignResponse.text();
        throw new Error(`Role assignment failed: ${errorText}`);
      }

      console.log('✅ Role assigned successfully');
      return true;

    } catch (error) {
      console.error('Role assignment error:', error);
      throw error;
    }
  }

  async refreshCsrfToken() {
    try {
      const response = await fetch('/api/now/ui/user/current_user', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data?.result?.g_ck) {
          window.g_ck = data.result.g_ck;
          console.log('CSRF token refreshed');
          return true;
        }
      }
      
      // Fallback: try to get token from page
      if (window.g_ck) {
        console.log('Using existing CSRF token');
        return true;
      }
      
      console.warn('Could not refresh CSRF token');
      return false;
    } catch (e) {
      console.warn('CSRF token refresh error:', e);
      return false;
    }
  }

  async logout() {
    try {
      await fetch('/logout.do', {
        method: 'POST',
        headers: {
          'X-UserToken': window.g_ck
        }
      });
      window.location.href = '/login.do';
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect even on error
      window.location.href = '/login.do';
    }
  }

  // Test method for debugging
  async testLogin() {
    const testUsers = [
      { username: 'survey.user@email.com', password: '3FSkzslIJ1' },
      { username: 'lucius.bagnoli@example.com', password: 'bb8kAfs3ho' }
    ];
    
    for (const user of testUsers) {
      try {
        console.log(`Testing login for: ${user.username}`);
        const result = await this.login(user.username, user.password);
        console.log('✅ Test login successful:', result);
        return result;
      } catch (error) {
        console.log(`❌ Test failed for ${user.username}:`, error.message);
      }
    }
    throw new Error('All test logins failed');
  }
}

// Global access for debugging
if (typeof window !== 'undefined') {
  window.AuthService = AuthService;
  window.debugAuth = () => {
    const auth = new AuthService();
    return {
      test: () => auth.testLogin(),
      login: (user, pass) => auth.login(user, pass),
      register: (userData) => auth.register(userData)
    };
  };
}