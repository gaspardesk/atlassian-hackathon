import * as crypto from 'crypto';
import api, { route, fetch } from "@forge/api";




export function signKey (message) {
    return crypto.createHmac('sha256', Buffer.from(process.env.HMAC_KEY, 'hex')).update(message).digest('hex');
}

export async function checkIfSignedUp (user_domain) {
  try{
    const response = await fetch(`https://${user_domain}.us.gaspardesk.com/api/common/info/version`);
    const status = await response.status
    console.log(status);
    return status !== 404
  }
  catch (error) {
    console.log(error.message);
    return false
  }
}

export async function get_current_user () {
  const response = await api.asUser().requestJira(
    route`/rest/api/3/myself`
  );
  let user = await response.json();
  user.organization_domain = user.emailAddress.split("@")[1];
  user.domain_name = organization_domain.split(".")[0];
  return user
}