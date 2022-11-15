import ForgeUI, { render, useState, useEffect } from "@forge/ui";
import { checkIfSignedUp, get_current_user } from "../requests";
import { Chat } from "./chat";
import { Signup } from "./signup";

export const App = () => {
  const [isSignedUp, setisSignedUp] = useState(false);
  useEffect(async () => {
    if (!isSignedUp) {
      const current_user = await get_current_user();
      setisSignedUp(await checkIfSignedUp(current_user.domain_name));
    }
  }, [isSignedUp]);

  if (!isSignedUp) {
    return <Signup></Signup>;
  } else {
    return <Chat></Chat>;
  }
};
