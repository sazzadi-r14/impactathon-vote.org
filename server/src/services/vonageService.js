import { Vonage } from '@vonage/server-sdk';
import { envs } from "../utils/config.js";

// Initialize the Vonage client
const vonageClient = new Vonage({
  apiKey: envs.VONAGE_API_KEY,
  apiSecret: envs.VONAGE_API_SECRET,
});

// Function to send an SMS using the Vonage client
export async function sendSMS(to, from, text) {
  try {
    const response = await vonageClient.sms.send({to, from, text});
    console.log('Message sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
}
