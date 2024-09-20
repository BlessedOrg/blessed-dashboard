import { apiUrl } from "@/src/variables/variables";
import { fetcher } from "@/src/requests/requests";

interface IProps {
  name: string;
  description?: string;
  imageUrl?: string;
}
export async function createApplication({ name, description, imageUrl }: IProps) {
  const response = await fetcher(`${apiUrl}/api/app`, {
    method: "POST",
    body: JSON.stringify({ name, description, imageUrl }),
  });
  return response;
}
