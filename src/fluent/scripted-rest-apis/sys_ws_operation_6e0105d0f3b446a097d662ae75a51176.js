(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
  try {
    const body = request.body;
    const requestObj = body && typeof body === 'string' ? JSON.parse(body) : body;
    
    if (!requestObj) {
      response.setStatus(400);
      response.setBody(JSON.stringify({
        error: 'Invalid request body'
      }));
      return;
    }
    
    const username = requestObj.username;
    const password = requestObj.password;
    const email = requestObj.email;
    const firstName = requestObj.firstName;
    const lastName = requestObj.lastName;
    
    if (!username || !password || !email) {
      response.setStatus(400);
      response.setBody(JSON.stringify({
        error: 'Username, password, and email are required'
      }));
      return;
    }
    
    // Check if user already exists
    const existingCreds = new GlideRecord('x_2009786_vaccinat_user_credential');
    existingCreds.addQuery('username', username);
    existingCreds.query();
    if (existingCreds.next()) {
      response.setStatus(409);
      response.setBody(JSON.stringify({
        error: 'Username already exists'
      }));
      return;
    }
    
    // Create new sys_user record
    const user = new GlideRecord('sys_user');
    user.initialize();
    user.setValue('user_name', username);
    user.setValue('email', email);
    user.setValue('first_name', firstName || '');
    user.setValue('last_name', lastName || '');
    user.setValue('active', true);
    const userId = user.insert();
    
    if (!userId) {
      response.setStatus(500);
      response.setBody(JSON.stringify({
        error: 'Failed to create user'
      }));
      return;
    }
    
    // Create credential record
    const creds = new GlideRecord('x_2009786_vaccinat_user_credential');
    creds.initialize();
    creds.setValue('user_id', userId);
    creds.setValue('username', username);
    creds.setValue('password', password);
    creds.insert();
    
    // Assign default citizen role
    const role = new GlideRecord('x_2009786_vaccinat_user_role');
    role.initialize();
    role.setValue('user', userId);
    role.setValue('role', 'citizen');
    role.insert();
    
    response.setStatus(201);
    response.setBody(JSON.stringify({
      success: true,
      message: 'User registered successfully',
      user: {
        id: userId,
        username: username,
        email: email
      }
    }));
  } catch (e) {
    response.setStatus(500);
    response.setBody(JSON.stringify({
      error: 'Server error: ' + e.message
    }));
  }
})(request, response);
