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
    // console.log('Message sent successfully:', response);
    return response;
  } catch (error) {
    // console.error('Error sending SMS:', error);
    throw error;
  }
}


// Function to determine the response message based on incoming text
export function determineResponseMessage(incomingText) {
  // Basic parsing logic - you can make this more sophisticated to better understand user intents
  if (incomingText.toLowerCase().includes("update pii") || incomingText.toLowerCase().includes("change info")) {
    return "To update your personal information, please visit https://impactathon-vote-org.vercel.app/.";
  }
  
  // Add more conditions for other types of inquiries or guidance
  // Example for a generic help response
  if (incomingText.toLowerCase().includes("help")) {
    return "For assistance, please reply with 'Update PII' to update your personal information, or visit https://www.vote.org/ for more options.";
  }

  // Default message if none of the conditions are met
  return "Welcome to Vote.org! For help updating your personal info, reply with 'Update PII'. For more assistance, visit our website(https://www.vote.org/).";
}


// Example usage in your application (assuming you have a way to capture incoming messages):
/*
const incomingText = "I want to update my information"; // Example text, replace with actual incoming message
const responseMessage = determineResponseMessage(incomingText);
// Use sendSMS function to send the responseMessage back to the user
*/