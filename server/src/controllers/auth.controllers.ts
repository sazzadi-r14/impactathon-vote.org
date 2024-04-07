import { fireAuth } from "../services/firebase.js"; // Import the Firebase authentication service
import { ApiError } from "../errors/class.error.js"; // Import custom API error handling class
import { envs } from "../utils/config.js"; // Import environment-specific configurations

/**
 * Verifies the session cookie to authenticate the user.
 */
const Verify = async (req, res, next) => {
  try {
    // Extract the session cookie from request headers
    const sessionCookie = req.headers.sessioncookie;
    // If no session cookie is present, return with an unauthorized status
    if (!sessionCookie) return res.status(401).json({ message: "No cookie found" });

    // Verify the session cookie with Firebase Auth
    const { uid } = await fireAuth.verifySessionCookie(sessionCookie);
    // If verification fails (no uid), return with an unauthorized status
    if (!uid) return res.status(401).json({ message: "Unauthorized" });

    // If verification is successful, respond with authorized
    res.status(200).json({
      message: "Authorized",
    });
  } catch (err) {
    // Pass any errors to the next middleware (error handler)
    next(err);
  }
};

/**
 * Signs out the user by clearing the session cookie.
 */
const Signout = async (req, res, next) => {
  try {
    // Clear the session cookie
    res.clearCookie("__session", {
      path: "/",
    });
    // Optionally, you could add a response here indicating success
  } catch (error) {
    // Pass any errors to the next middleware (error handler)
    next(error);
  }
};

/**
 * Signs in the user by verifying the ID token and setting a session cookie.
 */
const Signin = async (req, res, next) => {
  try {
    // Extract the ID token from the Authorization header
    const idToken = req.get("Authorization")?.split("Bearer ")[1];
    // If no ID token is provided, throw a custom API error
    if (!idToken) throw new ApiError("No idToken provided");

    const { email } = req.body;

    // Fetch the user's details from Firebase Auth using their email
    const userFirebase = await fireAuth.getUserByEmail(email);
    const { uid } = userFirebase;

    // Store the ID token in the request object for use in subsequent middleware
    req.idToken = idToken;

    // Proceed to the next middleware (could be setting the session cookie)
    next();
  } catch (error) {
    // Pass any errors to the next middleware (error handler)
    next(error);
  }
};

// Export the authentication controller functions
export { Verify, Signout, Signin };
