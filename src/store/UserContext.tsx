"use client";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcherWithToken } from "../requests/requests";
import { apiUrl, landingPageUrl } from "@/variables/variables";
import { deleteCookie, getCookie } from "cookies-next";
import { FixedLoading } from "@/components/ui/fixed-loading";
import { isArray } from "lodash-es";

interface IProps {
  children: ReactNode;
}
interface UserHook {
  walletAddress: string | null;
  email: string | null;
  isLoading: boolean;
  id: string | null;
  mutate: () => Promise<any>;
  isLoggedIn: boolean;
  accountDeployed: boolean;
  vaultKey: string | null;
  appsData: {
    apps: IAppData[];
    mutate: () => Promise<any>;
    isAppsLoading: boolean;
  };
  onLogout: () => Promise<void>;
}
const defaultState = {
  walletAddress: null,
  isLoading: false,
  email: null,
  id: null,
  accountDeployed: false,
  vaultKey: null,
  isLoggedIn: false,
  appsData: {
    apps: [],
    mutate: async () => {
      return 0;
    },
    isAppsLoading: false
  },
  mutate: async () => {
    return 0;
  }
} as UserHook;

const UserContext = createContext<UserHook | undefined>(undefined);

const UserContextProvider = ({ children }: IProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(defaultState);
  const accessTokenExists = getCookie("accessToken");

  const {
    data: userDataResponse,
    mutate,
    isLoading: isUserDataLoading,
    error
  } = useSWR(accessTokenExists ? `${apiUrl}/private/developers/me` : null, fetcherWithToken);
  const {
    data: appsDataResponse,
    mutate: mutateApps,
    isLoading: isAppsLoading
  } = useSWR(isLoggedIn ? `${apiUrl}/private/apps` : null, fetcherWithToken);

  const isLoading = !accessTokenExists ? true : isUserDataLoading;

  useEffect(() => {
    if (!!userDataResponse && !userDataResponse?.error && !!userDataResponse?.id) {
      setUserData(userDataResponse);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userDataResponse]);
  useEffect(() => {
    if (accessTokenExists && !isLoading && !isLoggedIn) {
      mutate();
    }
  }, [accessTokenExists]);
  useEffect(() => {
    if (!accessTokenExists || (!!accessTokenExists && !isLoading && (!!userDataResponse?.error || !!error))) {
      window.location.replace(landingPageUrl + "?logout=true");
    }
  }, [userDataResponse, isLoading, accessTokenExists]);

  const onLogout = async () => {
    const res = await fetcherWithToken(`${apiUrl}/private/developers/logout`, {
      method: "POST"
    });
    if (!!res?.message) {
      setUserData(defaultState);
      setIsLoggedIn(false);
      deleteCookie("accessToken");

      window.location.replace(landingPageUrl + "?logout=true");
    }
  };

  const unloggedValues = {
    ...defaultState,
    isLoading,
    appsData: {
      isAppsLoading,
      mutate: mutateApps,
      apps: []
    },
    isLoggedIn,
    onLogout
  };
  return (
    <UserContext.Provider
      value={
        !isLoggedIn
          ? unloggedValues
          : {
            ...userData,
            mutate,
            isLoading,
            isLoggedIn,
            appsData: {
              apps: isArray(appsDataResponse) ? appsDataResponse : [],
              mutate: mutateApps,
              isAppsLoading
            },
            onLogout
          }
      }
    >
      {isLoading && <FixedLoading />}
      {!isLoading && isLoggedIn && children}
    </UserContext.Provider>
  );
};
const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used inside UserContextProvider");
  }
  return context;
};

export { UserContextProvider, useUserContext };
