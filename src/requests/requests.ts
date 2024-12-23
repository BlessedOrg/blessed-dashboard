import { getCookie } from "cookies-next";

export const fetcher = async (url: string, options?: RequestInit | undefined) => {
  const { headers, ...rest } = options || {};

  return fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    credentials: "include"
  }).then((res: Response) => res.json());
};

export const fetcherWithToken = async (url: string, options?: RequestInit | undefined) => {
  const accessToken = getCookie("accessToken");
  const { headers, ...rest } = options || {};

  const res = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      Authorization: `Bearer ${accessToken}`
    }
  }).then((res: Response) => res.json());
  if (res?.error || res?.statusCode >= 400) {
    throw new Error(res.message, { cause: res.error });
  }
  return res;
};


