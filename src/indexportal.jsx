import ForgeUI, { render, PortalFooter } from "@forge/ui";
import { App } from "./components/app";

export const run = render(
  <PortalFooter>
    <App />
  </PortalFooter>
);
