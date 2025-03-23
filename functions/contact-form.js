// Netlify serverless function for contact form processing
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" })
    };
  }

  try {
    // Parse the incoming JSON
    const data = JSON.parse(event.body);
    const { name, email, message } = data;

    // Validate form data
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required fields" })
      };
    }

    // Here you would typically send an email or store the data
    // For demo purposes, we're just logging and returning success
    console.log("Contact form submission:", { name, email, message });

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Contact form submission received successfully",
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error("Contact form error:", error);

    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" })
    };
  }
}; 