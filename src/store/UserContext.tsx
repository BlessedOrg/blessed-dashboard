"use client";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcherWithToken } from "../requests/requests";
import { apiUrl } from "@/variables/variables";
import { isArray } from "lodash-es";
import { deleteCookie, getCookie } from "cookies-next";
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
  const { data, mutate, isLoading } = useSWR(`${apiUrl}/developers/me`, fetcherWithToken);
  const {
    data: appsData,
    mutate: mutateApps,
    isLoading: isAppsLoading,
  } = useSWR(isLoggedIn ? `${apiUrl}/applications` : null, fetcherWithToken);

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
    if ((!accessTokenExists && !isLoggedIn && !isLoading) || (!!accessTokenExists && !isLoading && data?.error)) {
      setShowAuthModal(true);
    }
  }, [data, isLoading, accessTokenExists]);


  const onLogout = async () => {
    const res = await fetcherWithToken(`${apiUrl}/developers/logout`, {
      method: "POST",
    });
    if (!!res?.message) {
      setUserData(defaultState);
      setIsLoggedIn(false);
      deleteCookie("accessToken");
      window.location.reload()
    }
  }
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
          onLogout
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
        onLogout
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
