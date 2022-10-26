import ForgeUI, { Button, Fragment, Form, useState, Image, Text, TextField, Em, Strong, Heading } from "@forge/ui"
import { get_current_user } from "../utilities/utils";


export const Chat = () => {
    const [chatState, setChatState] = useState(undefined);

    // Handles form submission, which is a good place to call APIs, or to set component state...
    const onMessageSend = async (formData) => {
        
          setChatState(logged_in +' '+ formData.message + " " + JSON.stringify( await django_response.json()));

  
        
        
      };


    return (
        <Fragment>
      <Form onSubmit={onMessageSend}>
      <TextField label="Message" name="message" placeholder="Type your message here"/>
      </Form>
      
    </Fragment>
    )
}