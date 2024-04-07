import nodemailer from "nodemailer";
import { emailClient } from "../services/emailService.js";
import { envs } from "../utils/config.js";

const UserFacingEmail = async (req, res, next) => {
	const { email, action } = req.body;

	const subject = `Your PII has been ${action}`;
	const text = `This is a confirmation that you have request to ${action} your personal information with our service.`;

	try {
		await emailClient(email, subject, text);
		res.status(200).json({ message: "Email sent successfully" });
	} catch (error) {
		console.error("Error sending email:", error);
		next(error); // Use your error handling middleware
	}
};

const AdminFacingEmail = async (req, res, next) => {
	const { email, action } = req.body;

	const subject = `PII Request ${action} for ${email}`;
	const text = `There is a PII ${action} request for ${email}`;

	try {
		await emailClient(envs.ADMIN_EMAIL, subject, text);
		res.status(200).json({ message: "Email sent successfully" });
	} catch (error) {
		console.error("Error sending email:", error);
		next(error); // Use your error handling middleware
	}
};

export { UserFacingEmail, AdminFacingEmail };
