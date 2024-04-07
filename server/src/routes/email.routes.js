// Import the Router class from the express package to define route handlers
import { Router } from "express";
// Import the email controller functions for handling requests to send emails
// to users and admins respectively
import {
  UserFacingEmail,
  AdminFacingEmail,
} from "../controllers/email.controllers.ts";

// Create a new instance of Router to define routes related to email operations
const EmailRoutes = Router();

// Route for sending emails intended for users
// This POST request handles sending user-facing emails through the UserFacingEmail controller
EmailRoutes.post("/user", UserFacingEmail);

// Route for sending emails intended for admins
// This POST request handles sending admin-facing emails through the AdminFacingEmail controller
EmailRoutes.post("/admin", AdminFacingEmail);

// Export the configured EmailRoutes as the default export of this module
// This allows the routes to be easily imported and used in the main application
export default EmailRoutes;
