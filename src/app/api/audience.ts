import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";

export async function createAudience({ name, appId, data }) {
  const response = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/audiences`, {
    method: "POST",
    body: JSON.stringify({ name, ...(data ?? {}) })
  });
  return response;
}

export async function deleteAudience({ appId, id }) {
  const response = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/audiences/${id}`, {
    method: "DELETE"
  });
  return response;
}

export async function updateAudience({ name, audienceId, appId }) {
  const response = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/audiences/${audienceId}`, {
    method: "PATCH",
    body: JSON.stringify({ name })
  });
  return response;
}

export async function deleteAudienceUser({ appId, id, audienceUserId }) {
  const response = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/audiences/${id}/${audienceUserId}`, {
    method: "DELETE"
  });
  return response;
}