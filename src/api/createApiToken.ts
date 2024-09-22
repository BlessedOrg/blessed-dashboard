import { fetcherWithToken } from "@/src/requests/requests";
import { apiUrl } from "@/src/variables/variables";

export async function createApiToken(appId: string) {
  const response = await fetcherWithToken(`${apiUrl}/api/auth/apiToken/generate?appId=${appId}`);
  return response;
}
