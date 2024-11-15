import { apiUrl } from "@/variables/variables";
import { fetcherWithToken } from "@/requests/requests";

interface IProps {
  name: string;
  description?: string;
  logoUrl?: string;
  app: string;
}
export async function createEvent({ name, description, logoUrl, app }: IProps) {
  const response = await fetcherWithToken(`${apiUrl}/private/events/${app}`, {
    method: "POST",
    body: JSON.stringify({ name, description, logoUrl }),
  });
  return response;
}

export async function updateEvent({ name, description, logoUrl, appId, eventId }) {
  const response = await fetcherWithToken(`${apiUrl}/private/events/${appId}/${eventId}`, {
    method: "PATCH",
    body: JSON.stringify({ name, description, logoUrl }),
  });
  return response;
}
