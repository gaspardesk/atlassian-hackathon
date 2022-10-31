import ForgeUI, { render, useState, useEffect } from "@forge/ui";
import { checkIfSignedUp } from "../requests";
import { Chat } from "./chat";
import { Signup } from "./signup";

export const App = () => {
  const [isSignedUp, setisSignedUp] = useState(false);
  useEffect(async () => {
    if (!isSignedUp) {
      setisSignedUp(await checkIfSignedUp());
    }
  }, [isSignedUp]);

  if (!isSignedUp) {
    return <Signup></Signup>;
  } else {
    return <Chat></Chat>;
  }
};
