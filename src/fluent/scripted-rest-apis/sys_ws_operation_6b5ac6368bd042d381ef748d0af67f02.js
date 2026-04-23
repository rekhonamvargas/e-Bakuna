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
    
    const referenceNumber = requestObj.referenceNumber;
    
    if (!referenceNumber) {
      response.setStatus(400);
      response.setBody(JSON.stringify({
        error: 'Reference number is required'
      }));
      return;
    }
    
    // Query booking by reference number
    const booking = new GlideRecord('x_2009786_vaccinat_citizen_booking');
    booking.addQuery('reference_number', referenceNumber);
    booking.query();
    
    if (!booking.next()) {
      response.setStatus(404);
      response.setBody(JSON.stringify({
        error: 'Booking not found'
      }));
      return;
    }
    
    // Get booking details
    const bookingId = booking.getUniqueValue();
    const citizenId = booking.getValue('citizen');
    const status = booking.getValue('status');
    const vaccineType = booking.getValue('vaccine_type');
    const preferredDate = booking.getValue('preferred_date');
    const doseNumber = booking.getValue('dose_number');
    
    // Get citizen details
    let citizenName = '';
    const citizen = new GlideRecord('sys_user');
    if (citizen.get(citizenId)) {
      citizenName = citizen.getValue('first_name') + ' ' + citizen.getValue('last_name');
    }
    
    // Get assigned appointment if status is scheduled
    let appointmentDetails = null;
    if (status === 'scheduled' || status === 'confirmed') {
      const appointment = new GlideRecord('x_2009786_vaccinat_appointment');
      appointment.addQuery('booking', bookingId);
      appointment.addQuery('status', '!=', 'cancelled');
      appointment.orderByDesc('created_on');
      appointment.setLimit(1);
      appointment.query();
      
      if (appointment.next()) {
        const scheduleId = appointment.getValue('schedule_slot');
        const scheduleRec = new GlideRecord('x_2009786_vaccinat_clinic_schedule');
        if (scheduleRec.get(scheduleId)) {
          const clinicId = scheduleRec.getValue('clinic');
          const clinicRec = new GlideRecord('x_2009786_vaccinat_clinic');
          const clinicName = clinicRec.get(clinicId) ? clinicRec.getValue('clinic_name') : 'Unknown Clinic';
          
          appointmentDetails = {
            appointmentId: appointment.getUniqueValue(),
            clinic: clinicName,
            date: scheduleRec.getValue('start_date_time'),
            status: appointment.getValue('status')
          };
        }
      }
    }
    
    response.setStatus(200);
    response.setBody(JSON.stringify({
      success: true,
      booking: {
        referenceNumber: referenceNumber,
        id: bookingId,
        citizenName: citizenName,
        status: status,
        vaccineType: vaccineType,
        doseNumber: doseNumber,
        preferredDate: preferredDate,
        appointment: appointmentDetails
      }
    }));
  } catch (e) {
    response.setStatus(500);
    response.setBody(JSON.stringify({
      error: 'Server error: ' + e.message
    }));
  }
})(request, response);
