"use client";
import { HomeDashboard } from "../components/homeDashboard/HomeDashboard";
import { Navigation } from "../components/homeDashboard/navigation/Navigation";
import { redirect } from "next/navigation";
import { setCookie } from "cookies-next";
import { useEffect } from "react";

export default function HomePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  useEffect(() => {
    if (!!searchParams?.token) {
      setCookie("accessToken", `${searchParams.token}`);
      redirect("/");
    }
  }, [searchParams]);
  return (
    <div className="flex w-full flex-col">
      <Navigation />
      <HomeDashboard />
    </div>
  );
}
