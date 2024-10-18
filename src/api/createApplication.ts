import { apiUrl } from "@/variables/variables";
import { fetcherWithToken } from "@/requests/requests";

interface IProps {
  name: string;
  description?: string;
  imageUrl?: string;
}
export async function createApplication({ name, description, imageUrl }: IProps) {
  const response = await fetcherWithToken(`${apiUrl}/applications`, {
    method: "POST",
    body: JSON.stringify({ name, description, imageUrl }),
  });
  return response;
}
