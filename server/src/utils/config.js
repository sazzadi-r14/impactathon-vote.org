import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// List out the environment variables
var envs = {
  NODE_ENV: process.env.NODE_ENV,
  FRONT_END_URL: "",
  FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
  FIREBASE_AUTH_URI: process.env.FIREBASE_AUTH_URI,
  FIREBASE_TOKEN_URI: process.env.FIREBASE_TOKEN_URI,
  FIREBASE_AUTH_CERT_URL: process.env.FIREBASE_AUTH_CERT_URL,
  FIREBASE_CLIENT_CERT_URL: process.env.FIREBASE_CLIENT_CERT_URL,
  VONAGE_API_KEY: process.env.VONAGE_API_KEY,
  VONAGE_API_SECRET: process.env.VONAGE_API_SECRET,
  VONAGE_NUMBER: process.env.VONAGE_NUMBER,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL
};

// Set them based on dev or prod.
if (process.env.NODE_ENV === "dev") {
  envs.FRONT_END_URL = "http://localhost:4321";
} else {
  envs.FRONT_END_URL = "https://impactathon-vote-org.vercel.app";
}

export { envs };
