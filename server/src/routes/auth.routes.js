// Import the Router class from express to create route handlers
import { Router } from "express";
// Import authentication controller functions for verifying user identity,
// signing in users, and signing them out
import {
  Verify,
  Signout,
  Signin,
} from "../controllers/auth.controllers.ts";
// Import the utility function to create a session cookie for authenticated users
import { createSessionCookie } from "../utils/authentication.ts";

// Initialize a new Router instance to define authentication-related routes
const AuthRoutes = Router();

// Define a route for verifying user authentication status. This is typically
// used to check if a user's session is still valid
AuthRoutes.get("/verify", Verify);

// Define a route for user sign-in. This route uses the Signin controller to
// authenticate the user and, if successful, the createSessionCookie middleware
// is applied to add a session cookie to the response
AuthRoutes.post("/signin", Signin, createSessionCookie);

// Define a route for signing out users. This route could, for example,
// clear a user's session cookie or perform other cleanup tasks
AuthRoutes.post("/signout", Signout);

// Export the configured AuthRoutes as the default export of this module
// to be used in the main application setup
export default AuthRoutes;
