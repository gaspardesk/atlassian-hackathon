import ForgeUI, {
  TextField,
  DatePicker,
  Toggle,
  Select,
  Option,
} from "@forge/ui";

export const parseToFields = (data) => {
  /* Data should be a dictionary with the below formatting: 

    {
        "form" {
            "fields": [
                {
                    "type":"str",
                    "name":"example",
                    "display_name":"example",
                    "required":"true"
                }...
            ] 
        }
    }
    */

  let fields = [];
  for (let obj of data) {
    if (
      obj["type"] === "str" ||
      obj["type"] === "secret" ||
      obj["type"] === "address" ||
      obj["type"] === "int"
    ) {
      fields.push(<StrFieldComponent field={obj}></StrFieldComponent>);
      //   return <StrFieldComponent field={obj}></StrFieldComponent>;
    } else if (obj["type"] === "select") {
      //   return <SelectFieldComponent field={obj}></SelectFieldComponent>;
      fields.push(<SelectFieldComponent field={obj}></SelectFieldComponent>);
    } else if (obj["type"] === "bool") {
      //   return <BoolFieldComponent field={obj}></BoolFieldComponent>;
      fields.push(<BoolFieldComponent field={obj}></BoolFieldComponent>);
    } else if (obj["type"] === "date" || obj["type"] === "datetime") {
      //   return <DateFieldComponent field={obj}></DateFieldComponent>;
      fields.push(<DateFieldComponent field={obj}></DateFieldComponent>);
    } else {
      throw new Error(`No idea what component to use for: ${obj["type"]}`);
    }
  }

  return fields;
};

const StrFieldComponent = (props) => {
  const { field } = props;
  return (
    <TextField
      label={field["display_name"] ? field["display_name"] : field["name"]}
      name={field["name"]}
      isRequired={field["required"]}
    />
  );
};

const SelectFieldComponent = (props) => {
  const { field } = props;
  return (
    <Select
      label={field["display_name"] ? field["display_name"] : field["name"]}
      name={field["name"]}
      isRequired={field["required"]}
      isMulti={field["multi"]}
    >
      {field["values"].map((value) => {
        return <Option label={value} value={value} />;
      })}
    </Select>
  );
};

const DateFieldComponent = (props) => {
  const { field } = props;
  return (
    <DatePicker
      name={field["name"]}
      label={field["display_name"] ? field["display_name"] : field["name"]}
      description={field["tooltip"] ? field["tooltip"] : ""}
      isRequired={field["required"]}
    />
  );
};

const BoolFieldComponent = (props) => {
  const { field } = props;
  return (
    <Toggle
      label={field["display_name"] ? field["display_name"] : field["name"]}
      name={field["name"]}
      defaultChecked={false}
    ></Toggle>
  );
};
