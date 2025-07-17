$("#contact-us").submit(function (e) {
  e.preventDefault();

  var name = $("#first-name").val();
  var phone_number = $("#phone-number").val();
  var email = $("#email").val();
  var service = $(".itemslist").text();
  var message = $("#message").val();
  var company = $("#company").val();
  var company_size = $("#company_size").val();
  var positionincompany = $("#positionincompany").val();
  var appointment_date = $("#block-date").val();
  var appointment_time = $("#block-time").val();

  var settings = {
    url: "https://crm.talkcoms.co.uk/api/resource/Website%20Inquiry",
    method: "POST",
    timeout: 0,

    data: JSON.stringify({
      name: name,
      phone_number: phone_number || null,
      email: email,
      service: service || null,
      message: message,
      company: company || null,
      company_size: company_size || null,
      positionincompany: positionincompany || null,
      appointment_date: appointment_date || null,
      appointment_time: appointment_time || null,
    }),
  };
});
