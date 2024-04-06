import admin from "firebase-admin";
import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { envs } from "../utils/config.js";

const activeApps = getApps();
const serviceAccount = {
  type: "service_account",
  project_id: envs.FIREBASE_PROJECT_ID,
  private_key_id: envs.FIREBASE_PRIVATE_KEY_ID,
  private_key: envs.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: envs.FIREBASE_CLIENT_EMAIL,
  client_id: envs.FIREBASE_CLIENT_ID,
  auth_uri: envs.FIREBASE_AUTH_URI,
  token_uri: envs.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: envs.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: envs.FIREBASE_CLIENT_CERT_URL,
};

const fireApp = activeApps.length === 0 ? initializeApp({
  credential: admin.credential.cert(serviceAccount),
}) : activeApps[0];
const fireAuth = getAuth(fireApp);

export {
    fireApp,
    fireAuth
}