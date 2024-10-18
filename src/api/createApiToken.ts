import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";

export async function createApiToken(appSlug: string) {
  const response = await fetcherWithToken(`${apiUrl}/applications/${appSlug}/api-key`);
  return response;
}
