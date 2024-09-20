import { fetcher } from "@/src/requests/requests";
import { apiUrl } from "@/src/variables/variables";

export async function createApiToken(appId: string) {
  const response = await fetcher(`${apiUrl}/api/auth/apiToken/generate?appId=${appId}`);
  return response;
}
