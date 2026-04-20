export class AuthService {
  constructor() {
    this.baseUrl = '/api/now';
    this.authApiUrl = '/api/x_2009786_vaccinat/v1/ebakuna_auth';
  }

  async readResponsePayload(response) {
    const text = await response.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return { error: text };
    }
  }

  getErrorMessage(payload, fallbackMessage) {
    if (!payload) return fallbackMessage;
    const err = payload.error;
    if (!err) return fallbackMessage;
    if (typeof err === 'string') return err;
    if (typeof err === 'object') {
      if (typeof err.message === 'string') return err.message;
      if (typeof err.detail === 'string') return err.detail;
      try {
        return JSON.stringify(err);
      } catch {
        return fallbackMessage;
      }
    }
    return String(err);
  }

  async login(username, password) {
    console.log('🔐 Logging in:', username);
    
    try {
      const response = await fetch(`/api/x_2009786_vaccinat/v1/ebakuna_auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const payload = await this.readResponsePayload(response);

      if (response.ok) {
        if (payload && payload.status === 'success' && payload.user) {
          localStorage.setItem('ebakuna_user', JSON.stringify(payload.user));
          return payload.user;
        } else {
          const err = new Error(this.getErrorMessage(payload, 'Invalid login response'));
          err.debug = payload ? payload.debug : undefined;
          throw err;
        }
      } else {
        const err = new Error(this.getErrorMessage(payload, 'Login failed'));
        err.debug = payload ? payload.debug : undefined; // Attach debug info
        throw err;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const userJson = localStorage.getItem('ebakuna_user');
      if (userJson) {
        const user = JSON.parse(userJson);
        console.log('✓ Current user from session:', user);
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async logout() {
    try {
      localStorage.removeItem('ebakuna_user');
      localStorage.removeItem('ebakuna_token');
      console.log('✓ Logged out');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async resetAppUsers() {
    const response = await fetch(`${this.authApiUrl}/reset-users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({})
    });

    const payload = await this.readResponsePayload(response);
    if (!response.ok) {
      throw new Error(this.getErrorMessage(payload, 'Failed to reset app users'));
    }

    return payload;
  }

  async register(userData) {
    console.log('📝 Registering user:', userData.username);
    
    try {
      const username = (userData.username || '').trim();
      const providedEmail = (userData.email || '').trim();
      const fallbackEmail = username.includes('@') ? username : `${username}@ebakuna.local`;

      const requestData = {
        username,
        password: userData.password,
        email: providedEmail || fallbackEmail,
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        role: userData.role || 'citizen'
      };

      const url = `${this.authApiUrl}/register`;
      console.log('POST to:', url);
      console.log('Payload via JSON:', { ...requestData, password: '***' });
      
      const response = await fetch(url, {
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
}