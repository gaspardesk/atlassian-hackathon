import ForgeUI, {
  Button,
  Fragment,
  Form,
  useState,
  Image,
  Text,
  Code,
  TextField,
  Em,
  Strong,
  Heading,
  ButtonSet,
  useEffect,
} from "@forge/ui";
import { Article } from "./article";
import { Suggestion } from "./suggestion";

const renderIntentions = (
  data,
  index,
  handleChange,
  articlesAreRelevant,
  setArticlesAreRelevant
) => {
  if (!data) {
    return <Text>No Response Received, Please Refresh</Text>;
  }

  if (data.intentions && index < data.intentions.length) {
    return (
      <Suggestion
        intention={data.intentions[index]}
        onChange={handleChange}
        index={index}
      ></Suggestion>
    );
  } else if (data.articles && articlesAreRelevant) {
    console.log("printing articles");
    return (
      <Article
        articles={data.articles}
        setIsRelevant={setArticlesAreRelevant}
        isRelevant={articlesAreRelevant}
      ></Article>
    );
  } else if (!articlesAreRelevant) {
    return <Text>Articles Are Irrelevant GO DIE IN A FIRE</Text>;
  }

  // return (
  //     <Fragment>
  //         {data.intentions.map(intention => (<ArticleItem item={article}></ArticleItem>)}
  //     </Fragment>
  // )
};

export const Interactions = (props) => {
  const { data } = props;
  const [intentionIndex, setIntentionIndex] = useState(0);
  const [articlesAreRelevant, setArticlesAreRelevant] = useState(true);

  return (
    <Fragment>
      {renderIntentions(
        data,
        intentionIndex,
        setIntentionIndex,
        articlesAreRelevant,
        setArticlesAreRelevant
      )}
    </Fragment>
  );
};
