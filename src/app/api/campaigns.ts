import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";

export async function createCampaign({ name, appId }) {
  const response = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/campaigns`, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
  return response;
}

export async function deleteCampaign({ id, appId }) {
  const response = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/campaigns/${id}`, {
    method: "DELETE",
  });
  return response;
}

export async function updateCampaignName({ id, appId, name }: { name: string; id: string; appId: string }) {
  const response = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/campaigns/${id}/name`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });
  return response;
}
export async function updateCampaignAudiences({
  id,
  appId,
  audiences = [],
  audiencesToRemove = [],
}: {
  id: string;
  appId: string;
  audiences?: string[];
  audiencesToRemove?: string[];
}) {
  const response = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/campaigns/${id}/audiences`, {
    method: "PATCH",
    body: JSON.stringify({ audiences, audiencesToRemove }),
  });
  return response;
}
export async function updateCampaignTickets({
  id,
  appId,
  ticketsToRemove = [],
  tickets,
}: {
  id: string;
  appId: string;
  ticketsToRemove?: string[];
  tickets?: string[];
}) {
  const response = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/campaigns/${id}/tickets`, {
    method: "PATCH",
    body: JSON.stringify({ ticketsToRemove, tickets }),
  });
  return response;
}

export async function distributeCampaign({ id, appId }: { id: string; appId: string }) {
  const response = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/campaigns/${id}/distribute`, {
    method: "POST",
  });
  return response;
}
