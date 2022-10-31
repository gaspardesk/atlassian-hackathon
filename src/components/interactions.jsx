import ForgeUI, { Fragment, useState, Text, Button } from "@forge/ui";
import { Article } from "./article";
import { Suggestion } from "./suggestion";
import { ModalFormComponent } from "./ModalFormComponent";
import { form_definition_request, create_manual_ticket } from "../requests";

export const Interactions = (props) => {
  const { chatState, setChatState, appendToHistory, setChatHistory } = props;
  const [intentionIndex, setIntentionIndex] = useState(0);
  const [loadedData, setLoadedData] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articlesAreRelevant, setArticlesAreRelevant] = useState(true);
  const [declinedTicketModal, setDeclinedTicketModal] = useState(false);
  const [intentionConfirmed, setIntentionConfirmed] = useState(false);

  const setRelevance = (value) => {
    appendToHistory("Marked the knowledge based article(s) as not relevant.");
    setArticlesAreRelevant(value);
  };

  const incrementIntentionIndex = (value) => {
    appendToHistory(chatState.intentions[intentionIndex].prompt, true);
    appendToHistory(`Declined the automation.`);
    setIntentionIndex(value);
  };

  const submitForm = async (formData) => {
    await create_manual_ticket(formData);
    setIsModalOpen(false);
    appendToHistory("Successfully submitted your ticket.", true);
    setChatState(undefined);
  };

  // Handles form submission, which is a good place to call APIs, or to set component state...
  const getFormDescription = async () => {
    const response = await form_definition_request();
    setLoadedData(response);
    setIsModalOpen(true);
  };

  const onCreateTicket = async () => {
    await getFormDescription();
    setIsModalOpen(true);
  };

  const onMoreHelpClick = () => {
    setChatState(undefined);
    setChatHistory([]);
  };

  const onNoMoreHelpClick = () => {
    setChatState(undefined);
    setChatHistory([]);
  };

  const renderIntentions = () => {
    if (!chatState) {
      return <Text>No Response Received, Please Refresh</Text>;
    }

    if (
      chatState.intentions &&
      intentionIndex < chatState.intentions.length &&
      !intentionConfirmed
    ) {
      return (
        <Suggestion
          intention={chatState.intentions[intentionIndex]}
          onChange={incrementIntentionIndex}
          index={intentionIndex}
          appendToHistory={appendToHistory}
          setIntentionConfirmed={setIntentionConfirmed}
        ></Suggestion>
      );
    } else if (
      chatState.articles &&
      articlesAreRelevant &&
      !intentionConfirmed
    ) {
      return (
        <Article
          articles={chatState.articles}
          setIsRelevant={setRelevance}
          isRelevant={articlesAreRelevant}
          appendToHistory={appendToHistory}
        ></Article>
      );
    } else if (!declinedTicketModal && !intentionConfirmed) {
      return (
        <Fragment>
          <Button
            text="Open a Ticket"
            onClick={() => onCreateTicket()}
          ></Button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Text>Is there anything else i can help you with?</Text>
          <Button text="Yes" onClick={() => onMoreHelpClick()}></Button>
          <Button
            text="No, thank you."
            appearance="subtle"
            onClick={() => onNoMoreHelpClick()}
          ></Button>
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      {renderIntentions()}
      {isModalOpen && (
        <ModalFormComponent
          data={loadedData}
          modalTitle="Create a Ticket"
          toggleModalHandler={() => {
            appendToHistory("Closed the modal for creating a new ticket.");
            setIsModalOpen(false);
            setDeclinedTicketModal(true);
          }}
          onSubmitHandler={(formData) => submitForm(formData)}
        ></ModalFormComponent>
      )}
    </Fragment>
  );
};
