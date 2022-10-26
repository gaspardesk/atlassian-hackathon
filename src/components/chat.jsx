import ForgeUI, { Button, Fragment, Form, useState, Image, Text, TextField, Em, Strong, Heading } from "@forge/ui"

export const Chat = () => {
    const [chatState, setChatState] = useState(undefined);

    // Handles form submission, which is a good place to call APIs, or to set component state...
    const onMessageSend = async (formData) => {
        const current_user = get_current_user()
        const now = new Date().toISOString();
        const signature = signKey(current_user.domain_name + now);
        let logged_in = "Unknown";
        const message_body = {
          query: formData.message,
          user_email: user.emailAddress,
          user_id: user.accountId
        }
        console.log(message_body);
        try{
  
          const django_response = await fetch(`https://8d06-94-66-221-143.eu.ngrok.io/forge/message`, {
            headers: {
              "X-Forge-payload": `${domain_name}${now}`,
              "X-Forge-signature": signature,
            },
            method: 'POST',
            body: JSON.stringify(message_body)
          });
          console.log(django_response.statusText);
          logged_in = "You have signed Up";
          setFormState(logged_in +' '+ formData.message + " " + JSON.stringify( await django_response.json()));
        }
        catch (error) {
          console.log(error.message);
          logged_in = "You have NOT signed Up";
        }
  
        
        
      };


    return (
        <Fragment>
      <Form onSubmit={onMessageSend}>
      <TextField label="Message" name="message" placeholder="Type your message here"/>
      </Form>
      {}
    </Fragment>
    )
}