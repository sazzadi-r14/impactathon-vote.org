import admin from "firebase-admin";
import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { envs } from "../utils/config.js"; // Import environment-specific configurations

// Check for already initialized Firebase apps to prevent reinitialization
const activeApps = getApps();

// Firebase service account configuration using environment variables
// This configuration includes sensitive information required for Firebase Admin SDK initialization
const serviceAccount = {
  type: "service_account",
  project_id: envs.FIREBASE_PROJECT_ID, // Firebase project ID
  private_key_id: envs.FIREBASE_PRIVATE_KEY_ID, // Firebase private key ID
  private_key: envs.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Firebase private key with newlines correctly formatted
  client_email: envs.FIREBASE_CLIENT_EMAIL, // Firebase client email
  client_id: envs.FIREBASE_CLIENT_ID, // Firebase client ID
  auth_uri: envs.FIREBASE_AUTH_URI, // Firebase auth URI
  token_uri: envs.FIREBASE_TOKEN_URI, // Firebase token URI
  auth_provider_x509_cert_url: envs.FIREBASE_AUTH_CERT_URL, // Firebase auth provider X509 certificate URL
  client_x509_cert_url: envs.FIREBASE_CLIENT_CERT_URL, // Firebase client X509 certificate URL
};

// Initialize Firebase Admin SDK
// If there are no active Firebase apps, initialize a new app with the service account
// Otherwise, use the first active app
const fireApp = activeApps.length === 0 ? initializeApp({
  credential: admin.credential.cert(serviceAccount),
}) : activeApps[0];

// Get an instance of Firebase Auth for the initialized Firebase app
const fireAuth = getAuth(fireApp);

// Export Firebase app and auth instances for use in other parts of the application
export {
    fireApp,
    fireAuth
};
