import ForgeUI, { Button, Fragment, Image, Text, Link, Em, Strong, Heading } from "@forge/ui"

export const Signup = () => {
    return (
        <Fragment>
            <Image alt="Gaspar Logo" src="https://media-exp1.licdn.com/dms/image/C560BAQEji4CrTRR5bA/company-logo_200_200/0/1581641773081?e=1674691200&v=beta&t=-hTf9ud42Lygh9EUkHKPTuyRW8tLKSePKyRAWpnm5f0"></Image>
            <Heading size="large">Welcome to Gaspar Agent Bot!</Heading>
            <Text>Please click the button bellow to sign up in our platform!</Text>
            <Text><Link appearance="button" href="https://signup.gaspardesk.com/">Sign Up</Link></Text>
        </Fragment>
    )
}