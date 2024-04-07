// src/routes/sms.routes.js
import express from 'express';
import { sendSMS } from '../services/vonageService.js'; // Import the sendSMS function from the Vonage service
import { determineResponseMessage } from "../services/gptService.js"; // Import the AI-based response determination service
import { envs } from "../utils/config.js"; // Import environment-specific configurations

// Define the Vonage number from the environment configurations
const VONAGENUMBER = envs.VONAGE_NUMBER;

// Initialize a new Express router to define routes for this module
const router = express.Router();

/**
 * Route to handle incoming SMS messages via GET request.
 * It uses query parameters to receive SMS details and responds with a generated message.
 */
router.get('/incoming-sms', async (req, res) => {
  // Extract message details (sender, recipient, text) from query parameters
  const { msisdn, to, text } = req.query;
  const sender = '+' + msisdn; // Format sender number with leading +

  // Generate a response message based on the incoming text using GPT service
  const responseMessage = await determineResponseMessage(text);

  try {
      // Send the generated response back to the sender using the Vonage SMS service
      await sendSMS(sender, VONAGENUMBER, responseMessage);
      // Respond to the request indicating successful message dispatch
      res.status(200).json({ message: 'Response sent' });
  } catch (error) {
      // In case of an error, log it and respond with a failure message
      res.status(500).json({ error: 'Failed to send SMS response' });
  }
});

// Export the router as the default export of this module
export default router;
