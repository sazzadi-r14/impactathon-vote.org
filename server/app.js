// server/src/app.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { envs } from "./src/utils/config.js";
import { ApiErrorHandler } from "./src/errors/handler.error.js";
import AuthRoutes from "./src/routes/auth.routes.js";
import smsRoutes from './src/routes/sms.routes.js';
import EmailRoutes from "./src/routes/email.routes.js";


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
app.use('/webhooks', smsRoutes); // Moved to the correct place after initializing 'app'
app.use("/email", EmailRoutes);

// Error handling middleware
app.use(ApiErrorHandler);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
