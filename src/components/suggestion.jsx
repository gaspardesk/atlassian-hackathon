import ForgeUI, {
  Text,
  ButtonSet,
  Button,
  Fragment,
  useEffect,
  useState,
} from "@forge/ui";
import { create_automated_ticket, retrieve_worker_form } from "../requests";
import { ModalFormComponent } from "./ModalFormComponent";

export const Suggestion = (props) => {
  const [workerFormState, setWorkerFormState] = useState(false);
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [responseLoaded, setResponseLoaded] = useState(false);

  const { appendToHistory, index, onChange, setIntentionConfirmed } = props;

  const confirmSuggestion = async () => {
    const response = await retrieve_worker_form(props.intention.worker);
    setWorkerFormState(response);
    setResponseLoaded(true);
  };

  const onTicketCreate = async (formData) => {
    const data = {
      tag: props.intention.worker.tag,
      values: formData,
    };
    await create_automated_ticket(data);
    setModalFormVisible(false);
  };

  useEffect(() => {
    if (responseLoaded) {
      setIntentionConfirmed();
      appendToHistory("Confirmed the suggestion.");
      setModalFormVisible(true);
    }
  }, [responseLoaded]);

  return (
    <Fragment>
      <Text>{props.intention.prompt}</Text>
      <ButtonSet>
        <Button text="Yes" onClick={() => confirmSuggestion()}></Button>
        <Button
          text="No"
          appearance="subtle"
          onClick={() => {
            onChange(index + 1);
          }}
        ></Button>
      </ButtonSet>
      {modalFormVisible && workerFormState && (
        <ModalFormComponent
          data={workerFormState}
          modalTitle="Form"
          toggleModalHandler={() => setModalFormVisible(false)}
          onSubmitHandler={onTicketCreate}
        ></ModalFormComponent>
      )}
    </Fragment>
  );
};
