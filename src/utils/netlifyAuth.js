// Netlify Identity integration for authentication
// This file provides utilities for working with Netlify Identity

// Check if we're running in the browser
const isBrowser = () => typeof window !== 'undefined';

// Initialize Netlify Identity
const initNetlifyIdentity = () => {
  if (!isBrowser()) return;
  
  // Dynamically import the Netlify Identity Widget
  return import('netlify-identity-widget').then(netlifyIdentity => {
    netlifyIdentity.init();
    return netlifyIdentity;
  });
};

// Get the current user if logged in
const getCurrentUser = async () => {
  if (!isBrowser()) return null;
  
  const netlifyIdentity = await initNetlifyIdentity();
  const user = netlifyIdentity.currentUser();
  return user;
};

// Open the login modal
const openLogin = async () => {
  if (!isBrowser()) return;
  
  const netlifyIdentity = await initNetlifyIdentity();
  netlifyIdentity.open('login');
};

// Open the signup modal
const openSignup = async () => {
  if (!isBrowser()) return;
  
  const netlifyIdentity = await initNetlifyIdentity();
  netlifyIdentity.open('signup');
};

// Logout the current user
const logout = async () => {
  if (!isBrowser()) return;
  
  const netlifyIdentity = await initNetlifyIdentity();
  netlifyIdentity.logout();
};

// Add an authentication listener
const addAuthListener = async (callback) => {
  if (!isBrowser()) return;
  
  const netlifyIdentity = await initNetlifyIdentity();
  netlifyIdentity.on('login', user => callback('login', user));
  netlifyIdentity.on('logout', () => callback('logout'));
  netlifyIdentity.on('error', err => callback('error', err));
};

export {
  initNetlifyIdentity,
  getCurrentUser,
  openLogin,
  openSignup,
  logout,
  addAuthListener
}; 