import ForgeUI, { render, ProjectPage, useState, useEffect } from "@forge/ui";
import { checkIfSignedUp } from "../utilities/utils";
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
