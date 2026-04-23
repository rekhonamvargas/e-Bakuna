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
    
    const fullName = requestObj.fullName;
    const contactNo = requestObj.contactNo;
    const dateOfBirth = requestObj.dateOfBirth;
    const barangay = requestObj.barangay;
    const vaccineType = requestObj.vaccineType;
    const preferredDate = requestObj.preferredDate;
    const doseNumber = requestObj.doseNumber;
    const healthUnit = requestObj.healthUnit;
    
    if (!fullName || !contactNo || !barangay || !vaccineType) {
      response.setStatus(400);
      response.setBody(JSON.stringify({
        error: 'Missing required fields: fullName, contactNo, barangay, vaccineType'
      }));
      return;
    }
    
    // Find or create citizen record
    const citizen = new GlideRecord('sys_user');
    citizen.addQuery('email', contactNo + '@ebakuna.local');
    citizen.query();
    
    let citizenId;
    if (citizen.next()) {
      citizenId = citizen.getUniqueValue();
    } else {
      const newCitizen = new GlideRecord('sys_user');
      newCitizen.initialize();
      newCitizen.setValue('user_name', 'citizen_' + contactNo.replace(/[^0-9]/g, ''));
      newCitizen.setValue('email', contactNo + '@ebakuna.local');
      newCitizen.setValue('first_name', fullName.split(' ')[0] || '');
      newCitizen.setValue('last_name', fullName.split(' ').slice(1).join(' ') || '');
      newCitizen.setValue('phone', contactNo);
      newCitizen.setValue('active', true);
      citizenId = newCitizen.insert();
    }
    
    // Create booking record
    const booking = new GlideRecord('x_2009786_vaccinat_citizen_booking');
    booking.initialize();
    booking.setValue('citizen', citizenId);
    booking.setValue('full_name', fullName);
    booking.setValue('contact_no', contactNo);
    booking.setValue('date_of_birth', dateOfBirth || '');
    booking.setValue('barangay', barangay);
    booking.setValue('vaccine_type', vaccineType);
    booking.setValue('preferred_date', preferredDate || '');
    booking.setValue('dose_number', doseNumber || '1');
    booking.setValue('health_unit', healthUnit || '');
    booking.setValue('status', 'pending');
    
    const bookingId = booking.insert();
    
    if (!bookingId) {
      response.setStatus(500);
      response.setBody(JSON.stringify({
        error: 'Failed to create booking'
      }));
      return;
    }
    
    // Generate reference number
    const refNumber = 'EBK-' + Date.now().toString().slice(-8);
    const bookingUpdate = new GlideRecord('x_2009786_vaccinat_citizen_booking');
    if (bookingUpdate.get(bookingId)) {
      bookingUpdate.setValue('reference_number', refNumber);
      bookingUpdate.update();
    }
    
    response.setStatus(201);
    response.setBody(JSON.stringify({
      success: true,
      message: 'Booking created successfully',
      booking: {
        id: bookingId,
        referenceNumber: refNumber,
        status: 'pending'
      }
    }));
  } catch (e) {
    response.setStatus(500);
    response.setBody(JSON.stringify({
      error: 'Server error: ' + e.message
    }));
  }
})(request, response);
