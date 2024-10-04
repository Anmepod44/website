document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    
    // Collect the form data
    const formData = {
      emp_no: document.getElementById("emp_no").value,
      business_size: document.getElementById("business_size").value,
      email: document.getElementById("email").value,
      terms_agreed: document.getElementById("flexSwitchCheckDefault").checked
    };
  
    // The API endpoint URL (replace with your actual AWS API Gateway URL)
    const apiEndpoint = "https://your-api-id.execute-api.region.amazonaws.com/prod/contact";
  
    try {
      // Send form data as JSON to the API
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      // Handle the API response
      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        alert("Failed to send the message. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  });
  