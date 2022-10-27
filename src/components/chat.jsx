import ForgeUI, { Button, Fragment, Form, useState, Image, Text, Code, TextField, Em, Strong, Heading } from "@forge/ui"
import { get_current_user, send_message } from "../utilities/utils";
import { Interactions } from "./interactions";


export const Chat = () => {
    const [chatState, setChatState] = useState(undefined);

    // Handles form submission, which is a good place to call APIs, or to set component state...
    const onMessageSend = async (formData) => {
          const response = await send_message(formData.message)
          setChatState(response);

  
        
        
      };


    return (
        <Fragment>
          {chatState && <Interactions data={chatState} ></Interactions>}
      <Form onSubmit={onMessageSend} actionButtons={undefined}>
      <TextField label="Message" name="message" placeholder="Type your message here"/>
      </Form>
      
    </Fragment>
    )
}