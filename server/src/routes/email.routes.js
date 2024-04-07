import { Router } from "express";
import {
  UserFacingEmail,
  AdminFacingEmail,
} from "../controllers/email.controllers.ts";

const EmailRoutes = Router();

EmailRoutes.post("/user", UserFacingEmail);
EmailRoutes.post("/admin", AdminFacingEmail);

export default EmailRoutes;
