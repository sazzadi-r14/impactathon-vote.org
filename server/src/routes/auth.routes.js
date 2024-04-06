import { Router } from "express";
import {
  Verify,
  Signout,
  Signin,
} from "../controllers/auth.controllers.ts";
import { createSessionCookie, authUserCookie } from "../utils/authentication.ts";

const AuthRoutes = Router();

AuthRoutes.get("/verify", authUserCookie, Verify);
AuthRoutes.post("/signin", Signin, createSessionCookie);
AuthRoutes.post("/signout", Signout);

export default AuthRoutes;
