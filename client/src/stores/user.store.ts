// store.ts
import { persistentAtom, persistentMap } from "@nanostores/persistent";

interface UserData extends Record<string, string | undefined> {
  firstName: string;
  lastName: string;
  email: string;
}

const AuthPopup = persistentAtom<string>("auth_popup", "false");
const UserInfo = persistentMap<UserData>("user-data", {
  firstName: "",
  lastName: "",
  email: "",
});

export { AuthPopup, UserInfo };
