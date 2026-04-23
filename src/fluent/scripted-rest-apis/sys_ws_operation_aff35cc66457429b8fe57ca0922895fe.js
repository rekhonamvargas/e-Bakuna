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
    
    if (!username || !password) {
      response.setStatus(400);
      response.setBody(JSON.stringify({
        error: 'Username and password required'
      }));
      return;
    }
    
    // Query user credentials table
    const creds = new GlideRecord('x_2009786_vaccinat_user_credential');
    creds.addQuery('username', username);
    creds.query();
    
    if (!creds.next()) {
      response.setStatus(401);
      response.setBody(JSON.stringify({
        error: 'Invalid username or password'
      }));
      return;
    }
    
    // Verify password
    const storedPassword = creds.getValue('password');
    if (storedPassword !== password) {
      response.setStatus(401);
      response.setBody(JSON.stringify({
        error: 'Invalid username or password'
      }));
      return;
    }
    
    // Get user roles
    const userId = creds.getValue('user_id');
    const userRec = new GlideRecord('sys_user');
    if (!userRec.get(userId)) {
      response.setStatus(500);
      response.setBody(JSON.stringify({
        error: 'User record not found'
      }));
      return;
    }
    
    // Get user roles
    const roles = [];
    const userRole = new GlideRecord('x_2009786_vaccinat_user_role');
    userRole.addQuery('user', userId);
    userRole.query();
    while (userRole.next()) {
      roles.push(userRole.getValue('role'));
    }
    
    response.setStatus(200);
    response.setBody(JSON.stringify({
      success: true,
      user: {
        id: userId,
        username: username,
        email: userRec.getValue('email'),
        firstName: userRec.getValue('first_name'),
        lastName: userRec.getValue('last_name'),
        roles: roles
      }
    }));
  } catch (e) {
    response.setStatus(500);
    response.setBody(JSON.stringify({
      error: 'Server error: ' + e.message
    }));
  }
})(request, response);
