import api, { route, fetch } from "@forge/api";
import { view } from '@forge/bridge';
import ForgeUI, { render, QueuePage, Fragment, Text, useProductContext, useState, TextField, Form } from "@forge/ui";
import * as crypto from 'crypto';
import axios from "axios";


const App = () => {
    // useState is a UI kit hook we use to manage the form data in local state
    const [formState, setFormState] = useState(undefined);

    function signKey (message) {
      return crypto.createHmac('sha256', Buffer.from(process.env.HMAC_KEY, 'hex')).update(message).digest('hex');
  }

    // Handles form submission, which is a good place to call APIs, or to set component state...
    const onSubmit = async (formData) => {
      const response = await api.asUser().requestJira(
        route`/rest/api/3/myself`
      );
      const user = await response.json();
      const organization_domain = user.emailAddress.split("@")[1];
      const domain_name = organization_domain.split(".")[0];
      const now = new Date().toISOString();
      const signature = signKey(domain_name + now);
      let logged_in = "Unknown";
      try{
        const response = await fetch(`https://6fd0-94-66-221-143.eu.ngrok.io/forge/message`, {
          headers: {
            "X-Forge-payload": `${domain_name}${now}`,
            "X-Forge-signature": signature,
          },
          method: 'POST'
        });
        console.log(response.statusText);
        logged_in = "You have signed Up";
      }
      catch (error) {
        console.log(error.message);
        logged_in = "You have NOT signed Up";
      }

      
      setFormState(logged_in);
    };



  return (
    <Fragment>
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
