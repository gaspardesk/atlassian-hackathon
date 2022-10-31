import * as crypto from "crypto";
import api, { route, fetch } from "@forge/api";

export function signKey(message) {
  return crypto
    .createHmac("sha256", Buffer.from(process.env.HMAC_KEY, "hex"))
    .update(message)
    .digest("hex");
}

function baseUrl(domain) {
  return `https://${domain}.us.gaspardesk.com/api`
}

export async function checkIfSignedUp(user_domain) {
  try {
    const response = await fetch(
      `${baseUrl(user_domain)}/common/info/version`
    );
    const status = await response.status;
    return status !== 404
  } catch (error) {
    return false;
  }
}

export async function get_current_user() {
  const response = await api.asUser().requestJira(route`/rest/api/3/myself`);
  let user = await response.json();
  user.organization_domain = user.emailAddress.split("@")[1];
  user.domain_name = user.organization_domain.split(".")[0];
  return user;
}

export async function send_message(message) {
  const current_user = await get_current_user();

  const message_body = {
    query: message,
    user_email: current_user.emailAddress,
    user_id: current_user.accountId,
  };

  try {
    const django_response = await fetch(`${baseUrl(current_user.domain_name)}/forge/message`, {
      headers: build_headers(current_user.domain_name),
      method: "POST",
      body: JSON.stringify(message_body),
    });
    const response_content = await django_response.json();
    return response_content;
  } catch (error) {}
}

export async function retrieve_worker_form(worker) {
  const current_user = await get_current_user();

  const message_body = {
    tag: worker.tag,
    hints: worker.hints,
    user_email: current_user.emailAddress,
    user_id: current_user.accountId,
  };

  try {
    const django_response = await fetch(
      `${baseUrl(current_user.domain_name)}/forge/intention/worker_form`,
      {
        headers: build_headers(current_user.domain_name),
        method: "POST",
        body: JSON.stringify(message_body),
      }
    );
    const response_content = await django_response.json();
    return response_content["fields"];
  } catch (error) {}
}

export async function form_definition_request(worker) {
  const current_user = await get_current_user();

  const message_body = {
    user_email: current_user.emailAddress,
    user_id: current_user.accountId,
  };

  try {
    const django_response = await fetch(
      `${baseUrl(current_user.domain_name)}/forge/form/create_ticket_form`,
      {
        headers: build_headers(current_user.domain_name),
        method: "POST",
        body: JSON.stringify(message_body),
      }
    );
    const response_content = await django_response.json();
    return response_content;
  } catch (error) {}
}

export async function create_automated_ticket(data) {
  const current_user = await get_current_user();

  const message_body = {
    ...{
      user_email: current_user.emailAddress,
      user_id: current_user.accountId,
    },
    ...data,
  };

  try {
    const django_response = await fetch(`${baseUrl(current_user.domain_name)}/forge/intention/confirm`, {
      headers: build_headers(current_user.domain_name),
      method: "POST",
      body: JSON.stringify(message_body),
    });
    const response_content = await django_response.json();
    return response_content["ticket_pk"];
  } catch (error) {}
}

export async function create_manual_ticket(data) {
  const current_user = await get_current_user();

  const message_body = {
    ...{
      user_email: current_user.emailAddress,
      user_id: current_user.accountId,
    },
    ...data,
  };

  try {
    const django_response = await fetch(`${baseUrl(current_user.domain_name)}/forge/create_ticket`, {
      headers: build_headers(current_user.domain_name),
      method: "POST",
      body: JSON.stringify(message_body),
    });
    const response_content = await django_response.json();
    return response_content["ticket_pk"];
  } catch (error) {}
}

function build_headers(domain_name) {
  const now = new Date().toISOString();
  const signature = signKey(domain_name + now);
  return {
    "X-Forge-Payload": `${domain_name}${now}`,
    "X-Forge-Signature": signature,
  };
}
