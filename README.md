# Vote.org - Voter Information Access & Privacy Tool

## Introduction
This project is created for the Stanford x MIT Social Good Hackathon, aiming to provide a novel solution for Vote.org, a nonprofit organization focused on using technology to simplify political engagement and increase voter turnout. The tool addresses the need for voters to have control over their Personally Identifiable Information (PII) within Vote.org's systems.

## Project Description
Our tool empowers voters to request viewing, updating, or deleting their PII, ensuring Vote.org's compliance with the latest privacy legislations. It verifies the identity of users through their email addresses before granting access to their PII. Furthermore, it notifies users after their requests have been processed. The solution is designed to be flexible, extendable, and maintainable.

## Table of Contents
- [Introduction](#introduction)
- [Project Description](#project-description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Contact](#contact)

## Installation
To participate in developing or testing this tool, follow the steps below:

1. Ensure Node.js and npm are installed on your system.
2. Clone the repository:
   git clone https://github.com/your-repository/vote-org-tool.git
3. Navigate to the cloned directory:
   cd vote-org-tool
4. Install the dependencies:
    npm install

## Usage
To run the Vote.org tool:

1. Start the local server:
    npm run dev
2. Access the tool at `http://localhost:3000` and follow the on-screen instructions to interact with the voter information.

## Features
- Secure viewing, updating, and deletion of PII.
- Email verification to confirm user identity.
- User notification upon request completion.
- Solution flexibility and maintainability.
- Potential integration with chatbot services like Intercom.

## Hosted Application for PII Editing

For users who prefer to access the PII editing page directly via a web interface, visit our website at:

[Impactathon Vote Organization](https://impactathon-vote-org.vercel.app/)

## Interacting with the AI via SMS

Our application provides a unique way for users to interact with an AI agent through SMS, making it accessible in multiple languages to accommodate a wide range of users. This feature allows users to conveniently receive a link to a page where they can edit their Personal Identification Information (PII) directly from their mobile device.

### How to Use

1. **Send a Text Message**: Simply send a text message to **+1 (833) 429-6081**. This message can be in any of the supported languages.

2. **Interact with the AI**: After sending your message, you will interact with our AI agent, which will guide you through the process.

3. **Receive the Link**: The AI agent will send you a link to access the page where you can edit your PII. This ensures that your information is always under your control and easily accessible.

### Supported Languages

Our system supports multiple languages, ensuring that users from different linguistic backgrounds can easily interact with the AI agent. This approach enhances accessibility and user experience.

## Setting Up a Vonage Webhook for Text Messaging

To enable real-time SMS processing with Vonage, you need to configure a webhook that Vonage will call whenever your number receives an SMS. This allows your application to respond to messages as soon as they are received.

### Step 1: Obtain a Vonage Phone Number

Follow the initial steps in the previous guide to sign up for Vonage and purchase a phone number that supports SMS.

### Step 2: Expose Your Local Development Server (Optional for Testing)

If you're developing locally and want to test webhooks, you'll need to expose your server to the internet. Tools like [ngrok](https://ngrok.com/) can provide a temporary public URL that forwards to your local server.

- Download and start ngrok, pointing it to your server's port (e.g., `ngrok http 3000`).
- Note the public URL provided by ngrok (e.g., `https://12345.ngrok.io`).

### Step 3: Configure Your Vonage Number to Use the Webhook

1. Log into the [Vonage Dashboard](https://dashboard.nexmo.com/).
2. Navigate to ["Your numbers"](https://dashboard.nexmo.com/your-numbers) and select the number you wish to use.
3. Find the section for configuring webhooks and enter the URL for your webhook endpoint in the field for incoming SMS. The URL will look something like `https://12345.ngrok.io/incoming-sms` if you're using ngrok or your server's base URL followed by `/incoming-sms` if deployed.
4. Save your changes.

### Step 4: Implement Your Webhook Endpoint

On your server, create an endpoint to handle incoming SMS messages. You can find an example using Express.js in:

```shell
server/src/routes/sms.routes.js
```

### Step 5: Test Your Setup

Send an SMS to your Vonage number. Vonage will make a GET request to your webhook URL with the message data. Your server should log the message, indicating that the setup works.

### Notes

- For production, replace the ngrok URL with your actual server's URL.
- Make sure your server is properly secured and validates that incoming requests are from Vonage.
- Consult the [Vonage SMS API documentation](https://developer.vonage.com/messaging/sms/overview) for more details on working with SMS messages and webhooks.

By following these steps, you can set up a webhook to process SMS messages with Vonage, enabling real-time interaction within your application.

## Contributing
Contributions are welcome. Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add Your Feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

Please adhere to this project's `code of conduct` while contributing.

## Contact
For any questions related to this project, please reach out to the project representative
Sayed Ardhi - sayed@stanford.edu

---
We are happy to work on a project that strengthens democracy through technology.
