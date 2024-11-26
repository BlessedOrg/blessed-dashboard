import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";

export async function sendTicketToEmail(payload: {
  appId: string,
  eventId: string,
  ticketId: string,
  email: string,
  amount: number
}) {
  const { appId, eventId, ticketId } = payload;
  const response = await fetcherWithToken(`${apiUrl}/private/tickets/${appId}/${eventId}/${ticketId}/distribute`, {
    method: "POST",
    body: JSON.stringify({ distributions: [{ email: payload.email, amount: payload.amount }] })
  });
  return response;
}

export async function sendTicketToExternalWallet(payload: {
  appId: string,
  eventId: string,
  ticketId: string,
  walletAddress: string,
  amount: number
}) {
  const { appId, eventId, ticketId } = payload;
  const response = await fetcherWithToken(`${apiUrl}/private/tickets/${appId}/${eventId}/${ticketId}/distributeToExternal`, {
    method: "POST",
    body: JSON.stringify({ users: [{ amount: payload.amount, wallet: payload.walletAddress }] })
  });
  return response;
}