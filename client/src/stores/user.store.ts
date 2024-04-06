// store.ts
import { persistentAtom, persistentMap } from "@nanostores/persistent";

interface UserData extends Record<string, string | undefined> {
  firstName: string;
  lastName: string;
  email: string;
}

const AuthPopup = persistentAtom<string>("auth_popup", "false");
const CurrentStream = persistentAtom<string>("current_stream", undefined);
const NewVisit = persistentAtom<string>("new_visit", "true");

const UserInfo = persistentMap<UserData>("user-data", {
  firstName: "",
  lastName: "",
  email: "",
});

function SetNewVisit(bool: boolean) {
  NewVisit.set(bool.toString());
}

export { AuthPopup, CurrentStream, UserInfo, NewVisit, SetNewVisit };
