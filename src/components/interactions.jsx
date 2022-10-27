import ForgeUI, { Button, Fragment, Form, useState, Image, Text, Code, TextField, Em, Strong, Heading, ButtonSet, useEffect } from "@forge/ui"
import { Article } from "./article"
import { Suggestion } from "./suggestion"

const renderIntentions = (data, index, handleChange) => {
    if (!data) {
        return <Text>No Response Received, Please Refresh</Text>
    }
    console.log(`rendering ${index}`);
    if (data.intentions && index < data.intentions.length) {
        return <Suggestion intention={data.intentions[index]} onChange={handleChange} index={index}></Suggestion>
    }
    else if (data.articles){
        console.log("printing articles");
        return <Article articles={data.articles}></Article>
    }
    else {
        return <Text>There's nothing I can do for you</Text>
    }
}
    

export const Interactions = (props) => {
    const {data} = props;
    const [intentionIndex, setIntentionIndex] = useState(0);

    return (
    <Fragment>{renderIntentions(data,intentionIndex, setIntentionIndex)}</Fragment>)
}