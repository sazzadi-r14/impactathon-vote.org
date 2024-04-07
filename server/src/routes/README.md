
### API Documentation (`README.md`)

This document provides an overview of the API endpoints and their functionality.
---

## SMS Service API

### Incoming SMS Webhook

Handles incoming SMS messages, processes them, and sends an automated response back to the sender.

#### GET `/incoming-sms`

This endpoint is triggered by incoming SMS messages to the specified service number. It expects URL query parameters containing the message details and sends a processed response back to the sender.

**Query Parameters:**

- `msisdn`: The sender's phone number.
- `to`: The recipient's phone number (your service number).
- `text`: The text content of the incoming SMS message.

**Responses:**

- `200 OK`: The response message was successfully sent back to the sender.
  - **Body:**
    ```json
    {
      "message": "Response sent"
    }
    ```

- `500 Internal Server Error`: Failed to send the response message due to an internal error.
  - **Body:**
    ```json
    {
      "error": "Failed to send SMS response"
    }
    ```

**Example Request:**

```
GET /incoming-sms?msisdn=123456789&to=987654321&text=Hello
```

**Example Successful Response:**

```json
{
  "message": "Response sent"
}
```

**Example Error Response:**

```json
{
  "error": "Failed to send SMS response"
}
```

This endpoint facilitates automated, AI-driven responses to incoming SMS messages, leveraging the Vonage SMS and a GPT-based service for message processing.

---

## Email Service API

### Overview

The Email Service API consists of endpoints designed to trigger the sending of emails to either users or administrators. This documentation outlines the available endpoints, their expected payloads, and the responses they generate.

### Endpoints

#### Send Email to User

Sends an email to a user with content specified in the request.

- **Method:** POST
- **URL:** `/user`
- **Payload:** The request body should contain the details necessary for composing the email, such as the recipient's address, subject, and body content. The exact structure of this payload depends on the implementation of the `UserFacingEmail` controller.
- **Responses:**
  - **200 OK:** Email successfully sent.
  - **400 Bad Request:** Invalid request format or content.
  - **500 Internal Server Error:** Server-side error preventing the email from being sent.

#### Send Email to Admin

Triggers the sending of an administrative email, typically containing alerts or notifications relevant to system administrators.

- **Method:** POST
- **URL:** `/admin`
- **Payload:** Similar to the user email endpoint, this requires details for the email composition, tailored to administrative content. The structure is dictated by the `AdminFacingEmail` controller's expectations.
- **Responses:**
  - **200 OK:** Email successfully dispatched.
  - **400 Bad Request:** Request did not meet the required schema or was otherwise malformed.
  - **500 Internal Server Error:** Unexpected error encountered during email processing.


### Example Response (200 OK)

```json
{
  "message": "Email sent successfully"
}
```

This section of the documentation provides necessary details for consuming the Email Service API, facilitating clear communication between the client-side and server-side components of your application.

--- 

## Authentication API

### Overview

The Authentication API provides endpoints for managing user sessions, including sign-in, sign-out, and session verification. Below are the details for each endpoint.

### Endpoints

#### Verify Session

- **Method:** GET
- **URL:** `/verify`
- **Description:** Checks if the user's current session is valid. Used to verify authentication status without requiring user credentials.
- **Responses:**
  - **200 OK:** Session is valid. Additional details may be included in the response body.
  - **401 Unauthorized:** Session is not valid or has expired.

#### Sign In

- **Method:** POST
- **URL:** `/signin`
- **Description:** Authenticates the user with provided credentials and initiates a session.
- **Payload Example:**
  ```json
  {
    "username": "user@example.com",
    "password": "securepassword123"
  }
  ```
- **Responses:**
  - **200 OK:** Successfully authenticated. A session cookie is set in the response.
  - **401 Unauthorized:** Authentication failed. Incorrect credentials.

#### Sign Out

- **Method:** POST
- **URL:** `/signout`
- **Description:** Ends the user's current session and clears the session cookie.
- **Responses:**
  - **200 OK:** Successfully signed out.
  - **401 Unauthorized:** User was not signed in or session has already expired.

### Example Request (Sign In)

```http
POST /signin
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "securepassword123"
}
```

### Example Response (Sign In - 200 OK)

```json
{
  "message": "Sign-in successful"
}
```

---