import nodemailer from 'nodemailer';

const emailClient = async (recipient, subject, text) => {

	// Set up NodeMailer transporter
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	// Mail details
	const mailOptions = {
		from: process.env.EMAIL_USERNAME,
		to: recipient,
		subject,
		text,
	};

	// Send the email
    await transporter.sendMail(mailOptions);
}

export { emailClient }