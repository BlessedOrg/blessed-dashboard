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

export async function distributeCampaign({ id, appId, campaignType }: { id: string; appId: string; campaignType: string }) {
	const urlEndpoint = campaignType === "REWARD" ? "distribute-rewards" : "distribute-tickets";
  const response = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/campaigns/${id}/${urlEndpoint}`, {
    method: "POST",
  });
  return response;
}
