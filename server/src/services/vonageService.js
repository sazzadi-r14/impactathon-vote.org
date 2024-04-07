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
  const text = incomingText.toLowerCase();
  
  // Improved parsing logic with more conditions for specific inquiries
  if (text.includes("update pii") || text.includes("change info")) {
    return "To update your personal information, please visit https://impactathon-vote-org.vercel.app/.";
  } else if (text.match(/(register to vote|voter registration)/)) {
    return "To register to vote or check your registration status, please visit https://www.vote.org/register-to-vote/.";
  } else if (text.match(/(voting location|where to vote)/)) {
    return "Find your polling location and hours by visiting https://www.vote.org/polling-place-locator/.";
  } else if (text.includes("election dates") || text.includes("when is the election")) {
    return "To find out about upcoming election dates and deadlines, visit https://www.vote.org/election-dates-deadlines/.";
  } else if (text.includes("help")) {
    return "For assistance, please specify what you need help with, such as 'register to vote', 'update personal information', or 'find polling location'. Visit https://www.vote.org/ for more information.";
  } else if (text.match(/(absentee|mail-in ballot)/)) {
    return "For information on absentee or mail-in voting, including how to request a ballot, visit https://www.vote.org/absentee-ballot/.";
  }

  // Suggestion engine for unrecognized queries
  const suggestions = ["register to vote", "update pii", "voting location", "election dates", "help"];
  const suggestionList = suggestions.map(suggestion => `'${suggestion}'`).join(", ");
  
  // Default message encourages specifying the request or exploring common topics
  return `Welcome to Vote.org! If you need assistance, try specifying your request. For example, ${suggestionList}. For more assistance, visit our website at https://www.vote.org/.`;
}
