import ForgeUI, { Text, ButtonSet, Button, Fragment, useEffect, useState } from "@forge/ui"
import { send_confirmation } from "../utilities/utils"

export const Suggestion = (props) => {
    

    return (
        <Fragment>
        <Text>{props.intention.prompt}</Text>
        <ButtonSet>
            <Button text="Yes" onClick={async () => { await send_confirmation(props.intention.worker)}}></Button>
            <Button text="No" appearance="subtle" onClick={() => {props.onChange(props.index + 1)}}></Button>
        </ButtonSet>
        </Fragment>
    )
}