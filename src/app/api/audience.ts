import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";

export async function createAudience({ name, appId }) {
  const response = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/audiences`, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
  return response;
}

export async function updateAudience({ name, audienceId, appId }) {
  const response = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/audiences/${audienceId}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });
  return response;
}
