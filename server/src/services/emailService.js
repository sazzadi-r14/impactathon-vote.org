import nodemailer from 'nodemailer';

/**
 * Sends an email to a specified recipient.
 * 
 * @param {string} recipient The email address of the recipient.
 * @param {string} subject The subject line of the email.
 * @param {string} text The main text content of the email.
 */
const emailClient = async (recipient, subject, text) => {
	// Set up NodeMailer transporter
	// This transporter object is responsible for sending emails.
	// It uses Gmail as the email service provider and authenticates
	// using the environment variables for the username and password.
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USERNAME, // The email username (sender's email address)
			pass: process.env.EMAIL_PASSWORD, // The email password for the sender's account
		},
	});

	// Mail details
	// This object specifies the sender, recipient, subject, and body text of the email.
	const mailOptions = {
		from: process.env.EMAIL_USERNAME, // Sender email address, same as authenticated user
		to: recipient, // Recipient email address
		subject, // Subject line of the email
		text, // Plain text body of the email
	};

	// Send the email
	// The transporter object uses the sendMail method to send the email
	// with the specified mail options. This operation is asynchronous.
    await transporter.sendMail(mailOptions);
}

export { emailClient }
