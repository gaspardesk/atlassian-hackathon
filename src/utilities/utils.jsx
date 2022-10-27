import * as crypto from 'crypto';
import api, { route, fetch } from "@forge/api";




export function signKey (message) {
    return crypto.createHmac('sha256', Buffer.from(process.env.HMAC_KEY, 'hex')).update(message).digest('hex');
}

export async function checkIfSignedUp (user_domain) {
  try{
    const response = await fetch(`https://${user_domain}.us.gaspardesk.com/api/common/info/version`);
    const status = await response.status
    // TODO: REVERT BACK TO NORMAL
    // return status !== 404 
    return true
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
  user.domain_name = user.organization_domain.split(".")[0];
  return user
}


export async function send_message (message) {
        const current_user = await get_current_user();
        
        const message_body = {
          query: message,
          user_email: current_user.emailAddress,
          user_id: current_user.accountId
        }
        try{
  
          const django_response = await fetch(`https://2c4b-109-242-134-163.eu.ngrok.io/forge/message`, {
            headers: build_headers(current_user.domain_name),
            method: 'POST',
            body: JSON.stringify(message_body)
          });
          const response_content = await django_response.json();
          console.log(response_content.intentions[0].worker);
          return response_content;
        }
        catch (error) {
          console.log(error.message);
        }
}

export async function send_confirmation (worker) {
  const current_user = await get_current_user();
  
  const message_body = {
    tag: worker.tag,
    hints: worker.hints,
    user_email: current_user.emailAddress,
    user_id: current_user.accountId
  }


  try{
    const django_response = await fetch(`https://2c4b-109-242-134-163.eu.ngrok.io/forge/intention/confirm`, {
      headers: build_headers(current_user.domain_name),
      method: 'POST',
      body: JSON.stringify(message_body)
    });
    const response_content = await django_response.json();
    console.log(response_content);
    return response_content;
  }
  catch (error) {
    console.log(error.message);
  }
}



function build_headers (domain_name) {
        const now = new Date().toISOString();
        const signature = signKey(domain_name + now);
        return {
          "X-Forge-payload": `${domain_name}${now}`,
          "X-Forge-signature": signature,
        }

}