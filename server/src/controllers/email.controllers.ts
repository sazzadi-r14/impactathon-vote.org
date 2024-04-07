import nodemailer from "nodemailer"; // Import nodemailer for email sending capabilities
import { emailClient } from "../services/emailService.js"; // Import the email client from the services layer
import { envs } from "../utils/config.js"; // Import environment-specific configurations

/**
 * Sends an email to the user regarding actions taken on their personal identifiable information (PII).
 */
const UserFacingEmail = async (req, res, next) => {
    // Extract email and action (e.g., 'delete', 'update') from the request body
	const { email, action } = req.body;

	// Construct the email subject and text based on the action taken
	const subject = `Your PII has been ${action}`;
	const text = `This is a confirmation that you have requested to ${action} your personal information with our service.`;

	try {
		// Use the emailClient service to send the email
		await emailClient(email, subject, text);
		// Respond with a success message if the email is sent successfully
		res.status(200).json({ message: "Email sent successfully" });
	} catch (error) {
		// Log the error and pass it to the error handling middleware
		console.error("Error sending email:", error);
		next(error); // Use your error handling middleware
	}
};

/**
 * Sends an email to an admin regarding a user's PII request action.
 */
const AdminFacingEmail = async (req, res, next) => {
    // Extract email and action from the request body
	const { email, action } = req.body;

	// Construct the email subject and text for the admin
	const subject = `PII Request ${action} for ${email}`;
	const text = `There is a PII ${action} request for ${email}`;

	try {
		// Use the emailClient service to send the email to the admin's email address
		await emailClient(envs.ADMIN_EMAIL, subject, text);
		// Respond with a success message if the email is sent successfully
		res.status(200).json({ message: "Email sent successfully" });
	} catch (error) {
		// Log the error and pass it to the error handling middleware
		console.error("Error sending email:", error);
		next(error); // Use your error handling middleware
	}
};

// Export the email controller functions for use in route definitions
export { UserFacingEmail, AdminFacingEmail };
