// This file ensures Netlify correctly configures the build environment
console.log('Configuring Netlify build environment...');

// Log the functions directory for debugging
const path = require('path');
const fs = require('fs');

// Check if functions directory exists
const functionsDir = path.join(__dirname, 'functions');
const netlifyFunctionsDir = path.join(__dirname, 'netlify', 'functions');

console.log(`Checking functions directory: ${functionsDir}`);
console.log(`Functions directory exists: ${fs.existsSync(functionsDir)}`);

console.log(`Checking netlify/functions directory: ${netlifyFunctionsDir}`);
console.log(`netlify/functions directory exists: ${fs.existsSync(netlifyFunctionsDir)}`);

// List files in functions directory
if (fs.existsSync(functionsDir)) {
  console.log('Functions directory contents:');
  fs.readdirSync(functionsDir).forEach(file => {
    console.log(` - ${file}`);
  });
}

// Ensure the build process knows where to find functions
process.env.NETLIFY_FUNCTIONS_DIR = functionsDir; 