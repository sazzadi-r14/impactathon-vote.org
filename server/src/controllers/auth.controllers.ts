import { fireAuth } from "../services/firebase.js";
import { ApiError } from "../errors/class.error.js";
import { envs } from "../utils/config.js";

const Verify = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Authorized",
    });
  } catch (err) {
    next(err);
  }
};

const Signout = async (req, res, next) => {
  try {
    res.clearCookie("__session", {
      path: "/",
    });
  } catch (error) {
    next(error);
  }
};

const Signin = async (req, res, next) => {
  try {
    const idToken = req.get("Authorization")?.split("Bearer ")[1];
    if (!idToken) throw new ApiError("No idToken provided");

    const { email } = req.body;

    // Fetch user from firebase
    const userFirebase = await fireAuth.getUserByEmail(email);
    const { uid } = userFirebase;


    req.idToken = idToken;

    next();
  } catch (error) {
    next(error);
  }
};


export { Verify, Signout, Signin };
