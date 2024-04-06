import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { envs } from "./src/utils/config.js";
import { ApiErrorHandler } from "./src/errors/handler.error.js";
import AuthRoutes from "./src/routes/auth.routes.js";

/** Server setup */
var app = express();

app.set("trust proxy", true);

app.use(cors({ origin: envs.FRONT_END_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/auth", AuthRoutes);

app.use(ApiErrorHandler);

export default app;
