import { fireAuth } from "../services/firebase.js";
import User from "../models/user.model.js";
import { ApiError } from "../errors/class.error.js";
import { envs } from "./config.js";

const authUser = async (req, res, next) => {
  try {
    // Get token from request headers
    const idToken = req.get("Authorization")?.split("Bearer ")[1];
    if (!idToken) {
      throw new ApiError(401, "No token found");
    }

    // Verify id token
    const authInfo = await fireAuth.verifyIdToken(idToken);
    if (!authInfo) throw new ApiError(401, "Invalid token");

    // Get firebaseId
    const { uid: firebaseId } = authInfo;

    // Get user from database
    const user = await User.findOne({ firebaseId });
    if (!user) throw new ApiError(401, "User not found");
    req.user = user;
    req.idToken = idToken;

    next();
  } catch (error) {
    next(error);
  }
};

const createSessionCookie = async (req, res, next) => {
  try {
    const idToken = req.idToken; // Should be set by previous middleware/controllers

    const fiveDays = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await fireAuth.createSessionCookie(idToken, {
      expiresIn: fiveDays,
    });

    res.cookie("__session", sessionCookie, {
      httpOnly: false,
      path: "/",
      maxAge: fiveDays,
      domain: envs.NODE_ENV == "dev" ? "localhost" : "",
    });

    console.log("Check")

    res.status(200).json({
      message: "Authorized",
    });
  } catch (err) {
    next(err);
  }
};

export { authUser, createSessionCookie };
