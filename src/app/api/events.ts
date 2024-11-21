import { apiUrl } from "@/variables/variables";
import { fetcherWithToken } from "@/requests/requests";

interface IProps {
  name: string;
  description?: string;
  logoUrl?: string;
  timezoneIdentifier?: string;
  startsAt?: Date;
  endsAt?: Date;
  eventLocation?: any;
}
export async function createEvent(appId: string, data: IProps) {
  const response = await fetcherWithToken(`${apiUrl}/private/events/${appId}`, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return response;
}

export async function updateEvent(appId, eventId, data: IProps) {
  const response = await fetcherWithToken(`${apiUrl}/private/events/${appId}/${eventId}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
  return response;
}

export async function createTicket(appId: string, eventId: string, data: {
  name: string;
  price: number;
  symbol: string;
  imageUrl?: string | null;
  initialSupply: number;
  maxSupply: number
}) {
  const response = await fetcherWithToken(`${apiUrl}/private/tickets/${appId}/${eventId}`, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return response;
}
