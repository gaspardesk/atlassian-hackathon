import ForgeUI, { Button, Fragment, Link, Text } from "@forge/ui";

const ArticleItem = (props) => {
  const { item } = props;
  return (
    <Fragment>
      <Text>{item.content ? item.content : item.title}</Text>
      <Text>
        <Link href={item.url} appearance="link" openNewTab={true}>
          {item.title ? item.title : item.content}
        </Link>
      </Text>
    </Fragment>
  );
};

export const Article = (props) => {
  const { articles, setIsRelevant } = props;

  return (
    <Fragment>
      {articles.map((article) => (
        <Fragment>
          <ArticleItem item={article}></ArticleItem>
        </Fragment>
      ))}
      <Button
        text="Not Relevant"
        onClick={() => {
          setIsRelevant(false);
        }}
      ></Button>
    </Fragment>
  );
};
