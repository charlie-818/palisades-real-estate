// This file helps Netlify detect the functions directory
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Functions directory is properly configured",
      timestamp: new Date().toISOString()
    })
  };
}; 