// src/routes/sms.routes.js
import express from 'express';
import { sendSMS, determineResponseMessage } from '../services/vonageService.js'; // Ensure the path is correct
import { envs } from "../utils/config.js";

const VONAGENUMBER = envs.VONAGE_NUMBER;

const router = express.Router();


// Updated to handle GET requests and query parameters
router.get('/incoming-sms', async (req, res) => {
  // Extract message and sender from the query parameters
  const { msisdn, to, text } = req.query;
  const sender = '+' + msisdn;

  // Process the incoming message
  console.log(`Sender: ${sender}, To: ${VONAGENUMBER}, Text: ${text}`);
  const responseMessage = determineResponseMessage(text);

  try {
      // Send the response back to the sender
      await sendSMS(sender, VONAGENUMBER, responseMessage);
      // console.log(`Response sent to ${sender}: ${responseMessage}`);
      res.status(200).json({ message: 'Response sent' });
  } catch (error) {
      // console.error(`Failed to send response to ${sender}: ${error}`);
      res.status(500).json({ error: 'Failed to send SMS response' });
  }
});

export default router;