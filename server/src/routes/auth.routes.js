import { Router } from "express";
import {
  Verify,
  Signout,
  Signin,
} from "../controllers/auth.controllers.ts";
import { createSessionCookie } from "../utils/authentication.ts";

const AuthRoutes = Router();

AuthRoutes.get("/verify", Verify);
AuthRoutes.post("/signin", Signin, createSessionCookie);
AuthRoutes.post("/signout", Signout);

export default AuthRoutes;
