// src/services/gptService.js

import { envs } from "../utils/config.js";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: envs.OPENAI_API_KEY,
});

export async function determineResponseMessage(incomingText) {
  // The prompt does not need to be repeated for every call if using ChatGPT API
  // as the conversation history provides the context.
  const messages = [{
    role: "system",
    content: `The following are responses to common voting-related inquiries:
    
    If someone asks "update pii" or "change info", the bot replies: "To update your personal information, please visit https://impactathon-vote-org.vercel.app/."
    If someone asks "register to vote" or "voter registration", the bot replies: "To register to vote or check your registration status, please visit https://www.vote.org/register-to-vote/."
    If someone asks "voting location" or "where to vote", the bot replies: "Find your polling location and hours by visiting https://www.vote.org/polling-place-locator/."
    If someone asks "election dates" or "when is the election", the bot replies: "To find out about upcoming election dates and deadlines, visit https://www.vote.org/election-dates-deadlines/."
    If someone asks for "help", the bot replies: "For assistance, please specify what you need help with, such as 'register to vote', 'update personal information', or 'find polling location'. Visit https://www.vote.org/ for more information."
    If someone asks about "absentee" or "mail-in ballot", the bot replies: "For information on absentee or mail-in voting, including how to request a ballot, visit https://www.vote.org/absentee-ballot/."
    `
  }, {
    role: "user",
    content: incomingText
  }];

  try {
    const response = await await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      max_tokens: 1500,
    });


    if (response && response.choices) {
      let message = response.choices[0].message.content.trim();
      console.log('ChatGPT response:', message);
      // No need for a heuristic check here as the response is expected to be contextually relevant
      return message;
    } else {
      // Handle unexpected response structure
      console.error('Unexpected response structure:', response);
      throw new Error('ChatGPT response structure is not as expected.');
    }
  } catch (error) {
    console.error('Error querying OpenAI ChatGPT:', error);
    throw new Error('Failed to process the message with OpenAI ChatGPT.');
  }
}
