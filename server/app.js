// server/src/app.js

// Import necessary modules and middleware
import "dotenv/config"; // Loads environment variables from a .env file into process.env
import express from "express"; // Express framework for creating the server
import cors from "cors"; // Middleware to enable CORS (Cross-Origin Resource Sharing)
import cookieParser from "cookie-parser"; // Middleware to parse cookie header and populate req.cookies

// Import configurations and utilities
import { envs } from "./src/utils/config.js"; // Import environment-specific configurations
import { ApiErrorHandler } from "./src/errors/handler.error.js"; // Custom API error handler

// Import route handlers
import AuthRoutes from "./src/routes/auth.routes.js"; // Routes for authentication
import smsRoutes from './src/routes/sms.routes.js'; // Routes for SMS webhook handling
import EmailRoutes from "./src/routes/email.routes.js"; // Routes for email-related operations

// Server setup
const app = express(); // Initialize express app

// Trust the reverse proxy when behind one (important for secure cookies)
app.set("trust proxy", true);

// Middlewares
app.use(cors({ origin: envs.FRONT_END_URL, credentials: true })); // Setup CORS with frontend URL
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from the 'public' directory
app.use(cookieParser()); // Parse cookies attached to the client request object

// Route Middlewares
app.use("/auth", AuthRoutes); // Use authentication routes
app.use('/webhooks', smsRoutes); // Use SMS webhook routes for incoming messages
app.use("/email", EmailRoutes); // Use email routes for email operations

// Error handling middleware to catch and respond to errors uniformly
app.use(ApiErrorHandler);

// Start the server
const PORT = process.env.PORT || 3000; // Define the port to run the server on
app.listen(PORT, () => { // Start the server and listen on the defined port
  console.log(`Server is running on port ${PORT}`); // Log the server start event
});

export default app; // Export the app for further use, e.g., in testing
