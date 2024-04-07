// src/services/gptService.js
import OpenAI from "openai";

const openai = new OpenAI();

import { envs } from "../utils/config.js";

const openai = new OpenAI.ApiKey({
  apiKey: envs.OPENAI_API_KEY,
});



export async function determineResponseMessage(incomingText) {
  // Prepare GPT-3.5 to understand the context and questions
  const prompt = `The following are responses to common voting-related inquiries:
  
  If someone asks "update pii" or "change info", the bot replies: "To update your personal information, please visit https://impactathon-vote-org.vercel.app/."
  If someone asks "register to vote" or "voter registration", the bot replies: "To register to vote or check your registration status, please visit https://www.vote.org/register-to-vote/."
  If someone asks "voting location" or "where to vote", the bot replies: "Find your polling location and hours by visiting https://www.vote.org/polling-place-locator/."
  If someone asks "election dates" or "when is the election", the bot replies: "To find out about upcoming election dates and deadlines, visit https://www.vote.org/election-dates-deadlines/."
  If someone asks for "help", the bot replies: "For assistance, please specify what you need help with, such as 'register to vote', 'update personal information', or 'find polling location'. Visit https://www.vote.org/ for more information."
  If someone asks about "absentee" or "mail-in ballot", the bot replies: "For information on absentee or mail-in voting, including how to request a ballot, visit https://www.vote.org/absentee-ballot/."
  
  Based on this, how should the bot reply to the following question: "${incomingText}"`;

  try {
    const gptResponse = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.5,
    });

    let message = gptResponse.data.choices[0].text.trim();

    // This is a simple heuristic to ensure the response is one of the predefined options.
    if (message.startsWith('To update your personal information')) {
      return message;
    } else if (message.startsWith('To register to vote')) {
      return message;
    } else if (message.startsWith('Find your polling location')) {
      return message;
    } else if (message.startsWith('To find out about upcoming election dates')) {
      return message;
    } else if (message.startsWith('For assistance, please specify what you need help with')) {
      return message;
    } else if (message.startsWith('For information on absentee or mail-in voting')) {
      return message;
    } else {
      // If GPT-3's response isn't one of the predefined replies, fallback to a default message
      return `I'm not quite sure how to help with that. Can you try asking differently? For more assistance, visit our website at https://www.vote.org/, or to make changes to your personal information, please visit https://impactathon-vote-org.vercel.app/.`;
    }
  } catch (error) {
    console.error('Error querying OpenAI:', error);
    throw new Error('Failed to process the message with OpenAI.');
  }
}
