import { useState } from "react";
import { sendSigninLink, signinFromGoogle } from "../../services/authentication.ts";
import { AuthPopup } from "../../stores/user.store.ts";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";

/**
 * @param {Object} param0 - The object containing user registration details.
 * @param {string | undefined} param0.redirectPath - The URL to redirect to after registration.
 * @param {string} param0.joinButtonText - The text to display on the join button.
 * @param {string} param0.googleButtonText - The text to display on the Google button.
 * @param {string | undefined} param0.description - The description to display above the form.
 * @param {string | undefined} param0.subDescription - The sub-description to display above the form.
 * @param {string | undefined} param0.confirmation - The confirmation message to display after signup/in.
 */
export default function AuthModal({
  redirectPath,
  joinButtonText,
  googleButtonText,
  description,
  subDescription = "",
  confirmation,
}) {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    // Validate the new email.
    const isEmailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    setEmailValid(isEmailValid);
  };

  const emailLinkSignin = async () => {
    setButtonDisabled(true);
    await sendSigninLink(email, redirectPath);
    setSubmitted(true);
    setButtonDisabled(false);
  };

  const googleSignin = async () => {
    setButtonDisabled(true);
    await signinFromGoogle();
    AuthPopup.set("false");
    window.location.assign(redirectPath);
  };

  return (
    <div className="sm:w-80 px-4 pt-4 pb-8 sm:px-8 bg-secondary rounded-2xl">
      {description && (
        <div className="text-white text-center font-bold text-xl pt-8">{description}</div>
      )}
      {subDescription && (
        <div className="flex justify-center">
          <div className="text-white text-center text-base font-serif w-3/4 pt-4 ">
            {subDescription}
          </div>
        </div>
      )}
      <div className="pt-8">
        <div className={`space-y-6 ${submitted ? "" : "hidden"}`}>
          <div className="text-center text-white">
            {confirmation ? (
              confirmation
            ) : (
              <>
                Email sent. <br /> If you can't find it in your inbox, check spam.
              </>
            )}
          </div>
          <div className="flex justify-center w-full">
            <Button className="bg-primary rounded-full px-8" onClick={() => setSubmitted(false)}>
              Back
            </Button>
          </div>
        </div>
        <div className={`space-y-6 ${submitted ? "hidden" : ""}`}>
          <Input
            type="text"
            variant="outlined"
            label="Email"
            error={!emailValid}
            onChange={handleEmailChange}
          />

          <Button
            className="bg-primary rounded-full w-full"
            onClick={emailLinkSignin}
            disabled={buttonDisabled}
          >
            <div className="normal-case text-base font-normal">{joinButtonText}</div>
          </Button>

          <div className="text-zinc-400 text-center">or</div>

          <Button
            className="flex justify-between items-center bg-white rounded-full w-full border border-zinc-100"
            onClick={googleSignin}
            disabled={buttonDisabled}
          >
            <img src="icons/google.png" className="h-6 w-6" />
            <div className="text-black normal-case text-base font-light">{googleButtonText}</div>
            <div className="w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
