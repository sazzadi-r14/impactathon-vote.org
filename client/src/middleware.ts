import { defineMiddleware } from "astro:middleware";
import env from "@env";
import { auth } from "./services/authentication";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

const protectedRoutes: string[] = [
	"/profile",
];

const verify_user = async (cookie: string) => {
	const res = await fetch(`${env.BACKEND_URL}/auth/verify`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			sessioncookie: `${cookie}`,
		},
	});

	return await res.json();
};

export const onRequest = defineMiddleware(async (context, next) => {
	const requestId = context.cookies.get("requestId")?.value;
	const pathname = context.url.pathname;
	const href = context.url.href;

	if (protectedRoutes.includes(pathname)) {
		const signinPath = `/signin?redirect=${pathname}`;

		// If user signed in from email link.
		if (isSignInWithEmailLink(auth, href)) {
			const email = context.url.searchParams.get("email") || "";

			try {
				const result = await signInWithEmailLink(auth, email, href);
				const idToken = await result.user.getIdToken(true);

				const res = await fetch(`${env.BACKEND_URL}/auth/signin`, {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${idToken}`,
					},
					body: JSON.stringify({
						email: result.user.email,
						requestId,
					}),
				});

				const sessionCookie =
					res.headers
						.getSetCookie()[0]
						.split(";")
						.find((e) => e.includes("__session="))
						?.substring(10) || "";

				context.cookies.set("__session", sessionCookie, {
					httpOnly: false,
					secure: true,
					maxAge: 60 * 60 * 24 * 5, // 1 week
					path: "/",
					domain: env.PROD ? "impactathon-vote-org.vercel.app" : "localhost",
				});

				console.log(sessionCookie)


			} catch (err) {
				console.log(err)
				return context.redirect(signinPath);
			}
		}

		// Proceed with regular authentication.
		const sessionCookie = context.cookies.get("__session");
		if (!sessionCookie) return context.redirect(signinPath); // ? Condition 1: No cookie.

		// Fetch user data and see if cookie is valid.
		const { message, user } = await verify_user(sessionCookie.value);

		if (message !== "Authorized") return context.redirect(signinPath); // ? Condition 2: Invalid cookie.

		// Add user to Astro context.
		context.props.user = user;
	} else if (isSignInWithEmailLink(auth, href)) {
		const email = context.url.searchParams.get("email") || "";
		const referralCode = context.url.searchParams.get("referral") || "";

		try {
			const result = await signInWithEmailLink(auth, email, href);
			const idToken = await result.user.getIdToken(true);

			const res = await fetch(`${env.BACKEND_URL}/auth/signin`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${idToken}`,
				},
				body: JSON.stringify({
					email: result.user.email,
					referral_code: referralCode,
					requestId,
				}),
			});

			const sessionCookie =
				res.headers
					.getSetCookie()[0]
					.split(";")
					.find((e) => e.includes("__session="))
					?.substring(10) || "";

			context.cookies.set("__session", sessionCookie, {
				httpOnly: false,
				secure: true,
				maxAge: 60 * 60 * 24 * 5, // 1 week
				path: "/",
				domain: env.PROD ? "impactathon-vote-org.vercel.app" : "localhost",
			});
		} catch (err) {}

		// Proceed with regular authentication.
		const sessionCookie = context.cookies.get("__session");

		if (sessionCookie) {
			// Fetch user data and see if cookie is valid.
			const { user } = await verify_user(sessionCookie.value);

			// Add user to Astro context.
			context.props.user = user;
		}
	} else {
		const sessionCookie = context.cookies.get("__session");
		let authorized = false;
		let user;

		if (sessionCookie) {
			const res = await verify_user(sessionCookie.value);
			if (res.message === "Authorized") {
				authorized = true;
				user = res.user;
			}
		}

		context.props.user = authorized ? user : null;
	}

	return next();
});
