import {
	getAuth,
	isSignInWithEmailLink,
	sendSignInLinkToEmail,
	indexedDBLocalPersistence,
} from "firebase/auth";

import env from "../lib/env.js";
import { app } from "./firebase.js";

// Initialize Firebase Authentication.
const auth = getAuth(app);
auth.setPersistence(indexedDBLocalPersistence);

/**
 * Sends signin link to user's email.
 * @param newUser Boolean whether user is new or not.
 * @param userType Type of user, either creator or backer.
 * @param redirectPath Path to redirect to after signin process is complete.
 * @param email Email to send signin link to.
 */
const sendSigninLink = async (email: string, redirectPath: string) => {
	const actionCodeSettings = {
		url: `${env.FRONTEND_URL}${redirectPath}?email=${email}`,
		handleCodeInApp: true,
	};
	window.localStorage.setItem("emailForSignIn", email);
	const result = await sendSignInLinkToEmail(auth, email, actionCodeSettings);
};

/**
 * Signs in user from email link.
 * @param redirectPath Path to redirect to after signin process is complete.
 */
const signinFromLink = async (redirectPath: string) => {
	if (isSignInWithEmailLink(auth, window.location.href)) {
		window.location.assign(redirectPath);
	}
};


/**
 * Total check for authentication.
 */
const CheckAuth = async () => {
	const redirectPath: string = window.location.pathname;
	await signinFromLink(redirectPath);
};

export { auth, CheckAuth, sendSigninLink };
