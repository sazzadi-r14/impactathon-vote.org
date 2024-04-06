// server/src/app.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import nodemailer from 'nodemailer';

import { envs } from "./utils/config.js";
import { ApiErrorHandler } from "./errors/handler.error.js";
import AuthRoutes from "./routes/auth.routes.js";
import smsRoutes from './src/routes/sms.routes.js';


// Server setup
const app = express();

app.set("trust proxy", true);

app.use(cors({ origin: envs.FRONT_END_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Use the imported routes
app.use("/auth", AuthRoutes);

// Email route
app.post('/send-email', async (req, res, next) => {
  const { email, action } = req.body;

  // Set up NodeMailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME, // Replace with your actual email
      pass: process.env.EMAIL_PASSWORD, // Replace with your actual password
    },
  });

  // Mail details
  const mailOptions = {
    from: process.env.EMAIL_USERNAME, // Replace with your email
    to: email,
    subject: `Your PII has been ${action}`,
    text: `This is a confirmation that you have ${action} your personal information with our service.`,
    // You can add HTML body if needed
    // html: `<p>This is a confirmation that you have ${action} your personal information with our service.</p>`
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    next(error); // Use your error handling middleware
  }
});

// Error handling middleware
app.use(ApiErrorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
