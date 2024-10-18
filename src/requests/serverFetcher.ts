"use server";
import { cookies } from "next/headers";

export const serverFetcherWithToken = async (url: string, options?: RequestInit | undefined) => {
  const accessToken = cookies().get("accessToken").value;
  const { headers, ...rest } = options || {};
  return fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res: Response) => res.json());
};