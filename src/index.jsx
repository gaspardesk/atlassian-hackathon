import api, { route, fetch } from "@forge/api";
import { view } from '@forge/bridge';
import ForgeUI, { render, QueuePage, Fragment, Text, useProductContext, useState, TextField, Form } from "@forge/ui";
import axios from "axios";


const App = () => {
    // useState is a UI kit hook we use to manage the form data in local state
    const [formState, setFormState] = useState(undefined);

    // Handles form submission, which is a good place to call APIs, or to set component state...
    const onSubmit = async (formData) => {
      // const res = await axios.get(`https://8d16-94-66-221-143.eu.ngrok.io/common/jira_metrics`);
      const response = await api.asUser().requestJira(
        route`/rest/api/3/myself`
      );
      setFormState(response.json());
    };


  return (
    <Fragment>
      <Text>Hello world!</Text>
      <Fragment>
        {formState && <Text>{JSON.stringify(formState)}</Text>}</Fragment>
      <Form onSubmit={onSubmit}>
      <TextField label="Message" name="message" placeholder="Type your message here"/>
      </Form>
    </Fragment>
  );
};

export const run = render(
  <QueuePage>
    <App />
  </QueuePage>
);
