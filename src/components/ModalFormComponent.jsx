import ForgeUI, { ModalDialog, Form } from "@forge/ui";
import { parseToFields } from "./forms/forms";

export const ModalFormComponent = (props) => {
  const { data, modalTitle, toggleModalHandler, onSubmitHandler } = props;

  return (
    <ModalDialog header={modalTitle} onClose={() => toggleModalHandler(false)}>
      <Form onSubmit={onSubmitHandler}>{parseToFields(data)}</Form>
    </ModalDialog>
  );
};
