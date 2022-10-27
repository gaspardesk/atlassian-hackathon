import ForgeUI, { Button, Fragment, Link, Text } from "@forge/ui"


const ArticleItem = (props) => {
    const {item} = props
    return (
        <Fragment>
        <Text>{item.title ? item.title : item.content}</Text>
        <Text><Link href={item.url} appearance="link" openNewTab={true} >{item.title ? item.title : item.content}</Link></Text>
        </Fragment>
    )
}

export const Article = (props) => {
    const {articles} = props
    return (
        <Fragment>
            {articles.map(article => (<ArticleItem item={article}></ArticleItem>))}
            <Button text="Not Relevant" onClick={() => {
                props.setIsRelevant(false)
            }}></Button>
        </Fragment>
    )
}