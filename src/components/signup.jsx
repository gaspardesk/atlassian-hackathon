import ForgeUI, { Fragment, Image, Text, Link, Heading } from "@forge/ui";

export const Signup = () => {
  return (
    <Fragment>
      <Image
        alt="Gaspar Logo"
        src="https://atlassian-hackathon.s3.amazonaws.com/logo_in_blue.png"
      ></Image>
      <Heading size="large">Welcome to Gaspar Agent Bot!</Heading>
      <Text>Please click the button bellow to sign up in our platform!</Text>
      <Text>
        <Link appearance="button" href="https://signup.gaspardesk.com/">
          Sign Up
        </Link>
      </Text>
    </Fragment>
  );
};
