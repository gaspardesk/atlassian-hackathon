import ForgeUI, {
  Fragment,
  Form,
  useState,
  TextField,
  Text,
  Strong,
  Heading,
} from "@forge/ui";
import { send_message } from "../requests";
import { Interactions } from "./interactions";

export const Chat = () => {
  const [chatState, setChatState] = useState(undefined);
  const [chatHistory, setChatHistory] = useState([]);

  const appendToHistory = (message, isFromBot = false) => {
    let user;
    if (!isFromBot) {
      user = "You";
    } else {
      user = "Gaspar";
    }
    // Fool the state so it can update itself.
    let history = chatHistory;
    history.push(
      <Text>
        <Strong>{user}</Strong>: {message}
      </Text>
    );
    setChatHistory(history);
  };

  // Handles form submission, which is a good place to call APIs, or to set component state...
  const onMessageSend = async (formData) => {
    let history = [];
    setChatHistory(history);
    const response = await send_message(formData.message);
    setChatState(response);
    appendToHistory(formData.message);
  };

  return (
    <Fragment>
      <Heading size="small">Gaspardesk, your virtual AI agent.</Heading>
      {chatHistory.map((history) => history)}
      {chatState && (
        <Interactions
          chatState={chatState}
          setChatState={setChatState}
          appendToHistory={appendToHistory}
          setChatHistory={setChatHistory}
        ></Interactions>
      )}
      {!chatState ? (
        <Form onSubmit={onMessageSend}>
          <TextField
            label="Ask me something"
            name="message"
            placeholder="Type your message here"
          />
        </Form>
      ) : null}
    </Fragment>
  );
};
