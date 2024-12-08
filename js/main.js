// Function to handle contact form submission
function sendMessage() {
  const name = $('#name').val();
  const email = $('#email').val();
  const phone = $('#phone').val();
  const message = $('#message').val();

  if (!name || !email || !phone || !message) {
    alert("Please fill out all fields before submitting.");
    return;
  }

  // WhatsApp Integration
  const waLink = `https://api.whatsapp.com/send?phone=6287783235189&text=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
  )}`;
  window.open(waLink, "_blank");

  // Google Sheets Integration
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwVAQaYFkzlS2T-vn5sQ0pYBz4WKJcv-jIrJssdnHeyVQntLkdkWhcnhM3qwT9sINdC/exec'; // Replace with your Google Apps Script URL
  $.ajax({
    url: scriptURL,
    method: "POST",
    data: { name, email, phone, message },
    success: function (response) {
      alert("Message sent and saved successfully!");
    },
    error: function (error) {
      console.error("Error!", error);
      alert("There was an error sending your message.");
    }
  });
}

// Bind submit button click event
$(document).ready(function () {
  $('#contactForm button').on('click', function (e) {
    e.preventDefault();
    sendMessage();
  });
});
