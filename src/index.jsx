import ForgeUI, { render, ProjectPage } from "@forge/ui";
import { App } from "./components/app";

export const run = render(
  <ProjectPage>
    <App />
  </ProjectPage>
);
