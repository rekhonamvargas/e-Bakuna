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
      
      // Send as query parameters (workaround for body parsing issue)
      const params = new URLSearchParams();
      params.append('username', requestData.username);
      params.append('password', requestData.password);
      
      const url = `${this.authApiUrl}/login?${params.toString()}`;
      console.log('POST to:', url);
      console.log('Payload via query params:', { ...requestData, password: '***' });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
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
        lastName: userData.lastName.trim(),
        role: userData.role || 'citizen'
      };
      
      // Send as query parameters (workaround for body parsing issue)
      const params = new URLSearchParams();
      params.append('username', requestData.username);
      params.append('password', requestData.password);
      params.append('email', requestData.email);
      params.append('firstName', requestData.firstName);
      params.append('lastName', requestData.lastName);
      params.append('role', requestData.role);
      
      const url = `${this.authApiUrl}/register?${params.toString()}`;
      console.log('POST to:', url);
      console.log('Payload via query params:', { ...requestData, password: '***' });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
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
}