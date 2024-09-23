"use client";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcherWithToken } from "../requests/requests";
import { apiUrl } from "@/variables/variables";
import { isArray } from "lodash-es";
import { getCookie } from "cookies-next";
import { AuthModal } from "@/components/authModal/AuthModal";

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
  ApiTokens: { id: string; vaultKey: string; createdAt: string; revoked: boolean; appId: string }[];
  appsData: {
    apps: IAppData[];
    mutate: () => Promise<any>;
    isAppsLoading: boolean;
  };
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
    mutate: async () => {},
    isAppsLoading: false,
  },
  mutate: async () => {},
} as UserHook;

const UserContext = createContext<UserHook | undefined>(undefined);

const UserContextProvider = ({ children }: IProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(defaultState);
  const accessTokenExists = getCookie("accessToken");
  const { data, mutate, isLoading } = useSWR(`${apiUrl}/api/account/me`, fetcherWithToken);
  const {
    data: appsData,
    mutate: mutateApps,
    isLoading: isAppsLoading,
  } = useSWR(isLoggedIn ? `${apiUrl}/api/app` : null, fetcherWithToken);

  useEffect(() => {
    if (!!data && !data?.error && !!data?.id) {
      setUserData(data);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [data]);
  useEffect(() => {
    if (accessTokenExists && !isLoading && !isLoggedIn) {
      mutate();
    }
  }, [accessTokenExists]);
  useEffect(() => {
    if (!accessTokenExists && !isLoggedIn && !isLoading) {
      setShowAuthModal(true);
    }
  }, [data, isLoading, accessTokenExists]);

  if (!isLoggedIn) {
    return (
      <UserContext.Provider
        value={{
          ...defaultState,
          isLoading,
          appsData: {
            isAppsLoading,
            mutate: mutateApps,
            apps: [],
          },
          isLoggedIn,
        }}
      >
        {children}
        <AuthModal isOpen={showAuthModal} />
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider
      value={{
        ...userData,
        mutate,
        isLoading,
        isLoggedIn,
        appsData: {
          apps: isArray(appsData) ? appsData : [],
          mutate: mutateApps,
          isAppsLoading,
        },
      }}
    >
      {children}
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
